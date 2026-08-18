import { supabase, isSupabaseConfigured } from './supabaseClient';

const INITIAL_MOCK_PRODUCTS = [
  {
    id: 'prod_1',
    company_id: 'usr_comp_1',
    companyName: 'Iberia Gourmet SL',
    name: 'Aceite de Oliva Virgen Extra Ecológico D.O. 500ml',
    slug: 'aceite-oliva-virgen-extra-eco-500ml',
    category: 'Alimentación y Gourmet',
    description: 'AOVE de cosecha temprana extracción en frío, botella de vidrio oscuro premium 500ml. Certificación ecológica europea.',
    targetPrice: '14,50 € / unidad',
    suggestedCommission: '15% recurrente',
    status: 'published',
    is_real_product_confirmed: true,
    available_for_sales: true,
    image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'prod_2',
    company_id: 'usr_comp_2',
    companyName: 'SolarTech Solutions',
    name: 'Placas Solares Monocristalinas de Alta Eficiencia 550W',
    slug: 'placas-solares-monocristalinas-550w',
    category: 'Energía y Sostenibilidad',
    description: 'Módulos fotovoltaicos de última generación con tecnología Tier 1 para instalaciones residenciales e industriales.',
    targetPrice: '180,00 € / panel',
    suggestedCommission: '10% por contrato',
    status: 'published',
    is_real_product_confirmed: true,
    available_for_sales: true,
    image_url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'prod_3',
    company_id: 'usr_comp_3',
    companyName: 'NovaPharma Care',
    name: 'Sérum Rejuvenecedor con Ácido Hialurónico Puro',
    slug: 'serum-rejuvenecedor-acido-hialuronico',
    category: 'Salud y Farmacia',
    description: 'Tratamiento facial intensivo de grado farmacéutico para distribución exclusiva en farmacias y centros estéticos.',
    targetPrice: '28,00 € / unidad',
    suggestedCommission: '22% recurrente',
    status: 'published',
    is_real_product_confirmed: true,
    available_for_sales: true,
    image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60'
  }
];

let localProductsStore = [...INITIAL_MOCK_PRODUCTS];

export const productsService = {
  getAll: async (filters = {}) => {
    if (isSupabaseConfigured() && supabase) {
      let query = supabase.from('products').select('*, company_profiles(company_name, trade_name, verification_status)');
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

    let filtered = [...localProductsStore];
    if (filters.company_id) {
      filtered = filtered.filter(p => p.company_id === filters.company_id);
    }
    if (filters.status) {
      filtered = filtered.filter(p => p.status === filters.status);
    }
    return filtered;
  },

  getById: async (id) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('products')
        .select('*, company_profiles(*)')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    }
    return localProductsStore.find(p => p.id === id) || null;
  },

  create: async (productData) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('products').insert([productData]).select().single();
      if (error) throw error;
      return data;
    }
    const newProduct = {
      ...productData,
      id: `prod_${Date.now()}`,
      status: productData.status || 'published',
      is_real_product_confirmed: true,
      available_for_sales: true,
      created_at: new Date().toISOString()
    };
    localProductsStore = [newProduct, ...localProductsStore];
    return newProduct;
  },

  update: async (id, productData) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('products').update(productData).eq('id', id).select().single();
      if (error) throw error;
      return data;
    }
    localProductsStore = localProductsStore.map(p => (p.id === id ? { ...p, ...productData } : p));
    return localProductsStore.find(p => p.id === id);
  },

  delete: async (id) => {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      return true;
    }
    localProductsStore = localProductsStore.filter(p => p.id !== id);
    return true;
  }
};

export default productsService;
