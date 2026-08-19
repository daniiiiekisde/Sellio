import { supabase, isSupabaseConfigured } from './supabaseClient';
import { calculateCommissions, DEFAULT_VOLUME_TIERS, SELLIO_MAX_COMMISSION_RATE } from '../utils/commissionCalculator';
import { COMMISSION_STATUS } from '../utils/constants';
import { validateStateTransition } from '../utils/stateTransitions';

// Store local de transacciones de comisiones para modo offline / demo
let localCommissionTransactions = [
  {
    id: 'tx_comm_101',
    deal_id: 'deal_201',
    sale_id: 'sale_101',
    product_id: 'prod_1',
    product_name: 'Aceite de Oliva Virgen Extra Ecológico D.O. 500ml',
    company_id: 'usr_comp_1',
    company_name: 'Iberia Gourmet SL',
    seller_id: 'usr_seller_1',
    seller_name: 'Carlos Mendoza',
    sale_value: 12400.00,
    units_sold: 855,
    unit_price: 14.50,
    commercial_rate: 15,
    commercial_amount: 1860.00,
    sellio_rate: 2.0,
    sellio_amount: 248.00,
    company_net: 10292.00,
    status: COMMISSION_STATUS.PAID,
    payment_trigger: 'paid_sale',
    payment_period: '30 días fin de mes',
    created_at: '2026-01-25T10:30:00Z',
    paid_at: '2026-01-31T17:00:00Z'
  },
  {
    id: 'tx_comm_102',
    deal_id: 'deal_202',
    sale_id: 'sale_102',
    product_id: 'prod_2',
    product_name: 'Placas Solares Monocristalinas de Alta Eficiencia 550W',
    company_id: 'usr_comp_2',
    company_name: 'SolarTech Solutions',
    seller_id: 'usr_seller_1',
    seller_name: 'Carlos Mendoza',
    sale_value: 14500.00,
    units_sold: 80,
    unit_price: 180.00,
    commercial_rate: 10,
    commercial_amount: 1450.00,
    sellio_rate: 2.0,
    sellio_amount: 290.00,
    company_net: 12760.00,
    status: COMMISSION_STATUS.PENDING,
    payment_trigger: 'confirmed_sale',
    payment_period: '15 días tras confirmación',
    created_at: '2026-02-08T14:15:00Z',
    paid_at: null
  },
  {
    id: 'tx_comm_103',
    deal_id: 'deal_203',
    sale_id: 'sale_103',
    product_id: 'prod_3',
    product_name: 'Sérum Rejuvenecedor con Ácido Hialurónico Puro',
    company_id: 'usr_comp_3',
    company_name: 'NovaPharma Care',
    seller_id: 'usr_seller_2',
    seller_name: 'Laura Gómez',
    sale_value: 5600.00,
    units_sold: 200,
    unit_price: 28.00,
    commercial_rate: 22,
    commercial_amount: 1232.00,
    sellio_rate: 2.5,
    sellio_amount: 140.00,
    company_net: 4228.00,
    status: COMMISSION_STATUS.PAID,
    payment_trigger: 'paid_sale',
    payment_period: 'Inmediato a liquidación',
    created_at: '2026-02-12T09:00:00Z',
    paid_at: '2026-02-14T11:20:00Z'
  }
];

