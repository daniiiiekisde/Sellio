import { useState, useEffect, useCallback } from 'react';
import { messagesService } from '../services/messages';

export const useMessages = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchConversations = useCallback(async () => {
    setLoading(true);
    try {
      const data = await messagesService.getConversations();
      setConversations(data || []);
      if (data && data.length > 0 && !activeConversation) {
        setActiveConversation(data[0]);
      }
    } catch (err) {
      console.error('Error fetching conversations:', err);
    } finally {
      setLoading(false);
    }
  }, [activeConversation]);

  const loadMessages = useCallback(async (convId) => {
    if (!convId) return;
    const msgs = await messagesService.getMessagesByConversation(convId);
    setMessages(msgs || []);
  }, []);

  useEffect(() => {
    fetchConversations();

    const handleUpdate = () => {
      fetchConversations();
      if (activeConversation?.id) {
        loadMessages(activeConversation.id);
      }
    };

    window.addEventListener('sellio_messages_updated', handleUpdate);
    return () => window.removeEventListener('sellio_messages_updated', handleUpdate);
  }, [fetchConversations, activeConversation, loadMessages]);

  useEffect(() => {
    if (activeConversation?.id) {
      loadMessages(activeConversation.id);
    }
  }, [activeConversation, loadMessages]);

  const sendMessage = async (text, sender = 'seller') => {
    if (!activeConversation?.id || !text.trim()) return;
    const newMsg = await messagesService.sendMessage(activeConversation.id, text, sender);
    setMessages(prev => [...prev, newMsg]);
    return newMsg;
  };

  return {
    conversations,
    activeConversation,
    setActiveConversation,
    messages,
    sendMessage,
    loading,
    refetch: fetchConversations
  };
};

export default useMessages;
