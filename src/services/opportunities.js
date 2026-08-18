import { supabase, isSupabaseConfigured } from './supabaseClient';

const INITIAL_MOCK_OPPORTUNITIES = [
  {
    id: 'opp_1',
    company_id: 'usr_comp_1',
    company: 'Iberia Gourmet SL',
    title: 'Expansión de Canal HORECA y Tiendas Gourmet en Cataluña',
    sector: 'Alimentación y Bebidas (HORECA)',
    targetTerritory: 'Cataluña / Baleares',
    commissionRate: '15% sobre ventas netas',
    requirements: 'Cartera activa de restaurantes, hoteles o canal retail gourmet',
    status: 'published',
    productIds: ['prod_1'],
    products: [
      { id: 'prod_1', name: 'Aceite de Oliva Virgen Extra Ecológico D.O. 500ml' }
    ],
    description: 'Buscamos agente comercial colegiado o empresa de representación con experiencia demostrable para introducir nuestro AOVE de alta gama en restaurantes con estrella y tiendas gourmet de Barcelona y Girona.',
    matchScore: 95,
    applicationsCount: 4,
    created_at: new Date().toISOString()
  },
  {
    id: 'opp_2',
    company_id: 'usr_comp_2',
    company: 'SolarTech Solutions',
    title: 'Representante Técnico Comercial para Soluciones Fotovoltaicas Industriales',
    sector: 'Energías Renovables',
    targetTerritory: 'Zona Centro / Levante',
    commissionRate: '10% por proyecto cerrado (Media 3.500€/operación)',
    requirements: 'Conexión con naves industriales, pymes y sector agropecuario',
    status: 'published',
    productIds: ['prod_2'],
    products: [
      { id: 'prod_2', name: 'Placas Solares Monocristalinas de Alta Eficiencia 550W' }
    ],
    description: 'Seleccionamos profesionales independientes para captar proyectos de autoconsumo industrial de 20kW a 200kW con respaldo de ingeniería propia y financiación directa.',
    matchScore: 89,
    applicationsCount: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'opp_3',
    company_id: 'usr_comp_3',
    company: 'NovaPharma Care',
    title: 'Distribución Exclusiva en Farmacias y Clínicas de Medicina Estética',
    sector: 'Salud y Farmacia',
    targetTerritory: 'Comunidad de Madrid',
    commissionRate: '22% recurrente sobre reposiciones',
    requirements: 'Acceso directo a titulares de oficina de farmacia o dermatólogos',
    status: 'published',
    productIds: ['prod_3'],
    products: [
      { id: 'prod_3', name: 'Sérum Rejuvenecedor con Ácido Hialurónico Puro' }
    ],
    description: 'Lanzamiento de línea dermocosmética con soporte publicitario, muestras gratuitas para captación y comisiones garantizadas sobre pedidos iniciales y reposición periódica.',
    matchScore: 82,
    applicationsCount: 2,
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
        query = query.eq('target_territory', filters.region);
      }
      if (filters.company_id) {
        query = query.eq('company_id', filters.company_id);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }

    let filtered = [...localOpportunitiesStore];
    if (filters.sector && filters.sector !== 'Todos') {
      filtered = filtered.filter(o => o.sector === filters.sector);
    }
    if (filters.region && filters.region !== 'Todas') {
      filtered = filtered.filter(o => o.targetTerritory === filters.region);
    }
    if (filters.company_id) {
      filtered = filtered.filter(o => o.company_id === filters.company_id);
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
        .insert([mainData])
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
      applicationsCount: 0,
      matchScore: 90,
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
