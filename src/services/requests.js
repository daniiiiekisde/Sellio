import { supabase, isSupabaseConfigured } from './supabaseClient';
import { messagesService } from './messages';

const STORAGE_KEY = 'sellio_requests';

const INITIAL_REQUESTS = [
  {
    id: 'req_1',
    opportunityId: 'opp_1',
    opportunityTitle: 'Expansión de Canal HORECA y Tiendas Gourmet en Cataluña',
    productName: 'Aceite de Oliva Virgen Extra Ecológico D.O. 500ml',
    companyName: 'Iberia Gourmet SL',
    sellerId: 'sell_1',
    sellerAnonymousId: 'COMERCIAL #A482',
    sellerExperience: '+12 años de experiencia',
    sellerRegion: 'Cataluña (Barcelona y Girona)',
    sellerSector: 'Alimentación y Bebidas (HORECA)',
    sellerSpecialization: 'Canal HORECA y Alimentación Gourmet',
    sellerMatchScore: 95,
    message: 'Dispongo de cartera activa con más de 80 restaurantes de alta gama y tiendas gourmet en Barcelona y Girona. Me interesa representar vuestro AOVE.',
    shareFullContact: false,
    appliedDate: '16/02/2026',
    status: 'Pendiente' // 'Pendiente' | 'Aceptada' | 'Descartada'
  },
  {
    id: 'req_2',
    opportunityId: 'opp_3',
    opportunityTitle: 'Distribución Exclusiva en Farmacias y Clínicas de Medicina Estética',
    productName: 'Sérum Rejuvenecedor con Ácido Hialurónico Puro',
    companyName: 'NovaPharma Care',
    sellerId: 'sell_2',
    sellerAnonymousId: 'COMERCIAL #M719',
    sellerExperience: '+8 años de experiencia',
    sellerRegion: 'Comunidad de Madrid',
    sellerSector: 'Salud y Farmacia',
    sellerSpecialization: 'Oficinas de Farmacia y Dermocosmética',
    sellerMatchScore: 91,
    message: 'Visita activa a 80+ farmacias en Madrid. Interesada en incorporar esta línea a mi catálogo de representación.',
    shareFullContact: true,
    appliedDate: '17/02/2026',
    status: 'Aceptada'
  }
];

export const getStoredRequests = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REQUESTS));
      return INITIAL_REQUESTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_REQUESTS;
  }
};

export const saveStoredRequests = (requests) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    window.dispatchEvent(new Event('sellio_requests_updated'));
  } catch (e) {
    console.error('Error saving requests:', e);
  }
};

export const requestsService = {
  getAll: async () => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('seller_opportunity_requests')
        .select('*, opportunities(*), company_profiles(*), seller_profiles(*)');
      if (error) {
        console.warn('Error fetching supabase requests, using fallback:', error);
        return getStoredRequests();
      }
      return data && data.length > 0 ? data : getStoredRequests();
    }
    return getStoredRequests();
  },

  getByCompany: async (companyName) => {
    const all = await requestsService.getAll();
    if (!companyName) return all;
    return all.filter(r => (r.companyName || r.company_profiles?.company_name || '').toLowerCase().includes(companyName.toLowerCase()));
  },

  getBySeller: async (sellerId) => {
    const all = await requestsService.getAll();
    if (!sellerId) return all;
    return all.filter(r => r.sellerId === sellerId || r.seller_id === sellerId);
  },

  create: async (requestData) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('seller_opportunity_requests')
          .insert([{
            opportunity_id: requestData.opportunityId,
            seller_id: requestData.sellerId,
            message: requestData.message,
            status: 'pending'
          }])
          .select()
          .single();
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase request insert failed, storing locally:', err);
      }
    }

    const all = getStoredRequests();
    const newRequest = {
      id: `req_${Date.now()}`,
      appliedDate: new Date().toLocaleDateString('es-ES'),
      status: 'Pendiente',
      ...requestData
    };
    const updated = [newRequest, ...all];
    saveStoredRequests(updated);
    return newRequest;
  },

  updateStatus: async (id, newStatus) => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase
          .from('seller_opportunity_requests')
          .update({ status: newStatus.toLowerCase() })
          .eq('id', id);
      } catch (err) {
        console.warn('Supabase status update error:', err);
      }
    }

    const all = getStoredRequests();
    const req = all.find(r => r.id === id);
    const updated = all.map(r => (r.id === id ? { ...r, status: newStatus } : r));
    saveStoredRequests(updated);

    // Si la empresa acepta la postulación, abrir canal de conversación automáticamente
    if (newStatus === 'Aceptada' || newStatus === 'accepted') {
      messagesService.createConversationFromRequest(req || { id, title: 'Oportunidad Aceptada' });
    }

    return updated;
  }
};

export default requestsService;
