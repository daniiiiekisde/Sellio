import React from 'react';
import { Bell, Lock, Shield, Eye } from 'lucide-react';
import { Button } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';

export const AdminSettings = () => {
  return (
    <div className="admin-settings-view">
      <DashboardHeader
        title="Ajustes Globales de Plataforma"
        subtitle="Configuración del sistema, límites de publicación y pasarela."
      />

      <div className="settings-sections-stack" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="dash-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Bell size={20} color="#818cf8" />
            <h3>Notificaciones y Alertas del Sistema</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#cbd5e1' }}>
              <input type="checkbox" defaultChecked />
              <span>Avisos de registro de nuevas empresas</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#cbd5e1' }}>
              <input type="checkbox" defaultChecked />
              <span>Avisos de validación de perfiles de comerciales</span>
            </label>
          </div>
        </div>

        <div className="dash-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Lock size={20} color="#818cf8" />
            <h3>Seguridad Global y Moderación</h3>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button variant="outline" size="sm">Registros de Auditoría</Button>
            <Button variant="outline" size="sm">Reglas de Matching IA</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
