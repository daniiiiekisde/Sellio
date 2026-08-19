import { supabase, isSupabaseConfigured } from './supabaseClient';
import { calculateCommissions } from '../utils/commissionCalculator';
import { SALE_STATUS, COMMISSION_STATUS } from '../utils/constants';
import { validateStateTransition } from '../utils/stateTransitions';
import { commissionService } from './commissionService';

const INITIAL_MOCK_SALES = [
  {
    id: 'sale_101',
    agreement_id: 'agr_1',
    company_id: 'usr_comp_1',
    company_name: 'Iberia Gourmet SL',
    seller_id: 'usr_seller_1',
    seller_name: 'Carlos Mendoza (Comercial #A482)',
    product_name: 'Aceite de Oliva Virgen Extra Ecológico D.O. 500ml',
    opportunity_id: 'opp_1',
    client_name: 'Restaurante Can Fabes',
    quantity: 10,
    unit_price: 120,
    sale_value: 1200,
    commercial_rate_applied: 15,
    commercial_commission_amount: 180,
    sellio_rate_applied: 2,
    sellio_commission_amount: 24,
    company_net_amount: 996,
    offer_version_applied: 1,
    status: SALE_STATUS.CONFIRMED,
    sale_snapshot: {
      product_name: 'Aceite de Oliva Virgen Extra Ecológico D.O. 500ml',
      unit_price: 120,
      quantity: 10,
      sale_value: 1200,
      commercial_commission: 180,
      sellio_commission: 24,
      commercial_rate: 15,
      sellio_rate: 2,
      offer_version: 1,
      frozen_at: '2026-08-15T11:20:00Z'
    },
    created_at: '2026-08-15T11:20:00Z'
  },
  {
    id: 'sale_102',
    agreement_id: 'agr_2',
    company_id: 'usr_comp_2',
    company_name: 'SolarTech Solutions',
    seller_id: 'usr_seller_1',
    seller_name: 'Carlos Mendoza (Comercial #A482)',
    product_name: 'Placas Solares Monocristalinas de Alta Eficiencia 550W',
    opportunity_id: 'opp_2',
    client_name: 'Agropecuaria del Ebro SA',
    quantity: 1,
    unit_price: 4500,
    sale_value: 4500,
    commercial_rate_applied: 10,
    commercial_commission_amount: 450,
    sellio_rate_applied: 1.5,
    sellio_commission_amount: 67.5,
    company_net_amount: 3982.5,
    offer_version_applied: 1,
    status: SALE_STATUS.CONFIRMED,
    sale_snapshot: {
      product_name: 'Placas Solares Monocristalinas de Alta Eficiencia 550W',
      unit_price: 4500,
      quantity: 1,
      sale_value: 4500,
      commercial_commission: 450,
      sellio_commission: 67.5,
      commercial_rate: 10,
      sellio_rate: 1.5,
      offer_version: 1,
      frozen_at: '2026-08-18T16:45:00Z'
    },
    created_at: '2026-08-18T16:45:00Z'
  }
];

let localSalesStore = [...INITIAL_MOCK_SALES];

