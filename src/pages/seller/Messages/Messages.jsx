import React, { useState } from 'react';
import { Send, Building2, MessageSquare, ShieldCheck } from 'lucide-react';
import { useMessages } from '../../../hooks/useMessages';
import { Button } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';
import './Messages.css';

export const SellerMessages = () => {
  const { conversations, activeConversation, setActiveConversation, messages, sendMessage, loading } = useMessages();
  const [inputText, setInputText] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const textToSend = inputText.trim();
    setInputText('');
    await sendMessage(textToSend, 'seller');
  };

  return (
    <div className="seller-messages-page">
      <DashboardHeader
        title="Mensajes con Fabricantes"
        subtitle="Canal directo y protegido para coordinar condiciones comerciales con las empresas."
      />

      <div className="messages-layout-box">
        {/* Left conversations list */}
        <div className="conversations-sidebar">
          <div className="conversations-header">
            <h3 className="conversations-title">Empresas</h3>
          </div>
          <div className="conversations-list">
            {conversations.length === 0 ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                No tienes conversaciones activas. Las conversaciones se inician cuando una empresa acepta tu postulación.
              </div>
            ) : (
              conversations.map((conv) => (
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
              ))
            )}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      <ShieldCheck size={14} color="#10b981" />
                      <span>{activeConversation.opportunityTitle || 'Canal comercial activo'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="chat-messages-container">
                {messages.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    Inicia la conversación con esta empresa.
                  </div>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className={`chat-bubble-row ${m.sender === 'seller' || m.sender === 'me' ? 'bubble-me' : 'bubble-other'}`}
                    >
                      <div className="chat-bubble">
                        <p>{m.text || m.content}</p>
                        <span className="bubble-time">{m.time || 'Ahora'}</span>
                      </div>
                    </div>
                  ))
                )}
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