export const commissionService = {
  /**
   * Obtiene resumen acumulado y transacciones para la Empresa
   */
  getCompanySummary: async (companyId) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('commission_transactions')
          .select('*')
          .eq('company_id', companyId)
          .order('created_at', { ascending: false });
        if (!error && data) {
          return processCompanyAggregates(data);
        }
      } catch (err) {
        console.warn('Supabase fallback to localCommissionTransactions:', err);
      }
    }

    const txs = companyId
      ? localCommissionTransactions.filter(t => t.company_id === companyId)
      : localCommissionTransactions;

    return processCompanyAggregates(txs);
  },

  /**
   * Obtiene resumen de comisiones para el Comercial
   */
  getSellerSummary: async (sellerId) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('commission_transactions')
          .select('*')
          .eq('seller_id', sellerId)
          .order('created_at', { ascending: false });
        if (!error && data) {
          return processSellerAggregates(data);
        }
      } catch (err) {
        console.warn('Supabase fallback to localCommissionTransactions:', err);
      }
    }

    const txs = sellerId
      ? localCommissionTransactions.filter(t => t.seller_id === sellerId)
      : localCommissionTransactions;

    return processSellerAggregates(txs);
  },

  /**
   * Obtiene todas las transacciones de comisiones (Vista Admin / Ledger)
   */
  getLedgerEntries: async (filters = {}) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        let query = supabase.from('commission_transactions').select(`
          *,
          sales(*),
          company_profiles(company_name),
          seller_profiles(first_name, last_name, handle)
        `);
        if (filters.status) query = query.eq('status', filters.status);
        if (filters.company_id) query = query.eq('company_id', filters.company_id);
        if (filters.seller_id) query = query.eq('seller_id', filters.seller_id);
        const { data, error } = await query;
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase fallback to local ledger:', err);
      }
    }

    let result = [...localCommissionTransactions];
    if (filters.status) result = result.filter(t => t.status === filters.status);
    if (filters.company_id) result = result.filter(t => t.company_id === filters.company_id);
    if (filters.seller_id) result = result.filter(t => t.seller_id === filters.seller_id);
    return result;
  },

  /**
   * Actualiza el estado de una comisión aplicando validación estricta de máquina de estados
   */
  updateStatus: async (id, targetStatus) => {
    const existing = localCommissionTransactions.find(t => t.id === id);
    const currentStatus = existing?.status || COMMISSION_STATUS.PENDING;

    const transitionCheck = validateStateTransition('commission', currentStatus, targetStatus);
    if (!transitionCheck.isValid) {
      throw new Error(transitionCheck.error);
    }

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('commission_transactions')
        .update({
          status: targetStatus,
          updated_at: new Date().toISOString(),
          paid_at: targetStatus === COMMISSION_STATUS.PAID ? new Date().toISOString() : null
        })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    }

    localCommissionTransactions = localCommissionTransactions.map(t =>
      t.id === id
        ? {
            ...t,
            status: targetStatus,
            updated_at: new Date().toISOString(),
            paid_at: targetStatus === COMMISSION_STATUS.PAID ? new Date().toISOString() : t.paid_at
          }
        : t
    );
    return localCommissionTransactions.find(t => t.id === id);
  },

  /**
   * Registra un snapshot inmutable de condiciones al confirmar un acuerdo o venta
   */
  recordTransactionSnapshot: async (snapshotData) => {
    const calculated = calculateCommissions({
      price: snapshotData.unit_price || snapshotData.price,
      commercialCommissionRate: snapshotData.commercial_rate,
      commercialCommissionAmount: snapshotData.commercial_amount,
      commercialCommissionType: snapshotData.commercial_type || 'percentage',
      sellioCommissionRate: Math.min(SELLIO_MAX_COMMISSION_RATE, snapshotData.sellio_rate || 2.0),
      sellioCommissionModel: snapshotData.sellio_model || 'fixed',
      quantity: snapshotData.units_sold || 1
    });

    const newRecord = {
      id: snapshotData.id || `tx_comm_${Date.now()}`,
      deal_id: snapshotData.deal_id || `deal_${Date.now()}`,
      sale_id: snapshotData.sale_id || null,
      product_id: snapshotData.product_id,
      product_name: snapshotData.product_name,
      company_id: snapshotData.company_id,
      company_name: snapshotData.company_name,
      seller_id: snapshotData.seller_id,
      seller_name: snapshotData.seller_name,
      sale_value: calculated.saleValue,
      units_sold: calculated.quantity,
      unit_price: calculated.unitPrice,
      commercial_rate: calculated.commercialRateApplied,
      commercial_amount: calculated.commercialCommission,
      sellio_rate: calculated.sellioRateApplied,
      sellio_amount: calculated.sellioCommission,
      company_net: calculated.companyNetBeforeOtherCosts,
      status: snapshotData.status || COMMISSION_STATUS.PENDING,
      payment_trigger: snapshotData.payment_trigger || 'paid_sale',
      payment_period: snapshotData.payment_period || '30 días fin de mes',
      created_at: new Date().toISOString(),
      paid_at: snapshotData.paid_at || null
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('commission_transactions')
          .insert([newRecord])
          .select()
          .single();
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase insert failed, storing locally:', err);
      }
    }

    localCommissionTransactions = [newRecord, ...localCommissionTransactions];
    return newRecord;
  },

  getVolumeTiers: () => DEFAULT_VOLUME_TIERS
};

const processCompanyAggregates = (transactions) => {
  const totalSales = transactions.reduce((acc, t) => acc + (t.sale_value || 0), 0);
  const totalCommercialPaid = transactions
    .filter(t => t.status === COMMISSION_STATUS.PAID)
    .reduce((acc, t) => acc + (t.commercial_amount || 0), 0);
  const totalCommercialPending = transactions
    .filter(t => t.status !== COMMISSION_STATUS.PAID && t.status !== COMMISSION_STATUS.CANCELLED)
    .reduce((acc, t) => acc + (t.commercial_amount || 0), 0);
  const totalSellioAccrued = transactions
    .reduce((acc, t) => acc + (t.sellio_amount || 0), 0);
  const totalCompanyNet = transactions
    .reduce((acc, t) => acc + (t.company_net || 0), 0);

  return {
    totalSales,
    totalCommercialPaid,
    totalCommercialPending,
    totalSellioAccrued,
    totalCompanyNet,
    transactionsCount: transactions.length,
    transactions
  };
};

const processSellerAggregates = (transactions) => {
  const totalSalesGenerated = transactions.reduce((acc, t) => acc + (t.sale_value || 0), 0);
  const totalCommissionPaid = transactions
    .filter(t => t.status === COMMISSION_STATUS.PAID)
    .reduce((acc, t) => acc + (t.commercial_amount || 0), 0);
  const totalCommissionPending = transactions
    .filter(t => t.status === COMMISSION_STATUS.PENDING || t.status === COMMISSION_STATUS.APPROVED)
    .reduce((acc, t) => acc + (t.commercial_amount || 0), 0);

  return {
    totalSalesGenerated,
    totalCommissionPaid,
    totalCommissionPending,
    totalEarnings: totalCommissionPaid + totalCommissionPending,
    transactionsCount: transactions.length,
    transactions
  };
};

export default commissionService;
