import { supabase, isSupabaseConfigured } from './supabaseClient';

const INITIAL_MOCK_AGREEMENTS = [
  {
    id: 'agr_1',
    company_id: 'usr_comp_1',
    company_name: 'Iberia Gourmet SL',
    seller_id: 'usr_seller_1',
    seller_name: 'Carlos Mendoza (Comercial #A482)',
    opportunity_id: 'opp_1',
    product_name: 'Aceite de Oliva Virgen Extra Ecológico D.O. 500ml',
    agreed_commission_rate: 15,
    agreed_commission_type: 'percentage',
    agreed_price: 120,
    target_region: 'Cataluña',
    status: 'active', // draft | pending | active | completed | terminated | cancelled
    signed_at: '2026-08-01T10:00:00Z',
    created_at: '2026-08-01T09:30:00Z'
  },
  {
    id: 'agr_2',
    company_id: 'usr_comp_2',
    company_name: 'SolarTech Solutions',
    seller_id: 'usr_seller_1',
    seller_name: 'Carlos Mendoza (Comercial #A482)',
    opportunity_id: 'opp_2',
    product_name: 'Placas Solares Monocristalinas de Alta Eficiencia 550W',
    agreed_commission_rate: 10,
    agreed_commission_type: 'percentage',
    agreed_price: 4500,
    target_region: 'España (Nacional)',
    status: 'active',
    signed_at: '2026-08-10T14:20:00Z',
    created_at: '2026-08-09T16:00:00Z'
  }
];

let localAgreementsStore = [...INITIAL_MOCK_AGREEMENTS];

export const agreementsService = {
  getAll: async (filters = {}) => {
    if (isSupabaseConfigured() && supabase) {
      let query = supabase.from('agreements').select(`
        *,
        company_profiles(company_name, trade_name),
        seller_profiles(first_name, last_name, handle),
        opportunities(title, product_name)
      `);
      if (filters.company_id) query = query.eq('company_id', filters.company_id);
      if (filters.seller_id) query = query.eq('seller_id', filters.seller_id);
      if (filters.status) query = query.eq('status', filters.status);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }

    let filtered = [...localAgreementsStore];
    if (filters.company_id) filtered = filtered.filter(a => a.company_id === filters.company_id);
    if (filters.seller_id) filtered = filtered.filter(a => a.seller_id === filters.seller_id);
    if (filters.status) filtered = filtered.filter(a => a.status === filters.status);
    return filtered;
  },

  getById: async (id) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('agreements').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    }
    return localAgreementsStore.find(a => a.id === id) || null;
  },

  create: async (agreementData) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('agreements').insert([agreementData]).select().single();
      if (error) throw error;
      return data;
    }

    const newAgr = {
      ...agreementData,
      id: `agr_${Date.now()}`,
      status: agreementData.status || 'pending',
      created_at: new Date().toISOString()
    };
    localAgreementsStore = [newAgr, ...localAgreementsStore];
    return newAgr;
  },

  updateStatus: async (id, status) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('agreements')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    }

    localAgreementsStore = localAgreementsStore.map(a =>
      a.id === id ? { ...a, status, updated_at: new Date().toISOString() } : a
    );
    return localAgreementsStore.find(a => a.id === id);
  }
};

export default agreementsService;
