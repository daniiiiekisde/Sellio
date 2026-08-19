import { supabase, isSupabaseConfigured } from './supabaseClient';

const INITIAL_MOCK_VERIFICATIONS = [
  {
    id: 'ver_1',
    user_id: 'usr_comp_1',
    entity_type: 'company',
    entity_name: 'Iberia Gourmet SL',
    status: 'verified',
    submitted_docs: ['cif_document.pdf', 'escritura_constitucion.pdf'],
    reviewed_by: 'admin_1',
    verified_at: '2026-01-15T12:00:00Z',
    events: [
      { event_name: 'Documentación aportada', created_at: '2026-01-14T09:00:00Z' },
      { event_name: 'Validación CIF en Registro Mercantil', created_at: '2026-01-15T11:00:00Z' },
      { event_name: 'Verificación Oficial Aprobada', created_at: '2026-01-15T12:00:00Z' }
    ]
  },
  {
    id: 'ver_2',
    user_id: 'usr_seller_1',
    entity_type: 'seller',
    entity_name: 'Carlos Mendoza',
    status: 'verified',
    submitted_docs: ['dni_nie.pdf', 'alta_autonomos_iaer.pdf'],
    reviewed_by: 'admin_1',
    verified_at: '2026-01-20T10:00:00Z',
    events: [
      { event_name: 'Documentos DNI y Alta censal recibidos', created_at: '2026-01-19T15:00:00Z' },
      { event_name: 'Identidad Profesional Verificada', created_at: '2026-01-20T10:00:00Z' }
    ]
  }
];

let localVerificationsStore = [...INITIAL_MOCK_VERIFICATIONS];

export const verificationService = {
  getAll: async (filters = {}) => {
    if (isSupabaseConfigured() && supabase) {
      let query = supabase.from('verification_events').select('*');
      if (filters.status) query = query.eq('status', filters.status);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
    let filtered = [...localVerificationsStore];
    if (filters.status) filtered = filtered.filter(v => v.status === filters.status);
    return filtered;
  },

  getForUser: async (userId) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('verification_events').select('*').eq('user_id', userId);
      if (error) throw error;
      return data;
    }
    return localVerificationsStore.find(v => v.user_id === userId) || { status: 'unverified', events: [] };
  },

  requestVerification: async ({ userId, entityType, entityName, documentNames = [] }) => {
    const newRequest = {
      id: `ver_${Date.now()}`,
      user_id: userId,
      entity_type: entityType,
      entity_name: entityName,
      status: 'pending',
      submitted_docs: documentNames,
      events: [
        { event_name: 'Solicitud enviada para revisión', created_at: new Date().toISOString() }
      ],
      created_at: new Date().toISOString()
    };
    localVerificationsStore = [newRequest, ...localVerificationsStore];
    return newRequest;
  },

  updateStatus: async (id, status) => {
    localVerificationsStore = localVerificationsStore.map(v =>
      v.id === id ? { ...v, status, updated_at: new Date().toISOString() } : v
    );
    return localVerificationsStore.find(v => v.id === id);
  }
};

export default verificationService;
