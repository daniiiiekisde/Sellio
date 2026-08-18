import React from 'react';
import { Bell, Lock, Shield, Eye } from 'lucide-react';
import Button from '../../components/Button';
import './Settings.css';

export const Settings = () => {
  return (
    <div className="settings-page container">
      <div className="settings-header">
        <h1 className="settings-title">Configuración de la Cuenta</h1>
        <p className="settings-subtitle">Preferencias de notificaciones, seguridad y privacidad.</p>
      </div>

      <div className="settings-sections-stack">
        <div className="settings-box">
          <div className="settings-box-header">
            <Bell size={20} />
            <h3>Notificaciones y Avisos</h3>
          </div>
          <div className="settings-toggles-list">
            <label className="toggle-label">
              <input type="checkbox" defaultChecked />
              <div>
                <strong>Avisos de nuevas oportunidades o solicitudes</strong>
                <p>Recibe alertas en tiempo real cuando una empresa o comercial muestre interés.</p>
              </div>
            </label>
            <label className="toggle-label">
              <input type="checkbox" defaultChecked />
              <div>
                <strong>Notificaciones de nuevos mensajes</strong>
                <p>Aviso por email cuando recibas un mensaje en la bandeja de entrada.</p>
              </div>
            </label>
          </div>
        </div>

        <div className="settings-box">
          <div className="settings-box-header">
            <Lock size={20} />
            <h3>Seguridad y Credenciales</h3>
          </div>
          <div className="settings-actions-group">
            <Button variant="outline" size="sm">Cambiar contraseña</Button>
            <Button variant="outline" size="sm">Verificación en dos pasos (2FA)</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
