-- ==============================================================================
-- SELLIO — ESQUEMA COMPLETO DE BASE DE DATOS POSTGRESQL + SUPABASE (MVP)
-- Basado en: MVP_NUEVAS_FUNCIONALIDADES.md
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. TABLAS PRINCIPALES
-- ==============================================================================

-- PROFILES (Usuarios base vinculados a auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK (role IN ('company', 'seller', 'admin')),
    full_name TEXT,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- COMPANY PROFILES
CREATE TABLE IF NOT EXISTS public.company_profiles (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    trade_name TEXT,
    cif_nif TEXT,
    sector TEXT,
    website TEXT,
    description TEXT,
    verification_status TEXT DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'pending', 'verified', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SELLER PROFILES (Con Privacidad Progresiva y Handle Anónimo)
CREATE TABLE IF NOT EXISTS public.seller_profiles (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    handle TEXT NOT NULL UNIQUE, -- ej: 'Comercial #A482'
    first_name TEXT,
    last_name TEXT,
    dni_nie TEXT,
    phone TEXT,
    sectors TEXT[] DEFAULT '{}',
    regions TEXT[] DEFAULT '{}',
    languages TEXT[] DEFAULT '{"Español"}',
    years_experience INT DEFAULT 0,
    availability TEXT DEFAULT 'full_time',
    verification_status TEXT DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'pending', 'verified', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PRODUCTS (Representa QUÉ vende la empresa)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.company_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    currency TEXT DEFAULT 'EUR',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- OPPORTUNITIES (Representa la NECESIDAD DE COMERCIALIZACIÓN)
CREATE TABLE IF NOT EXISTS public.opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.company_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    product_name TEXT,
    category TEXT,
    sector TEXT NOT NULL,
    target_region TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (price >= 0),
    currency TEXT DEFAULT 'EUR',
    -- Comisiones
    commercial_commission_type TEXT DEFAULT 'percentage' CHECK (commercial_commission_type IN ('percentage', 'fixed_amount')),
    commercial_commission_rate NUMERIC(5, 2) DEFAULT 15.00 CHECK (commercial_commission_rate >= 0 AND commercial_commission_rate <= 100),
    commercial_commission_amount NUMERIC(12, 2) DEFAULT 0 CHECK (commercial_commission_amount >= 0),
    sellio_commission_model TEXT DEFAULT 'fixed' CHECK (sellio_commission_model IN ('fixed', 'volume_tiered')),
    sellio_commission_rate NUMERIC(5, 2) DEFAULT 2.00 CHECK (sellio_commission_rate >= 0 AND sellio_commission_rate <= 5.00), -- Tope máx estricto 5%
    -- Condiciones y Ciclo de Vida
    required_experience TEXT,
    badge_type TEXT DEFAULT 'NUEVA',
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'pending_review', 'published', 'paused', 'expired', 'archived', 'cancelled')),
    offer_version INT DEFAULT 1 CHECK (offer_version >= 1),
    active_from TIMESTAMPTZ DEFAULT NOW(),
    active_until TIMESTAMPTZ,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- OPPORTUNITY_PRODUCTS (Relación many-to-many entre Oportunidades y Productos)
CREATE TABLE IF NOT EXISTS public.opportunity_products (
    opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    PRIMARY KEY (opportunity_id, product_id)
);

-- AGREEMENTS (Acuerdos formales entre Empresa y Comercial)
CREATE TABLE IF NOT EXISTS public.agreements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.company_profiles(id) ON DELETE RESTRICT,
    seller_id UUID NOT NULL REFERENCES public.seller_profiles(id) ON DELETE RESTRICT,
    opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    agreed_price NUMERIC(12, 2) NOT NULL CHECK (agreed_price >= 0),
    agreed_commission_rate NUMERIC(5, 2) NOT NULL CHECK (agreed_commission_rate >= 0),
    agreed_commission_type TEXT DEFAULT 'percentage',
    target_region TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'pending', 'active', 'completed', 'terminated', 'cancelled')),
    signed_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SALES (Registro oficial de ventas)
CREATE TABLE IF NOT EXISTS public.sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agreement_id UUID REFERENCES public.agreements(id) ON DELETE SET NULL,
    company_id UUID NOT NULL REFERENCES public.company_profiles(id) ON DELETE RESTRICT,
    seller_id UUID NOT NULL REFERENCES public.seller_profiles(id) ON DELETE RESTRICT,
    opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    client_name TEXT NOT NULL,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
    sale_value NUMERIC(12, 2) NOT NULL CHECK (sale_value >= 0),
    commercial_rate_applied NUMERIC(5, 2) NOT NULL,
    commercial_commission_amount NUMERIC(12, 2) NOT NULL CHECK (commercial_commission_amount >= 0),
    sellio_rate_applied NUMERIC(5, 2) NOT NULL CHECK (sellio_rate_applied <= 5.00),
    sellio_commission_amount NUMERIC(12, 2) NOT NULL CHECK (sellio_commission_amount >= 0),
    company_net_amount NUMERIC(12, 2) NOT NULL,
    offer_version_applied INT NOT NULL DEFAULT 1,
    status TEXT DEFAULT 'confirmed' CHECK (status IN ('lead', 'interested', 'contacted', 'negotiation', 'agreement', 'sale_pending', 'sale_confirmed', 'cancelled', 'refunded')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SALES_SNAPSHOTS (Copia 100% Inmutable de condiciones de venta)
CREATE TABLE IF NOT EXISTS public.sales_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sale_id UUID NOT NULL REFERENCES public.sales(id) ON DELETE CASCADE,
    snapshot_data JSONB NOT NULL,
    frozen_at TIMESTAMPTZ DEFAULT NOW()
);

