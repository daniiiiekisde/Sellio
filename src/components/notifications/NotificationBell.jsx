import React, { useState, useEffect } from 'react';
import { Bell, Check, Sparkles, ShoppingCart, MessageSquare, ShieldCheck, Layers } from 'lucide-react';
import { notificationsService } from '../../services/notifications';

export const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchNotifs = async () => {
      const list = await notificationsService.getAll();
      setNotifications(list);
    };
    fetchNotifs();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = async (id, e) => {
    e.stopPropagation();
    await notificationsService.markAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          position: 'relative',
          padding: '0.5rem',
          borderRadius: '50%',
          background: open ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
          color: open ? 'var(--primary)' : 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: '#ef4444',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: '120%',
          right: 0,
          width: '320px',
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-card)',
          boxShadow: 'var(--shadow-xl)',
          padding: '1rem',
          zIndex: 100
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
            <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800 }}>Notificaciones</h4>
            <span className="badge badge-secondary" style={{ fontSize: '10px' }}>
              {unreadCount} nuevas
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                No tienes notificaciones pendientes.
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  style={{
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-md)',
                    background: n.read ? '#ffffff' : '#f0f9ff',
                    border: '1px solid',
                    borderColor: n.read ? '#f1f5f9' : '#bae6fd',
                    fontSize: '0.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.825rem' }}>{n.title}</strong>
                    {!n.read && (
                      <button
                        type="button"
                        onClick={(e) => handleMarkAsRead(n.id, e)}
                        style={{ color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <Check size={14} />
                      </button>
                    )}
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.775rem' }}>
                    {n.message}
                  </p>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
