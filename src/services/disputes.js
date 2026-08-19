import { supabase, isSupabaseConfigured } from './supabaseClient';

const INITIAL_MOCK_DISPUTES = [
  {
    id: 'disp_1',
    sale_id: 'sale_101',
    company_id: 'usr_comp_1',
    company_name: 'Iberia Gourmet SL',
    seller_id: 'usr_seller_1',
    seller_name: 'Carlos Mendoza',
    raised_by: 'seller',
    reason: 'Comisión no abonada en fecha pactada',
    amount_disputed: 180,
    status: 'under_review', // open | under_review | resolved | closed
    evidence: ['albaran_entrega.pdf', 'recibo_bancario_cliente.pdf'],
    resolution_notes: null,
    created_at: '2026-08-16T10:00:00Z'
  }
];

let localDisputesStore = [...INITIAL_MOCK_DISPUTES];

export const disputesService = {
  getAll: async (filters = {}) => {
    if (isSupabaseConfigured() && supabase) {
      let query = supabase.from('disputes').select('*');
      if (filters.status) query = query.eq('status', filters.status);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
    let filtered = [...localDisputesStore];
    if (filters.status) filtered = filtered.filter(d => d.status === filters.status);
    return filtered;
  },

  create: async (disputeData) => {
    const newDispute = {
      ...disputeData,
      id: `disp_${Date.now()}`,
      status: 'open',
      created_at: new Date().toISOString()
    };
    localDisputesStore = [newDispute, ...localDisputesStore];
    return newDispute;
  },

  resolve: async (id, { status = 'resolved', resolution_notes = '' }) => {
    localDisputesStore = localDisputesStore.map(d =>
      d.id === id ? { ...d, status, resolution_notes, resolved_at: new Date().toISOString() } : d
    );
    return localDisputesStore.find(d => d.id === id);
  }
};

export default disputesService;
