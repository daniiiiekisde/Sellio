import React, { useState } from 'react';
import { User, Building2, Mail, Phone, MapPin, Save, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';
import Button from '../../components/Button';
import './Profile.css';

export const Profile = () => {
  const { user, userType } = useAuth();
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Carlos Méndez',
    email: user?.email || 'carlos.mendez@example.com',
    phone: '+34 612 345 678',
    location: 'Barcelona, España',
    bio: userType === USER_ROLES.COMPANY 
      ? 'Empresa especializada en fabricación y envasado de productos agroalimentarios de calidad.'
      : 'Especialista en desarrollo de negocio B2B y prospección en canal HORECA y retail.'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="profile-page container">
      <div className="profile-header">
        <h1 className="profile-title">Mi Perfil</h1>
        <p className="profile-subtitle">Gestiona tu información pública y datos de contacto.</p>
      </div>

      <div className="profile-card">
        {saved && (
          <div className="save-alert">
            <CheckCircle2 size={18} />
            <span>Perfil actualizado correctamente.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="profile-form">
          <div className="profile-avatar-row">
            <div className="profile-avatar">
              {userType === USER_ROLES.COMPANY ? <Building2 size={36} /> : <User size={36} />}
            </div>
            <div>
              <h3 className="profile-name-display">{formData.name}</h3>
              <span className="badge badge-primary">{userType === USER_ROLES.COMPANY ? 'Empresa' : 'Comercial'}</span>
            </div>
          </div>

          <div className="profile-form-grid">
            <div className="form-group">
              <label className="form-label">Nombre completo / Razón</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Teléfono de contacto</label>
              <input
                type="tel"
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Ubicación / Territorio</label>
              <input
                type="text"
                className="form-input"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Biografía / Presentación</label>
            <textarea
              className="form-textarea"
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          <div className="profile-actions">
            <Button type="submit" variant="primary" icon={Save}>
              Guardar Cambios
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
