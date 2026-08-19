-- SELLIO — Security and commission hardening follow-up migration
-- This file mirrors the hardening already applied to the connected Supabase project.

ALTER TABLE public.opportunities
  DROP CONSTRAINT IF EXISTS opportunities_sellio_commission_rate_check;
ALTER TABLE public.opportunities
  ADD CONSTRAINT opportunities_sellio_commission_rate_check
  CHECK (sellio_commission_rate >= 0 AND sellio_commission_rate <= 5);

ALTER TABLE public.sales
  DROP CONSTRAINT IF EXISTS sales_sellio_rate_applied_check;
ALTER TABLE public.sales
  ADD CONSTRAINT sales_sellio_rate_applied_check
  CHECK (sellio_rate_applied IS NULL OR (sellio_rate_applied >= 0 AND sellio_rate_applied <= 5));

DROP POLICY IF EXISTS "Public sellers view" ON public.seller_profiles;

DROP TRIGGER IF EXISTS protect_sales_snapshots ON public.sales_snapshots;
CREATE TRIGGER protect_sales_snapshots
BEFORE UPDATE OR DELETE ON public.sales_snapshots
FOR EACH ROW EXECUTE FUNCTION public.prevent_financial_history_mutation();
