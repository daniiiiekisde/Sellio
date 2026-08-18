import React from 'react';
import Settings from '../../Settings';

export const AdminSettings = () => {
  return (
    <div className="admin-settings-view">
      <div className="dash-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="dash-title">Ajustes Globales de Plataforma</h1>
          <p className="dash-subtitle">Configuración del sistema, límites de publicación y pasarela.</p>
        </div>
      </div>
      <Settings />
    </div>
  );
};

export default AdminSettings;
