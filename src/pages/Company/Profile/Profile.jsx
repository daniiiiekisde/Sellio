import React, { useState } from 'react';
import { Building2, Save, CheckCircle2 } from 'lucide-react';
import Button from '../../../components/Button';
import { SECTORS, REGIONS } from '../../../utils/constants';

export const CompanyProfile = () => {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: 'Iberia Gourmet SL',
    cif: 'B-12345678',
    sector: SECTORS[0],
    region: REGIONS[0],
    website: 'https://iberiagourmet.example.com',
    description: 'Empresa familiar con más de 30 años de tradición en la elaboración de aceites y conservas artesanales de alta calidad.'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="company-profile-page" style={{ maxWidth: '800px' }}>
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Perfil de Empresa</h1>
          <p className="dash-subtitle">Información corporativa visible para los comerciales en la plataforma.</p>
        </div>
      </div>

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        {saved && (
          <div className="save-alert" style={{ marginBottom: '1rem' }}>
            <CheckCircle2 size={16} /> Perfil empresarial guardado correctamente.
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Razón Social / Nombre Comercial</label>
              <input
                type="text"
                className="form-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">NIF / CIF</label>
              <input
                type="text"
                className="form-input"
                value={form.cif}
                onChange={(e) => setForm({ ...form, cif: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Sector Principal</label>
              <select
                className="form-select"
                value={form.sector}
                onChange={(e) => setForm({ ...form, sector: e.target.value })}
              >
                {SECTORS.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Sede Central</label>
              <select
                className="form-select"
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
              >
                {REGIONS.map((r, i) => <option key={i} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Sitio Web Corporativo</label>
            <input
              type="url"
              className="form-input"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descripción de la Empresa</label>
            <textarea
              className="form-textarea"
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
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

export default CompanyProfile;
