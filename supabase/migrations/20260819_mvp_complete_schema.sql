-- ==============================================================================
-- SELLIO — MVP COMPLETE SCHEMA
-- Migration: 20260819_mvp_complete_schema
-- ==============================================================================
-- This migration extends the existing Sellio backend without dropping existing data.
-- Security rule: seller private identity data is never publicly selectable.
-- Economic rule: Sellio commission is capped at 5% and is independent from seller commission.
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. TABLES
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('company','seller','admin')),
  full_name TEXT,
  avatar_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.company_profiles (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  trade_name TEXT,
  cif_nif TEXT,
  sector TEXT,
  website TEXT,
  description TEXT,
  verification_status TEXT NOT NULL DEFAULT 'unverified' CHECK (verification_status IN ('unverified','pending','verified','rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.seller_profiles (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  handle TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  dni_nie TEXT,
  phone TEXT,
  sectors TEXT[] NOT NULL DEFAULT '{}',
  regions TEXT[] NOT NULL DEFAULT '{}',
  languages TEXT[] NOT NULL DEFAULT '{"Español"}',
  years_experience INT NOT NULL DEFAULT 0,
  availability TEXT NOT NULL DEFAULT 'full_time',
  verification_status TEXT NOT NULL DEFAULT 'unverified' CHECK (verification_status IN ('unverified','pending','verified','rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.company_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price NUMERIC(12,2) NOT NULL CHECK (price >= 0),
  currency TEXT NOT NULL DEFAULT 'EUR',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.company_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  product_name TEXT,
  category TEXT,
  sector TEXT NOT NULL,
  target_region TEXT NOT NULL,
  price NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (price >= 0),
  currency TEXT NOT NULL DEFAULT 'EUR',
  commercial_commission_type TEXT NOT NULL DEFAULT 'percentage' CHECK (commercial_commission_type IN ('percentage','fixed_amount')),
  commercial_commission_rate NUMERIC(5,2) NOT NULL DEFAULT 15 CHECK (commercial_commission_rate >= 0 AND commercial_commission_rate <= 100),
  commercial_commission_amount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (commercial_commission_amount >= 0),
  sellio_commission_model TEXT NOT NULL DEFAULT 'fixed' CHECK (sellio_commission_model IN ('fixed','volume_tiered')),
  sellio_commission_rate NUMERIC(5,2) NOT NULL DEFAULT 2 CHECK (sellio_commission_rate >= 0 AND sellio_commission_rate <= 5),
  required_experience TEXT,
  badge_type TEXT DEFAULT 'NUEVA',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','pending_review','published','paused','expired','archived','cancelled')),
  offer_version INT NOT NULL DEFAULT 1 CHECK (offer_version >= 1),
  active_from TIMESTAMPTZ DEFAULT NOW(),
  active_until TIMESTAMPTZ,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.opportunity_products (
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  PRIMARY KEY (opportunity_id, product_id)
);

CREATE TABLE IF NOT EXISTS public.agreements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.company_profiles(id) ON DELETE RESTRICT,
  seller_id UUID NOT NULL REFERENCES public.seller_profiles(id) ON DELETE RESTRICT,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  agreed_price NUMERIC(12,2) NOT NULL CHECK (agreed_price >= 0),
  agreed_commission_rate NUMERIC(5,2) NOT NULL CHECK (agreed_commission_rate >= 0 AND agreed_commission_rate <= 100),
  agreed_commission_type TEXT NOT NULL DEFAULT 'percentage',
  target_region TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','pending','active','completed','terminated','cancelled')),
  signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agreement_id UUID REFERENCES public.agreements(id) ON DELETE SET NULL,
  company_id UUID NOT NULL REFERENCES public.company_profiles(id) ON DELETE RESTRICT,
  seller_id UUID NOT NULL REFERENCES public.seller_profiles(id) ON DELETE RESTRICT,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  client_name TEXT NOT NULL,
  quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
  sale_value NUMERIC(12,2) NOT NULL CHECK (sale_value >= 0),
  commercial_rate_applied NUMERIC(5,2) NOT NULL CHECK (commercial_rate_applied >= 0 AND commercial_rate_applied <= 100),
  commercial_commission_amount NUMERIC(12,2) NOT NULL CHECK (commercial_commission_amount >= 0),
  sellio_rate_applied NUMERIC(5,2) NOT NULL CHECK (sellio_rate_applied >= 0 AND sellio_rate_applied <= 5),
  sellio_commission_amount NUMERIC(12,2) NOT NULL CHECK (sellio_commission_amount >= 0),
  company_net_amount NUMERIC(12,2) NOT NULL,
  offer_version_applied INT NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'sale_confirmed' CHECK (status IN ('lead','interested','contacted','negotiation','agreement','sale_pending','sale_confirmed','cancelled','refunded')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sales_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sale_id UUID NOT NULL UNIQUE REFERENCES public.sales(id) ON DELETE CASCADE,
  snapshot_data JSONB NOT NULL,
  frozen_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.commission_ledger (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sale_id UUID NOT NULL REFERENCES public.sales(id) ON DELETE RESTRICT,
  company_id UUID NOT NULL REFERENCES public.company_profiles(id) ON DELETE RESTRICT,
  seller_id UUID NOT NULL REFERENCES public.seller_profiles(id) ON DELETE RESTRICT,
  commercial_amount NUMERIC(12,2) NOT NULL CHECK (commercial_amount >= 0),
  sellio_amount NUMERIC(12,2) NOT NULL CHECK (sellio_amount >= 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','approved','paid','cancelled','refunded','disputed')),
  payment_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.disputes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sale_id UUID REFERENCES public.sales(id) ON DELETE SET NULL,
  company_id UUID NOT NULL REFERENCES public.company_profiles(id) ON DELETE RESTRICT,
  seller_id UUID NOT NULL REFERENCES public.seller_profiles(id) ON DELETE RESTRICT,
  raised_by TEXT NOT NULL CHECK (raised_by IN ('company','seller')),
  reason TEXT NOT NULL,
  amount_disputed NUMERIC(12,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','under_review','resolved','closed')),
  resolution_notes TEXT,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID NOT NULL,
  actor_role TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.verification_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.offer_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  version INT NOT NULL,
  commercial_commission_type TEXT NOT NULL,
  commercial_commission_rate NUMERIC(5,2) NOT NULL,
  commercial_commission_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  sellio_commission_model TEXT NOT NULL,
  sellio_commission_rate NUMERIC(5,2) NOT NULL CHECK (sellio_commission_rate >= 0 AND sellio_commission_rate <= 5),
  price NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  conditions JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(opportunity_id, version)
);

-- ------------------------------------------------------------------------------
-- 2. PRIVATE SELLER ACCESS
-- ------------------------------------------------------------------------------
-- Public discovery must not expose DNI/NIE, phone or legal identity.
CREATE OR REPLACE VIEW public.public_seller_profiles AS
SELECT id, handle, sectors, regions, languages, years_experience, availability, verification_status
FROM public.seller_profiles;

-- ------------------------------------------------------------------------------
-- 3. COMMISSION ENGINE
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.calculate_commission(
  p_price NUMERIC,
  p_qty INT,
  p_commercial_rate NUMERIC,
  p_sellio_rate NUMERIC
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_sale_value NUMERIC;
  v_commercial_rate NUMERIC;
  v_sellio_rate NUMERIC;
  v_commercial NUMERIC;
  v_sellio NUMERIC;
  v_net NUMERIC;
BEGIN
  IF p_price < 0 OR p_qty <= 0 OR p_commercial_rate < 0 OR p_commercial_rate > 100 OR p_sellio_rate < 0 THEN
    RAISE EXCEPTION 'Invalid commission input';
  END IF;

  v_sale_value := ROUND(p_price * p_qty, 2);
  v_commercial_rate := p_commercial_rate;
  v_sellio_rate := LEAST(5.00, p_sellio_rate);
  v_commercial := ROUND(v_sale_value * v_commercial_rate / 100, 2);
  v_sellio := ROUND(v_sale_value * v_sellio_rate / 100, 2);
  v_net := ROUND(v_sale_value - v_commercial - v_sellio, 2);

  RETURN jsonb_build_object(
    'sale_value', v_sale_value,
    'commercial_commission', v_commercial,
    'commercial_rate', v_commercial_rate,
    'sellio_commission', v_sellio,
    'sellio_rate', v_sellio_rate,
    'company_net', v_net
  );
END;
$$;

REVOKE ALL ON FUNCTION public.calculate_commission(NUMERIC, INT, NUMERIC, NUMERIC) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.calculate_commission(NUMERIC, INT, NUMERIC, NUMERIC) TO authenticated;

-- ------------------------------------------------------------------------------
-- 4. RLS
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offer_versions ENABLE ROW LEVEL SECURITY;

-- Remove unsafe policies from previous versions when present.
DROP POLICY IF EXISTS "Public sellers view" ON public.seller_profiles;
DROP POLICY IF EXISTS "Public companies view" ON public.company_profiles;
DROP POLICY IF EXISTS "Public products view" ON public.products;
DROP POLICY IF EXISTS "Public opportunities view" ON public.opportunities;
DROP POLICY IF EXISTS "Company owns products" ON public.products;
DROP POLICY IF EXISTS "Company owns opportunities" ON public.opportunities;
DROP POLICY IF EXISTS "Company/Seller view agreements" ON public.agreements;
DROP POLICY IF EXISTS "Company/Seller view sales" ON public.sales;
DROP POLICY IF EXISTS "Company/Seller view ledger" ON public.commission_ledger;
DROP POLICY IF EXISTS "User notifications" ON public.notifications;

-- Public-safe discovery policies.
CREATE POLICY "Public opportunities view" ON public.opportunities
FOR SELECT TO anon, authenticated USING (status = 'published');

CREATE POLICY "Public products view" ON public.products
FOR SELECT TO anon, authenticated USING (is_active = true);

-- Company data is visible only to authenticated users; private edits are owner-only.
CREATE POLICY "Authenticated companies view" ON public.company_profiles
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Company owns products" ON public.products
FOR ALL TO authenticated USING (auth.uid() = company_id) WITH CHECK (auth.uid() = company_id);

CREATE POLICY "Company owns opportunities" ON public.opportunities
FOR ALL TO authenticated USING (auth.uid() = company_id) WITH CHECK (auth.uid() = company_id);

CREATE POLICY "Company owns opportunity products" ON public.opportunity_products
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.opportunities o WHERE o.id = opportunity_id AND o.company_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM public.opportunities o WHERE o.id = opportunity_id AND o.company_id = auth.uid()));

-- Seller private table: owner only. Public-safe data is exposed through the view above.
CREATE POLICY "Seller owns private profile" ON public.seller_profiles
FOR ALL TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Users view own profile" ON public.profiles
FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users update own profile" ON public.profiles
FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Agreement participants view" ON public.agreements
FOR SELECT TO authenticated USING (auth.uid() = company_id OR auth.uid() = seller_id);

CREATE POLICY "Agreement company manage" ON public.agreements
FOR ALL TO authenticated USING (auth.uid() = company_id) WITH CHECK (auth.uid() = company_id);

CREATE POLICY "Sales participants view" ON public.sales
FOR SELECT TO authenticated USING (auth.uid() = company_id OR auth.uid() = seller_id);

CREATE POLICY "Commission participants view" ON public.commission_ledger
FOR SELECT TO authenticated USING (auth.uid() = company_id OR auth.uid() = seller_id);

CREATE POLICY "Dispute participants view" ON public.disputes
FOR SELECT TO authenticated USING (auth.uid() = company_id OR auth.uid() = seller_id);

CREATE POLICY "Dispute participants create" ON public.disputes
FOR INSERT TO authenticated WITH CHECK (auth.uid() = company_id OR auth.uid() = seller_id);

CREATE POLICY "User notifications" ON public.notifications
FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User verification events" ON public.verification_events
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Agreement offer versions view" ON public.offer_versions
FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.opportunities o WHERE o.id = opportunity_id AND o.company_id = auth.uid())
  OR EXISTS (
    SELECT 1 FROM public.agreements a
    WHERE a.opportunity_id = opportunity_id AND a.seller_id = auth.uid()
  )
);

-- Snapshots and audit logs are never client-writable/readable through broad policies.
-- Writes must happen through trusted backend functions.

-- ------------------------------------------------------------------------------
-- 5. IMMUTABILITY GUARD FOR FINANCIAL HISTORY
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
-- 6. INDEXES
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_products_company_id ON public.products(company_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_company_id ON public.opportunities(company_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_status ON public.opportunities(status);
CREATE INDEX IF NOT EXISTS idx_opportunities_region ON public.opportunities(target_region);
CREATE INDEX IF NOT EXISTS idx_sales_company_id ON public.sales(company_id);
CREATE INDEX IF NOT EXISTS idx_sales_seller_id ON public.sales(seller_id);
CREATE INDEX IF NOT EXISTS idx_ledger_company_id ON public.commission_ledger(company_id);
CREATE INDEX IF NOT EXISTS idx_ledger_seller_id ON public.commission_ledger(seller_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
