import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, CheckCircle2, ShieldCheck, Lock, Globe, Target, Briefcase } from 'lucide-react';
import { Button } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';
import { SECTORS, REGIONS } from '../../../utils/constants';

export const SellerProfile = () => {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    // Private / Internal data
    legalName: 'Carlos Méndez García',
    email: 'carlos.mendez@example.com',
    phone: '+34 612 345 678',
    taxId: '47891234B',
    
    // Privacy settings
    isAnonymous: true,
    anonymousId: 'COMERCIAL #A482',
    
    // Public Professional credentials
    headline: 'Agente Comercial Senior HORECA & Alimentación Gourmet',
    sector: SECTORS[0],
    region: 'Cataluña',
    experienceYears: 12,
    languages: 'Español, Catalán, Inglés',
    clientType: 'Restaurantes con estrella / gastronómicos, Cadenas hoteleras, Tiendas Delicatessen',
    bio: 'Cartera consolidada de más de 80 restaurantes y grupos gastronómicos en Barcelona y Girona. Enfoque en productos premium con valor diferencial y alta rotación.',
    verified: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="seller-profile-page" style={{ maxWidth: '850px' }}>
      <DashboardHeader
        title="Perfil Profesional y Privacidad"
        subtitle="Configura tu identidad comercial protegida y las capacidades que verán los fabricantes."
      />

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        {saved && (
          <div className="save-alert" style={{ marginBottom: '1.25rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <CheckCircle2 size={18} /> Configuración y perfil guardados correctamente.
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Privacy Level Card */}
          <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8' }}>
                  <Lock size={20} />
                </div>
                <div>
                  <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600 }}>Modo Privacidad de Sellio</h4>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                    Identificador público asignado: <strong style={{ color: '#38bdf8' }}>{formData.anonymousId}</strong>
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#e2e8f0', fontSize: '0.875rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.isAnonymous}
                    onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#6366f1' }}
                  />
                  <span>Mantener perfil anónimo en Marketplace</span>
                </label>
              </div>
            </div>

            <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#cbd5e1', lineHeight: '1.45', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
              🔒 <strong>Garantía de Privacidad Sellio:</strong> Las empresas solo verán tu código ({formData.anonymousId}), tus sectores, zonas y experiencia. Tu nombre legal, teléfono y email se mantendrán protegidos hasta que alcances un acuerdo comercial mutuo.
            </div>
          </div>

          {/* Public Professional Data */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase size={18} color="#38bdf8" /> Capacidades Comerciales Públicas
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Información visible para las empresas para evaluar afinidad comercial.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Titular Comercial / Especialidad</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  placeholder="Ej. Agente Comercial Senior HORECA & Gourmet"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Sector Principal</label>
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

                <div className="form-group">
                  <label className="form-label">Años de Experiencia Comercial</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Idiomas de Negociación</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  placeholder="Ej. Español, Catalán, Inglés"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tipo de Clientes / Canales que atiendes</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.clientType}
                  onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                  placeholder="Ej. Restaurantes gastronómicos, Cadenas hoteleras, Tiendas Delicatessen"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Descripción de Trayectoria y Cartera</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Describe tus fortalezas de venta, tipo de productos que mejor comercializas y alcance en tu territorio..."
                />
              </div>
            </div>
          </div>

          {/* Internal Private Data */}
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} color="#10b981" /> Datos Privados de Facturación y Verificación (Confidenciales)
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Sellio protege estos datos. Nunca se muestran públicamente en el marketplace.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Nombre Legal Completo</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.legalName}
                  onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">NIF / CIF / Documento</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.taxId}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Correo Electrónico Privado</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Teléfono de Contacto Privado</label>
                <input
                  type="tel"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <Button variant="primary" type="submit" icon={Save} size="lg">
              Guardar Configuración
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerProfile;
