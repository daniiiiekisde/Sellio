import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, CheckCircle2, Award, Briefcase } from 'lucide-react';
import { Button } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';
import { SECTORS, REGIONS } from '../../../utils/constants';

export const SellerProfile = () => {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Carlos Méndez',
    email: 'carlos.mendez@example.com',
    phone: '+34 612 345 678',
    region: 'Cataluña',
    sector: SECTORS[0],
    experience: '12 años',
    headline: 'Agente Comercial Senior HORECA & Alimentación Gourmet',
    bio: 'Cartera consolidada de más de 80 restaurantes y grupos gastronómicos en Barcelona y Girona. Enfoque en productos premium con valor diferencial.'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="seller-profile-page" style={{ maxWidth: '800px' }}>
      <DashboardHeader
        title="Perfil de Comercial"
        subtitle="Información pública y cartera visible para fabricantes en la plataforma."
      />

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        {saved && (
          <div className="save-alert" style={{ marginBottom: '1rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <CheckCircle2 size={16} /> Perfil actualizado correctamente.
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Nombre y Apellidos</label>
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
          </div>

          <div className="form-group">
            <label className="form-label">Titular Profesional / Especialidad</label>
            <input
              type="text"
              className="form-input"
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Sector de Especialización</label>
              <select
                className="form-select"
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              >
                {SECTORS.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Zona Principal de Cobertura</label>
              <select
                className="form-select"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              >
                {REGIONS.map((r, i) => <option key={i} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Experiencia y Cartera de Clientes</label>
            <textarea
              className="form-textarea"
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary" type="submit" icon={Save}>
              Guardar Cambios
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerProfile;