-- COMMISSION_LEDGER (Libro mayor inmutable de liquidaciones)
CREATE TABLE IF NOT EXISTS public.commission_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sale_id UUID NOT NULL REFERENCES public.sales(id) ON DELETE RESTRICT,
    company_id UUID NOT NULL REFERENCES public.company_profiles(id) ON DELETE RESTRICT,
    seller_id UUID NOT NULL REFERENCES public.seller_profiles(id) ON DELETE RESTRICT,
    commercial_amount NUMERIC(12, 2) NOT NULL,
    sellio_amount NUMERIC(12, 2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'approved', 'paid', 'cancelled', 'refunded', 'disputed')),
    payment_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- DISPUTES (Incidencias y reclamaciones)
CREATE TABLE IF NOT EXISTS public.disputes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sale_id UUID REFERENCES public.sales(id) ON DELETE SET NULL,
    company_id UUID NOT NULL REFERENCES public.company_profiles(id) ON DELETE RESTRICT,
    seller_id UUID NOT NULL REFERENCES public.seller_profiles(id) ON DELETE RESTRICT,
    raised_by TEXT NOT NULL CHECK (raised_by IN ('company', 'seller')),
    reason TEXT NOT NULL,
    amount_disputed NUMERIC(12, 2) NOT NULL DEFAULT 0,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'under_review', 'resolved', 'closed')),
    resolution_notes TEXT,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AUDIT_LOGS (Registro de auditoría estricta)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID NOT NULL,
    actor_role TEXT NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 3. FUNCIONES RPC DE NEGOCIO (Backend Seguro)
-- ==============================================================================

-- Cálculo de comisiones en servidor con tope del 5%
CREATE OR REPLACE FUNCTION public.calculate_commission(
    p_price NUMERIC,
    p_qty INT,
    p_commercial_rate NUMERIC,
    p_sellio_rate NUMERIC
)
RETURNS JSONB AS $$
DECLARE
    v_sale_val NUMERIC;
    v_comm_rate NUMERIC;
    v_sellio_rate NUMERIC;
    v_comm_amount NUMERIC;
    v_sellio_amount NUMERIC;
    v_net NUMERIC;
BEGIN
    v_sale_val := ROUND(p_price * p_qty, 2);
    v_comm_rate := p_commercial_rate;
    v_sellio_rate := LEAST(5.00, GREATEST(0.00, p_sellio_rate)); -- Límite 5%
    
    v_comm_amount := ROUND(v_sale_val * (v_comm_rate / 100.0), 2);
    v_sellio_amount := ROUND(v_sale_val * (v_sellio_rate / 100.0), 2);
    v_net := ROUND(v_sale_val - v_comm_amount - v_sellio_amount, 2);

    RETURN jsonb_build_object(
        'sale_value', v_sale_val,
        'commercial_commission', v_comm_amount,
        'commercial_rate', v_comm_rate,
        'sellio_commission', v_sellio_amount,
        'sellio_rate', v_sellio_rate,
        'company_net', v_net
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Políticas de Consulta Pública / Autenticada
CREATE POLICY "Public opportunities view" ON public.opportunities FOR SELECT USING (status = 'published');
CREATE POLICY "Public products view" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Public companies view" ON public.company_profiles FOR SELECT USING (true);
CREATE POLICY "Public sellers view" ON public.seller_profiles FOR SELECT USING (true);

-- Políticas de Usuario Propietario (CRUD)
CREATE POLICY "Company owns products" ON public.products FOR ALL USING (auth.uid() = company_id);
CREATE POLICY "Company owns opportunities" ON public.opportunities FOR ALL USING (auth.uid() = company_id);
CREATE POLICY "Company/Seller view agreements" ON public.agreements FOR SELECT USING (auth.uid() = company_id OR auth.uid() = seller_id);
CREATE POLICY "Company/Seller view sales" ON public.sales FOR SELECT USING (auth.uid() = company_id OR auth.uid() = seller_id);
CREATE POLICY "Company/Seller view ledger" ON public.commission_ledger FOR SELECT USING (auth.uid() = company_id OR auth.uid() = seller_id);
CREATE POLICY "User notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);
