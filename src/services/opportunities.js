import { supabase, isSupabaseConfigured } from './supabaseClient';

const INITIAL_MOCK_OPPORTUNITIES = [
  {
    id: 'opp_1',
    company_id: 'usr_comp_1',
    company_name: 'Iberia Gourmet SL',
    product_name: 'Aceite de Oliva Virgen Extra Ecológico D.O. 500ml',
    title: 'Expansión de Canal HORECA y Tiendas Gourmet en Cataluña',
    category: 'Alimentación y Bebidas',
    sector: 'Alimentación y Bebidas (HORECA)',
    target_region: 'Cataluña',
    price: 120,
    commercial_commission_rate: 15,
    commercial_commission_type: 'percentage',
    sellio_commission_rate: 2,
    required_experience: 'Media (2-3 años en canal gourmet)',
    status: 'published',
    badge_type: 'ALTA COMISIÓN',
    is_verified_company: true,
    matching_score: 95,
    offer_version: 1,
    applicationsCount: 4,
    description: 'Buscamos agente comercial colegiado o empresa de representación con experiencia demostrable para introducir nuestro AOVE de alta gama en restaurantes con estrella y tiendas gourmet de Barcelona y Girona.',
    created_at: new Date().toISOString()
  },
  {
    id: 'opp_2',
    company_id: 'usr_comp_2',
    company_name: 'SolarTech Solutions',
    product_name: 'Placas Solares Monocristalinas de Alta Eficiencia 550W',
    title: 'Representante Técnico Comercial para Soluciones Fotovoltaicas Industriales',
    category: 'Industrial y Maquinaria',
    sector: 'Energías Renovables',
    target_region: 'España (Nacional)',
    price: 4500,
    commercial_commission_rate: 10,
    commercial_commission_type: 'percentage',
    sellio_commission_rate: 1.5,
    required_experience: 'Alta (>4 años industrial)',
    status: 'published',
    badge_type: 'URGENTE',
    is_verified_company: true,
    matching_score: 89,
    offer_version: 1,
    applicationsCount: 3,
    description: 'Seleccionamos profesionales independientes para captar proyectos de autoconsumo industrial de 20kW a 200kW con respaldo de ingeniería propia y financiación directa.',
    created_at: new Date().toISOString()
  },
  {
    id: 'opp_3',
    company_id: 'usr_comp_3',
    company_name: 'NovaPharma Care',
    product_name: 'Sérum Rejuvenecedor con Ácido Hialurónico Puro',
    title: 'Distribución Exclusiva en Farmacias y Clínicas de Medicina Estética',
    category: 'Salud y Cosmética',
    sector: 'Salud y Farmacia',
    target_region: 'Madrid',
    price: 85,
    commercial_commission_rate: 20,
    commercial_commission_type: 'percentage',
    sellio_commission_rate: 2,
    required_experience: 'Media (Red de farmacias)',
    status: 'published',
    badge_type: 'NUEVA',
    is_verified_company: false,
    matching_score: 82,
    offer_version: 2,
    applicationsCount: 2,
    description: 'Lanzamiento de línea dermocosmética con soporte publicitario, muestras gratuitas para captación y comisiones garantizadas sobre pedidos iniciales y reposición periódica.',
    created_at: new Date().toISOString()
  }
];

let localOpportunitiesStore = [...INITIAL_MOCK_OPPORTUNITIES];

