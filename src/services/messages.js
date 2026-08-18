import { supabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEY = 'sellio_conversations';
const MSG_STORAGE_KEY = 'sellio_chat_messages';

const INITIAL_CONVERSATIONS = [
  {
    id: 'conv_1',
    contactName: 'Iberia Gourmet SL (Dirección Comercial)',
    contactRole: 'Empresa',
    opportunityTitle: 'Expansión de Canal HORECA y Tiendas Gourmet en Cataluña',
    lastMessage: 'Hola, hemos revisado tu solicitud. Nos encaja tu perfil para la zona de Cataluña. ¿Cuándo podríamos tener una llamada?',
    timestamp: '10:45',
    unreadCount: 1,
    identityRevealed: true,
    avatar: null
  },
  {
    id: 'conv_2',
    contactName: 'SolarTech Solutions',
    contactRole: 'Empresa',
    opportunityTitle: 'Representante Técnico Comercial Fotovoltaico',
    lastMessage: 'Te hemos enviado el dossier técnico y las condiciones de comisión por potencia contratada.',
    timestamp: 'Ayer',
    unreadCount: 0,
    identityRevealed: false,
    avatar: null
  }
];

const INITIAL_MESSAGES = {
  conv_1: [
    {
      id: 'm_1',
      sender: 'seller',
      text: 'Hola, dispongo de cartera activa en el canal HORECA gourmet en Barcelona y Girona. Me interesa conocer las condiciones completas del acuerdo.',
      time: '10:30'
    },
    {
      id: 'm_2',
      sender: 'company',
      text: 'Hola, hemos revisado tu solicitud. Nos encaja tu perfil para la zona de Cataluña. ¿Cuándo podríamos tener una llamada?',
      time: '10:45'
    }
  ],
  conv_2: [
    {
      id: 'm_3',
      sender: 'company',
      text: 'Te hemos enviado el dossier técnico y las condiciones de comisión por potencia contratada.',
      time: 'Ayer 18:20'
    }
  ]
};

export const getStoredConversations = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CONVERSATIONS));
      return INITIAL_CONVERSATIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_CONVERSATIONS;
  }
};

export const getStoredMessages = () => {
  try {
    const raw = localStorage.getItem(MSG_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(MSG_STORAGE_KEY, JSON.stringify(INITIAL_MESSAGES));
      return INITIAL_MESSAGES;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_MESSAGES;
  }
};

export const messagesService = {
  getConversations: async () => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('conversations').select('*');
      if (!error && data && data.length > 0) return data;
    }
    return getStoredConversations();
  },

  getMessagesByConversation: async (conversationId) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      if (!error && data) return data;
    }
    const all = getStoredMessages();
    return all[conversationId] || [];
  },

  sendMessage: async (conversationId, text, sender = 'seller') => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('messages')
          .insert([{ conversation_id: conversationId, content: text }])
          .select()
          .single();
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase message insert error:', err);
      }
    }

    const all = getStoredMessages();
    const currentList = all[conversationId] || [];
    const newMsg = {
      id: `msg_${Date.now()}`,
      sender,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    all[conversationId] = [...currentList, newMsg];
    localStorage.setItem(MSG_STORAGE_KEY, JSON.stringify(all));

    // Actualizar último mensaje en la conversación
    const convs = getStoredConversations();
    const updatedConvs = convs.map(c => 
      c.id === conversationId 
        ? { ...c, lastMessage: text, timestamp: newMsg.time } 
        : c
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConvs));
    window.dispatchEvent(new Event('sellio_messages_updated'));

    return newMsg;
  },

  createConversationFromRequest: (request) => {
    const convs = getStoredConversations();
    const convId = `conv_${request.id || Date.now()}`;
    const exists = convs.find(c => c.id === convId);
    if (exists) return exists;

    const newConv = {
      id: convId,
      contactName: request.companyName || 'Empresa Colaboradora',
      contactRole: 'Empresa',
      opportunityTitle: request.opportunityTitle || 'Oportunidad Aceptada',
      lastMessage: '¡Solicitud aceptada! Podéis comenzar a coordinar las condiciones comerciales aquí.',
      timestamp: 'Ahora',
      unreadCount: 1,
      identityRevealed: Boolean(request.shareFullContact),
      avatar: null
    };

    const updatedConvs = [newConv, ...convs];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConvs));

    const allMsgs = getStoredMessages();
    allMsgs[convId] = [
      {
        id: `msg_init_${Date.now()}`,
        sender: 'company',
        text: `Hola ${request.sellerAnonymousId || 'Comercial'}, hemos aceptado tu solicitud de interés en "${request.opportunityTitle}". ¡Hablemos de los detalles!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    localStorage.setItem(MSG_STORAGE_KEY, JSON.stringify(allMsgs));
    window.dispatchEvent(new Event('sellio_messages_updated'));

    return newConv;
  }
};

export default messagesService;
