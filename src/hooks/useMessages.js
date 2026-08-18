import { useState, useEffect } from 'react';
import { messagesService } from '../services/messages';

export const useMessages = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeConversation, setActiveConversation] = useState(null);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const mockConversations = [
        {
          id: 'conv_1',
          contactName: 'Iberia Gourmet SL (Director Comercial)',
          lastMessage: 'Hola Carlos, nos gustaría revisar tu experiencia en el canal HORECA.',
          timestamp: '10:45',
          unreadCount: 1,
          avatar: null
        },
        {
          id: 'conv_2',
          contactName: 'SolarTech Solutions',
          lastMessage: 'Te enviamos las condiciones del acuerdo y el catálogo industrial.',
          timestamp: 'Ayer',
          unreadCount: 0,
          avatar: null
        }
      ];
      setConversations(mockConversations);
      if (mockConversations.length > 0) {
        setActiveConversation(mockConversations[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return {
    conversations,
    activeConversation,
    setActiveConversation,
    loading,
    refetch: fetchConversations
  };
};

export default useMessages;
