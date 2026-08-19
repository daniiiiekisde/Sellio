import { supabase, isSupabaseConfigured } from './supabaseClient';

const INITIAL_MOCK_NOTIFICATIONS = [
  {
    id: 'notif_1',
    user_id: 'usr_seller_1',
    type: 'sale_confirmed',
    title: '¡Nueva Venta Confirmada!',
    message: 'Iberia Gourmet SL ha confirmado tu venta de 10 uds. Comisión ganada: +180,00 €',
    read: false,
    created_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'notif_2',
    user_id: 'usr_seller_1',
    type: 'new_opportunity',
    title: 'Oportunidad Compatible (95% Match)',
    message: 'Nueva oportunidad en Cataluña de Alimentación y Bebidas con 15% de comisión.',
    read: false,
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'notif_3',
    user_id: 'usr_comp_1',
    type: 'new_request',
    title: 'Nuevo Comercial Interesado',
    message: 'Carlos Mendoza (Comercial #A482) ha mostrado interés en tu oportunidad de AOVE Gourmet.',
    read: true,
    created_at: new Date(Date.now() - 172800000).toISOString()
  }
];

let localNotifications = [...INITIAL_MOCK_NOTIFICATIONS];

export const notificationsService = {
  getAll: async (userId) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
    return localNotifications;
  },

  markAsRead: async (id) => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('notifications').update({ read: true }).eq('id', id);
    }
    localNotifications = localNotifications.map(n => n.id === id ? { ...n, read: true } : n);
    return true;
  },

  create: async (notification) => {
    const newNotif = {
      ...notification,
      id: `notif_${Date.now()}`,
      read: false,
      created_at: new Date().toISOString()
    };
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('notifications').insert([newNotif]);
    }
    localNotifications = [newNotif, ...localNotifications];
    return newNotif;
  }
};

export default notificationsService;
