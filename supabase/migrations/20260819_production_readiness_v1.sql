-- ==============================================================================
-- SELLIO — PRODUCTION READINESS V1
-- Backend Matching Engine (RPC), Commission Locks & Strict RLS Assertions
-- ==============================================================================

-- 1. FUNCIÓN PL/pgSQL: Motor de Sellio Match en Base de Datos (Seguridad Backend)
CREATE OR REPLACE FUNCTION calculate_seller_opportunity_match(
  p_seller_id UUID,
  p_opportunity_id UUID
) RETURNS JSONB AS $$
DECLARE
  v_seller RECORD;
  v_opp RECORD;
  v_score INT := 0;
  v_reasons TEXT[] := ARRAY[]::TEXT[];
  v_tags TEXT[] := ARRAY[]::TEXT[];
BEGIN
  -- Obtener perfil del comercial
  SELECT * INTO v_seller FROM seller_profiles WHERE id = p_seller_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('score', 65, 'reason', 'Perfil comercial inicial', 'tags', ARRAY['Perfil nuevo']);
  END IF;

  -- Obtener oportunidad
  SELECT * INTO v_opp FROM opportunities WHERE id = p_opportunity_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('score', 0, 'reason', 'Oportunidad no encontrada', 'tags', ARRAY[]::TEXT[]);
  END IF;

  -- A. Sector Match (+35 pts)
  IF v_seller.sectors && ARRAY[v_opp.sector] OR v_opp.sector IS NULL THEN
    v_score := v_score + 35;
    v_reasons := array_append(v_reasons, 'vendes en ' || COALESCE(v_opp.sector, 'este sector'));
    v_tags := array_append(v_tags, '✓ Sector Afín');
  ELSE
    v_score := v_score + 10;
  END IF;

  -- B. Territorio / Región Match (+30 pts)
  IF v_seller.regions && ARRAY[v_opp.target_region] OR v_opp.target_region ILIKE '%Nacional%' THEN
    v_score := v_score + 30;
    v_reasons := array_append(v_reasons, 'cubres ' || v_opp.target_region);
    v_tags := array_append(v_tags, '✓ Territorio ' || v_opp.target_region);
  ELSE
    v_score := v_score + 5;
  END IF;

  -- C. Experiencia (+20 pts)
  IF COALESCE(v_seller.years_experience, 0) >= 2 THEN
    v_score := v_score + 20;
    v_reasons := array_append(v_reasons, 'cuentas con ' || v_seller.years_experience || ' años de experiencia');
    v_tags := array_append(v_tags, '✓ Exp. ' || v_seller.years_experience || ' años');
  ELSE
    v_score := v_score + 10;
  END IF;

  -- D. Idiomas (+15 pts)
  IF array_length(v_seller.languages, 1) > 0 THEN
    v_score := v_score + 15;
    v_tags := array_append(v_tags, '✓ Idiomas');
  END IF;

  v_score := LEAST(99, GREATEST(65, v_score));

  RETURN jsonb_build_object(
    'score', v_score,
    'reason', 'Coincides porque ' || array_to_string(v_reasons, ', ') || '.',
    'tags', v_tags,
    'is_top_match', v_score >= 90
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. TRIGGER: Bloqueo de Modificación de Condiciones Económicas en Ventas Confirmadas
CREATE OR REPLACE FUNCTION enforce_immutable_confirmed_sales()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IN ('confirmed', 'completed') THEN
    IF NEW.sale_value <> OLD.sale_value OR
       NEW.commercial_commission_amount <> OLD.commercial_commission_amount OR
       NEW.sellio_commission_amount <> OLD.sellio_commission_amount OR
       NEW.commercial_rate_applied <> OLD.commercial_rate_applied OR
       NEW.offer_version_applied <> OLD.offer_version_applied THEN
      RAISE EXCEPTION 'SELLIO_SECURITY_ERROR: No se pueden alterar los importes de una venta ya confirmada.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_immutable_confirmed_sales ON sales;
CREATE TRIGGER trg_immutable_confirmed_sales
BEFORE UPDATE ON sales
FOR EACH ROW
EXECUTE FUNCTION enforce_immutable_confirmed_sales();

-- 3. POLÍTICAS RLS ESTRICTAS
-- Asegurar que una empresa no pueda leer ventas de otra empresa
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Empresas solo ven sus propias ventas" ON sales;
CREATE POLICY "Empresas solo ven sus propias ventas"
ON sales FOR ALL
USING (
  company_id = auth.uid() OR
  seller_id = auth.uid() OR
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);
