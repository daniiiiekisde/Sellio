import { supabase, isSupabaseConfigured } from './supabaseClient';
import { commissionService } from './commissionService';

export const COMMISSIONS_LEDGER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  APPROVED: 'approved',
  PAID: 'paid',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
  DISPUTED: 'disputed'
};

export const commissions = {
  ...commissionService,

  /**
   * Obtiene las entradas del libro mayor de comisiones (Commission Ledger)
   */
  getLedgerEntries: async (filters = {}) => {
    if (isSupabaseConfigured() && supabase) {
      let query = supabase.from('commission_ledger').select(`
        *,
        sales(*),
        company_profiles(company_name),
        seller_profiles(first_name, last_name, handle)
      `);
      if (filters.status) query = query.eq('status', filters.status);
      if (filters.company_id) query = query.eq('company_id', filters.company_id);
      if (filters.seller_id) query = query.eq('seller_id', filters.seller_id);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }

    // Retornar transacciones de commissionService adaptadas al ledger
    const summary = await commissionService.getAdminTransactions();
    return summary || [];
  },

  /**
   * Actualiza el estado de una comisión en el Ledger
   */
  updateLedgerStatus: async (id, status) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('commission_ledger')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    }
    return commissionService.updateStatus(id, status);
  }
};

export default commissions;
