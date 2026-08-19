import { supabase, isSupabaseConfigured } from './supabaseClient';

const INITIAL_MOCK_AUDIT_LOGS = [
  {
    id: 'aud_1',
    actor_id: 'usr_comp_1',
    actor_role: 'company',
    action: 'SALE_CONFIRMED',
    entity_type: 'sales',
    entity_id: 'sale_101',
    metadata: { product: 'AOVE D.O. 500ml', amount: 1200, commercialCommission: 180, sellioCommission: 24, offerVersion: 1 },
    created_at: '2026-08-15T11:20:00Z'
  },
  {
    id: 'aud_2',
    actor_id: 'usr_comp_2',
    actor_role: 'company',
    action: 'SALE_CONFIRMED',
    entity_type: 'sales',
    entity_id: 'sale_102',
    metadata: { product: 'Placas Solares 550W', amount: 4500, commercialCommission: 450, sellioCommission: 67.5, offerVersion: 1 },
    created_at: '2026-08-18T16:45:00Z'
  },
  {
    id: 'aud_3',
    actor_id: 'admin_1',
    actor_role: 'admin',
    action: 'VERIFICATION_APPROVED',
    entity_type: 'company_profiles',
    entity_id: 'usr_comp_1',
    metadata: { companyName: 'Iberia Gourmet SL', verified: true },
    created_at: '2026-01-15T12:00:00Z'
  }
];

let localAuditLogs = [...INITIAL_MOCK_AUDIT_LOGS];

export const auditService = {
  getAll: async () => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('audit_logs').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
    return [...localAuditLogs].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  log: async ({ actor_id, actor_role, action, entity_type, entity_id, metadata = {} }) => {
    const entry = {
      id: `aud_${Date.now()}`,
      actor_id: actor_id || 'system',
      actor_role: actor_role || 'system',
      action,
      entity_type,
      entity_id,
      metadata,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase) {
      await supabase.from('audit_logs').insert([entry]);
    }

    localAuditLogs = [entry, ...localAuditLogs];
    return entry;
  }
};

export default auditService;
