import React, { useState } from 'react';
import { Send, Building2, MessageSquare } from 'lucide-react';
import { useMessages } from '../../../hooks/useMessages';
import { Button } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';
import './Messages.css';

export const SellerMessages = () => {
  const { conversations, activeConversation, setActiveConversation } = useMessages();
  const [inputText, setInputText] = useState('');
  const [messagesList, setMessagesList] = useState([
    { id: 1, sender: 'other', text: 'Hola Carlos, hemos revisado tu perfil y tu cartera en HORECA encaja con nuestra expansión.', time: '10:30' },
    { id: 2, sender: 'me', text: 'Hola Laura, me parece una excelente propuesta. ¿Qué margen y muestras iniciales facilitáis?', time: '10:35' },
    { id: 3, sender: 'other', text: 'Te enviamos hoy mismo el kit de cata premium y las fichas técnicas con el 15% de comisión fijado.', time: '10:45' }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessagesList(prev => [
      ...prev,
      { id: Date.now(), sender: 'me', text: inputText.trim(), time: 'Ahora' }
    ]);
    setInputText('');
  };

  return (
    <div className="seller-messages-page">
      <DashboardHeader
        title="Mensajes con Fabricantes"
        subtitle="Conversaciones directas y negociación de acuerdos con las empresas."
      />

      <div className="messages-layout-box">
        {/* Left conversations list */}
        <div className="conversations-sidebar">
          <div className="conversations-header">
            <h3 className="conversations-title">Empresas</h3>
          </div>
          <div className="conversations-list">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`conversation-item ${activeConversation?.id === conv.id ? 'active' : ''}`}
                onClick={() => setActiveConversation(conv)}
              >
                <div className="conv-avatar">
                  <Building2 size={18} />
                </div>
                <div className="conv-info">
                  <div className="conv-name-row">
                    <span className="conv-name">{conv.contactName}</span>
                    <span className="conv-time">{conv.timestamp}</span>
                  </div>
                  <p className="conv-last-msg">{conv.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right chat panel */}
        <div className="chat-window">
          {activeConversation ? (
            <>
              <div className="chat-header">
                <div className="chat-header-info">
                  <div className="conv-avatar">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <h4>{activeConversation.contactName}</h4>
                    <span className="chat-online-status">En línea &bull; Empresa Verificada</span>
                  </div>
                </div>
              </div>

              <div className="chat-messages-container">
                {messagesList.map((m) => (
                  <div key={m.id} className={`chat-bubble-row ${m.sender === 'me' ? 'bubble-me' : 'bubble-other'}`}>
                    <div className="chat-bubble">
                      <p>{m.text}</p>
                      <span className="bubble-time">{m.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSend} className="chat-input-bar">
                <input
                  type="text"
                  placeholder="Escribe tu mensaje a la empresa..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="chat-text-input"
                />
                <Button type="submit" variant="primary" size="md" icon={Send}>
                  Enviar
                </Button>
              </form>
            </>
          ) : (
            <div className="empty-chat-state">
              <MessageSquare size={48} />
              <p>Selecciona una conversación para chatear.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerMessages;