export const opportunitiesService = {
  getAll: async (filters = {}) => {
    if (isSupabaseConfigured() && supabase) {
      let query = supabase.from('opportunities').select(`
        *,
        company_profiles(company_name, trade_name, verification_status),
        opportunity_products(product_id, products(*))
      `);
      if (filters.sector && filters.sector !== 'Todos') {
        query = query.eq('sector', filters.sector);
      }
      if (filters.region && filters.region !== 'Todas') {
        query = query.eq('target_region', filters.region);
      }
      if (filters.company_id) {
        query = query.eq('company_id', filters.company_id);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }

    let filtered = [...localOpportunitiesStore];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(o =>
        (o.title && o.title.toLowerCase().includes(q)) ||
        (o.product_name && o.product_name.toLowerCase().includes(q)) ||
        (o.company_name && o.company_name.toLowerCase().includes(q)) ||
        (o.sector && o.sector.toLowerCase().includes(q))
      );
    }
    if (filters.category) {
      filtered = filtered.filter(o => o.category === filters.category);
    }
    if (filters.sector && filters.sector !== 'Todos') {
      filtered = filtered.filter(o => o.sector === filters.sector);
    }
    if (filters.region && filters.region !== 'Todas') {
      filtered = filtered.filter(o => o.target_region === filters.region || o.targetTerritory === filters.region);
    }
    if (filters.company_id) {
      filtered = filtered.filter(o => o.company_id === filters.company_id);
    }
    if (filters.minCommission) {
      const minComm = parseFloat(filters.minCommission);
      filtered = filtered.filter(o => (o.commercial_commission_rate || 0) >= minComm);
    }
    if (filters.onlyVerified) {
      filtered = filtered.filter(o => o.is_verified_company);
    }
    if (filters.status) {
      filtered = filtered.filter(o => o.status === filters.status);
    }

    // Sorting
    if (filters.sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (filters.sortBy === 'highest_commission') {
      filtered.sort((a, b) => (b.commercial_commission_rate || 0) - (a.commercial_commission_rate || 0));
    } else if (filters.sortBy === 'highest_earn') {
      filtered.sort((a, b) => {
        const earnA = (a.price || 0) * ((a.commercial_commission_rate || 0) / 100);
        const earnB = (b.price || 0) * ((b.commercial_commission_rate || 0) / 100);
        return earnB - earnA;
      });
    } else if (filters.sortBy === 'verified_first') {
      filtered.sort((a, b) => (b.is_verified_company ? 1 : 0) - (a.is_verified_company ? 1 : 0));
    }

    return filtered;
  },

  getById: async (id) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('opportunities')
        .select(`
          *,
          company_profiles(*),
          opportunity_products(product_id, products(*))
        `)
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    }
    return localOpportunitiesStore.find(o => o.id === id) || null;
  },

  create: async (oppData) => {
    if (isSupabaseConfigured() && supabase) {
      const { productIds, ...mainData } = oppData;
      const { data: createdOpp, error } = await supabase
        .from('opportunities')
        .insert([{
          ...mainData,
          offer_version: 1,
          status: mainData.status || 'published'
        }])
        .select()
        .single();
      if (error) throw error;

      if (productIds && productIds.length > 0) {
        const relations = productIds.map(pid => ({
          opportunity_id: createdOpp.id,
          product_id: pid
        }));
        await supabase.from('opportunity_products').insert(relations);
      }

      return createdOpp;
    }

    const newOpp = {
      ...oppData,
      id: `opp_${Date.now()}`,
      status: oppData.status || 'published',
      offer_version: 1,
      applicationsCount: 0,
      matching_score: oppData.matching_score || 90,
      created_at: new Date().toISOString()
    };
    localOpportunitiesStore = [newOpp, ...localOpportunitiesStore];
    return newOpp;
  },

  update: async (id, oppData) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('opportunities')
        .update(oppData)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    }
    localOpportunitiesStore = localOpportunitiesStore.map(o => (o.id === id ? { ...o, ...oppData } : o));
    return localOpportunitiesStore.find(o => o.id === id);
  },

  bumpVersion: async (id, updatedConditions) => {
    const existing = await opportunitiesService.getById(id);
    if (!existing) throw new Error('Oportunidad no encontrada');

    const nextVersion = (existing.offer_version || 1) + 1;
    return opportunitiesService.update(id, {
      ...updatedConditions,
      offer_version: nextVersion,
      updated_at: new Date().toISOString()
    });
  },

  delete: async (id) => {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('opportunities').delete().eq('id', id);
      if (error) throw error;
      return true;
    }
    localOpportunitiesStore = localOpportunitiesStore.filter(o => o.id !== id);
    return true;
  }
};

export default opportunitiesService;
