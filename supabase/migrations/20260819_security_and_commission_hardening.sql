-- SELLIO — Security and commission hardening follow-up migration
-- This migration documents and enforces the critical security invariants introduced
-- after the MVP schema review.

-- Sellio commission must never exceed 5%.
ALTER TABLE public.opportunities
  DROP CONSTRAINT IF EXISTS opportunities_sellio_commission_rate_check;

ALTER TABLE public.opportunities
  ADD CONSTRAINT opportunities_sellio_commission_rate_check
  CHECK (sellio_commission_rate >= 0 AND sellio_commission_rate <= 5);

ALTER TABLE public.sales
  DROP CONSTRAINT IF EXISTS sales_sellio_rate_applied_check;

ALTER TABLE public.sales
  ADD CONSTRAINT sales_sellio_rate_applied_check
  CHECK (sellio_rate_applied >= 0 AND sellio_rate_applied <= 5);

-- Ensure private seller identity cannot be exposed by the base table policy.
DROP POLICY IF EXISTS "Public sellers view" ON public.seller_profiles;

-- Recreate the public-safe discovery view if it was not already present.
CREATE OR REPLACE VIEW public.public_seller_profiles AS
SELECT id, handle, sectors, regions, languages, years_experience, availability, verification_status
FROM public.seller_profiles;

-- Financial snapshots are append-only.
DROP TRIGGER IF EXISTS protect_sales_snapshots ON public.sales_snapshots;
CREATE TRIGGER protect_sales_snapshots
BEFORE UPDATE OR DELETE ON public.sales_snapshots
FOR EACH ROW EXECUTE FUNCTION public.prevent_financial_history_mutation();
