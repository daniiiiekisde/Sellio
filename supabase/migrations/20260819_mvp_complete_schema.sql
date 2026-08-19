-- ==============================================================================
-- SELLIO — MVP COMPLETE SCHEMA / EXTENSION
-- Migration: 20260819_mvp_complete_schema
-- ==============================================================================
-- This migration EXTENDS the existing Sellio schema. It intentionally does not
-- recreate or replace the original tables because the project already contains
-- the foundational backend migrations from 2026-08-18.
--
-- Core invariants:
--   1. Seller commission belongs entirely to the seller.
--   2. Sellio commission is charged separately to the company.
--   3. Sellio commission can never exceed 5%.
--   4. Seller legal/private identity remains in seller_private_data.
--   5. Historical financial conditions must be frozen.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. OPPORTUNITY COMMERCIAL MODEL
-- ------------------------------------------------------------------------------
ALTER TABLE public.opportunities
  ADD COLUMN IF NOT EXISTS product_name TEXT,
  ADD COLUMN IF NOT EXISTS category TEXT,
  ADD COLUMN IF NOT EXISTS sector TEXT,
  ADD COLUMN IF NOT EXISTS target_region TEXT,
  ADD COLUMN IF NOT EXISTS price NUMERIC(12,2) CHECK (price >= 0),
  ADD COLUMN IF NOT EXISTS currency CHAR(3) DEFAULT 'EUR',
  ADD COLUMN IF NOT EXISTS commercial_commission_type TEXT DEFAULT 'percentage',
  ADD COLUMN IF NOT EXISTS commercial_commission_rate NUMERIC(5,2),
  ADD COLUMN IF NOT EXISTS commercial_commission_amount NUMERIC(12,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS sellio_commission_model TEXT DEFAULT 'fixed',
  ADD COLUMN IF NOT EXISTS sellio_commission_rate NUMERIC(5,2) DEFAULT 2,
  ADD COLUMN IF NOT EXISTS offer_version INT DEFAULT 1,
  ADD COLUMN IF NOT EXISTS badge_type TEXT,
  ADD COLUMN IF NOT EXISTS active_from TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS active_until TIMESTAMPTZ;

UPDATE public.opportunities
SET sellio_commission_rate = LEAST(5, GREATEST(0, COALESCE(sellio_commission_rate, 2)))
WHERE sellio_commission_rate IS NULL OR sellio_commission_rate > 5 OR sellio_commission_rate < 0;

ALTER TABLE public.opportunities
  DROP CONSTRAINT IF EXISTS opportunities_sellio_commission_rate_check;

ALTER TABLE public.opportunities
  ADD CONSTRAINT opportunities_sellio_commission_rate_check
  CHECK (sellio_commission_rate >= 0 AND sellio_commission_rate <= 5);

ALTER TABLE public.opportunities
  DROP CONSTRAINT IF EXISTS opportunities_commercial_commission_type_check;

ALTER TABLE public.opportunities
  ADD CONSTRAINT opportunities_commercial_commission_type_check
  CHECK (commercial_commission_type IS NULL OR commercial_commission_type IN ('percentage','fixed_amount'));

ALTER TABLE public.opportunities
  DROP CONSTRAINT IF EXISTS opportunities_sellio_commission_model_check;

ALTER TABLE public.opportunities
  ADD CONSTRAINT opportunities_sellio_commission_model_check
  CHECK (sellio_commission_model IS NULL OR sellio_commission_model IN ('fixed','volume_tiered'));

-- ------------------------------------------------------------------------------
-- 2. OFFER VERSIONING
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.offer_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  version INT NOT NULL,
  commercial_commission_type TEXT NOT NULL,
  commercial_commission_rate NUMERIC(5,2),
  commercial_commission_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  sellio_commission_model TEXT NOT NULL DEFAULT 'fixed',
  sellio_commission_rate NUMERIC(5,2) NOT NULL CHECK (sellio_commission_rate >= 0 AND sellio_commission_rate <= 5),
  price NUMERIC(12,2),
  currency CHAR(3) NOT NULL DEFAULT 'EUR',
  conditions JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(opportunity_id, version)
);

-- ------------------------------------------------------------------------------
-- 3. SALES SNAPSHOTS / FINANCIAL HISTORY
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sales_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id UUID NOT NULL UNIQUE REFERENCES public.sales(id) ON DELETE CASCADE,
  snapshot_data JSONB NOT NULL,
  frozen_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.commission_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id UUID NOT NULL REFERENCES public.sales(id) ON DELETE RESTRICT,
  company_id UUID NOT NULL,
  seller_id UUID NOT NULL,
  commercial_amount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (commercial_amount >= 0),
  sellio_amount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (sellio_amount >= 0),
  sellio_rate_applied NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (sellio_rate_applied >= 0 AND sellio_rate_applied <= 5),
  status TEXT NOT NULL DEFAULT 'pending',
  payment_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.commissions
  ADD COLUMN IF NOT EXISTS source_type TEXT DEFAULT 'sale',
  ADD COLUMN IF NOT EXISTS company_amount NUMERIC(12,2),
  ADD COLUMN IF NOT EXISTS commission_role TEXT DEFAULT 'seller';

ALTER TABLE public.sales
  ADD COLUMN IF NOT EXISTS commercial_rate_applied NUMERIC(5,2),
  ADD COLUMN IF NOT EXISTS commercial_commission_amount NUMERIC(12,2),
  ADD COLUMN IF NOT EXISTS sellio_rate_applied NUMERIC(5,2),
  ADD COLUMN IF NOT EXISTS sellio_commission_amount NUMERIC(12,2),
  ADD COLUMN IF NOT EXISTS company_net_amount NUMERIC(12,2),
  ADD COLUMN IF NOT EXISTS offer_version_applied INT;