export const salesService = {
  getAll: async (filters = {}) => {
    if (isSupabaseConfigured() && supabase) {
      let query = supabase.from('sales').select(`
        *,
        company_profiles(company_name, trade_name),
        seller_profiles(first_name, last_name, handle),
        sales_snapshots(*)
      `);
      if (filters.company_id) query = query.eq('company_id', filters.company_id);
      if (filters.seller_id) query = query.eq('seller_id', filters.seller_id);
      if (filters.status) query = query.eq('status', filters.status);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }

    let filtered = [...localSalesStore];
    if (filters.company_id) filtered = filtered.filter(s => s.company_id === filters.company_id);
    if (filters.seller_id) filtered = filtered.filter(s => s.seller_id === filters.seller_id);
    if (filters.status) filtered = filtered.filter(s => s.status === filters.status);
    return filtered;
  },

  getById: async (id) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('sales').select('*, sales_snapshots(*)').eq('id', id).single();
      if (error) throw error;
      return data;
    }
    return localSalesStore.find(s => s.id === id) || null;
  },

  /**
   * Registra y confirma una venta con Snapshot Inmutable de condiciones
   */
  createAndConfirmSale: async ({
    agreement_id,
    company_id,
    company_name,
    seller_id,
    seller_name,
    opportunity_id,
    product_name,
    client_name,
    unit_price = 0,
    quantity = 1,
    commercial_commission_rate = 15,
    sellio_commission_rate = 2,
    offer_version = 1
  }) => {
    const calc = calculateCommissions({
      price: unit_price,
      quantity,
      commercialCommissionRate: commercial_commission_rate,
      sellioCommissionRate: sellio_commission_rate
    });

    const snapshot = {
      product_name,
      unit_price,
      quantity,
      sale_value: calc.saleValue,
      commercial_commission: calc.commercialCommission,
      sellio_commission: calc.sellioCommission,
      commercial_rate: calc.commercialRateApplied,
      sellio_rate: calc.sellioRateApplied,
      company_net: calc.companyNetBeforeOtherCosts,
      offer_version,
      frozen_at: new Date().toISOString()
    };

    const newSale = {
      id: `sale_${Date.now()}`,
      agreement_id,
      company_id,
      company_name: company_name || 'Empresa',
      seller_id,
      seller_name: seller_name || 'Comercial',
      opportunity_id,
      product_name,
      client_name: client_name || 'Cliente B2B',
      quantity,
      unit_price,
      sale_value: calc.saleValue,
      commercial_rate_applied: calc.commercialRateApplied,
      commercial_commission_amount: calc.commercialCommission,
      sellio_rate_applied: calc.sellioRateApplied,
      sellio_commission_amount: calc.sellioCommission,
      company_net_amount: calc.companyNetBeforeOtherCosts,
      offer_version_applied: offer_version,
      status: SALE_STATUS.CONFIRMED,
      sale_snapshot: snapshot,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase) {
      const { data: savedSale, error } = await supabase.from('sales').insert([newSale]).select().single();
      if (error) throw error;
      // Inserción en snapshot inmutable
      await supabase.from('sales_snapshots').insert([{
        sale_id: savedSale.id,
        snapshot_data: snapshot
      }]);
      // Crear transacción de comisión automáticamente
      await commissionService.recordTransactionSnapshot({
        sale_id: savedSale.id,
        deal_id: agreement_id,
        company_id,
        company_name,
        seller_id,
        seller_name,
        product_name,
        unit_price,
        units_sold: quantity,
        commercial_rate: calc.commercialRateApplied,
        sellio_rate: calc.sellioRateApplied,
        status: COMMISSION_STATUS.PENDING
      });
      return savedSale;
    }

    localSalesStore = [newSale, ...localSalesStore];
    // Guardar transacción en comisiones
    await commissionService.recordTransactionSnapshot({
      sale_id: newSale.id,
      deal_id: agreement_id,
      company_id,
      company_name,
      seller_id,
      seller_name,
      product_name,
      unit_price,
      units_sold: quantity,
      commercial_rate: calc.commercialRateApplied,
      sellio_rate: calc.sellioRateApplied,
      status: COMMISSION_STATUS.PENDING
    });

    return newSale;
  },

  /**
   * Actualiza el estado de una venta validando la máquina de estados
   */
  updateStatus: async (id, targetStatus) => {
    const existing = localSalesStore.find(s => s.id === id);
    const currentStatus = existing?.status || SALE_STATUS.PENDING;

    const transitionCheck = validateStateTransition('sale', currentStatus, targetStatus);
    if (!transitionCheck.isValid) {
      throw new Error(transitionCheck.error);
    }

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('sales')
        .update({ status: targetStatus, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    }

    localSalesStore = localSalesStore.map(s =>
      s.id === id ? { ...s, status: targetStatus, updated_at: new Date().toISOString() } : s
    );
    return localSalesStore.find(s => s.id === id);
  }
};

export default salesService;
