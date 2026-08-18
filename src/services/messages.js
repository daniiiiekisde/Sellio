import api from './api';

export const messagesService = {
  getConversations: async () => {
    return api.get('/messages/conversations');
  },

  getMessagesByConversation: async (conversationId) => {
    return api.get(`/messages/${conversationId}`);
  },

  sendMessage: async (conversationId, content) => {
    return api.post(`/messages/${conversationId}`, { content });
  }
};