UPDATE public.sales
SET sellio_rate_applied = LEAST(5, GREATEST(0, COALESCE(sellio_rate_applied, 0)))
WHERE sellio_rate_applied IS NULL OR sellio_rate_applied > 5 OR sellio_rate_applied < 0;

ALTER TABLE public.sales
  DROP CONSTRAINT IF EXISTS sales_sellio_rate_applied_check;

ALTER TABLE public.sales
  ADD CONSTRAINT sales_sellio_rate_applied_check
  CHECK (sellio_rate_applied IS NULL OR (sellio_rate_applied >= 0 AND sellio_rate_applied <= 5));

-- ------------------------------------------------------------------------------
-- 4. DISPUTES / VERIFICATION / AUDIT
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id UUID REFERENCES public.sales(id) ON DELETE SET NULL,
  company_id UUID NOT NULL,
  seller_id UUID NOT NULL,
  raised_by TEXT NOT NULL CHECK (raised_by IN ('company','seller')),
  reason TEXT NOT NULL,
  amount_disputed NUMERIC(12,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'open',
  resolution_notes TEXT,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID NOT NULL,
  actor_role TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. SERVER-SIDE COMMISSION CALCULATOR
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.calculate_sellio_commission(
  p_sale_value NUMERIC,
  p_commercial_rate NUMERIC,
  p_sellio_rate NUMERIC
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_commercial_rate NUMERIC;
  v_sellio_rate NUMERIC;
  v_commercial NUMERIC;
  v_sellio NUMERIC;
  v_company_net NUMERIC;
BEGIN
  IF p_sale_value < 0 OR p_commercial_rate < 0 OR p_commercial_rate > 100 OR p_sellio_rate < 0 THEN
    RAISE EXCEPTION 'Invalid commission input';
  END IF;

  v_commercial_rate := p_commercial_rate;
  v_sellio_rate := LEAST(5.00, p_sellio_rate);
  v_commercial := ROUND(p_sale_value * v_commercial_rate / 100, 2);
  v_sellio := ROUND(p_sale_value * v_sellio_rate / 100, 2);
  v_company_net := ROUND(p_sale_value - v_commercial - v_sellio, 2);

  RETURN jsonb_build_object(
    'sale_value', ROUND(p_sale_value, 2),
    'commercial_rate', v_commercial_rate,
    'commercial_commission', v_commercial,
    'sellio_rate', v_sellio_rate,
    'sellio_commission', v_sellio,
    'company_net', v_company_net
  );
END;
$$;

REVOKE ALL ON FUNCTION public.calculate_sellio_commission(NUMERIC, NUMERIC, NUMERIC) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.calculate_sellio_commission(NUMERIC, NUMERIC, NUMERIC) TO authenticated;

-- ------------------------------------------------------------------------------
-- 6. FINANCIAL IMMUTABILITY
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.prevent_financial_history_mutation()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION 'Financial history is immutable';
END;
$$;

DROP TRIGGER IF EXISTS protect_sales_snapshots ON public.sales_snapshots;
CREATE TRIGGER protect_sales_snapshots
BEFORE UPDATE OR DELETE ON public.sales_snapshots
FOR EACH ROW EXECUTE FUNCTION public.prevent_financial_history_mutation();

-- ------------------------------------------------------------------------------
-- 7. RLS FOR NEW FINANCIAL TABLES
-- ------------------------------------------------------------------------------
ALTER TABLE public.offer_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Offer versions participants read" ON public.offer_versions;
CREATE POLICY "Offer versions participants read" ON public.offer_versions
FOR SELECT TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.opportunities o WHERE o.id = opportunity_id AND (o.company_id = current_company_id() OR is_admin()))
  OR EXISTS (SELECT 1 FROM public.agreements a WHERE a.opportunity_id = opportunity_id AND (a.seller_id = current_seller_id() OR is_admin()))
);

DROP POLICY IF EXISTS "Commission ledger parties read" ON public.commission_ledger;
CREATE POLICY "Commission ledger parties read" ON public.commission_ledger
FOR SELECT TO authenticated
USING (company_id = current_company_id() OR seller_id = current_seller_id() OR is_admin());

DROP POLICY IF EXISTS "Dispute parties read" ON public.disputes;
CREATE POLICY "Dispute parties read" ON public.disputes
FOR SELECT TO authenticated
USING (company_id = current_company_id() OR seller_id = current_seller_id() OR is_admin());

DROP POLICY IF EXISTS "Dispute parties create" ON public.disputes;
CREATE POLICY "Dispute parties create" ON public.disputes
FOR INSERT TO authenticated
WITH CHECK (company_id = current_company_id() OR seller_id = current_seller_id() OR is_admin());

-- Snapshots and audit logs are intentionally not client-writable.

-- ------------------------------------------------------------------------------
-- 8. INDEXES
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_offer_versions_opportunity ON public.offer_versions(opportunity_id, version);
CREATE INDEX IF NOT EXISTS idx_sales_snapshot_sale ON public.sales_snapshots(sale_id);
CREATE INDEX IF NOT EXISTS idx_commission_ledger_sale ON public.commission_ledger(sale_id);
CREATE INDEX IF NOT EXISTS idx_commission_ledger_company ON public.commission_ledger(company_id);
CREATE INDEX IF NOT EXISTS idx_commission_ledger_seller ON public.commission_ledger(seller_id);
CREATE INDEX IF NOT EXISTS idx_disputes_sale ON public.disputes(sale_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs(entity_type, entity_id);
