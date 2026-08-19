import React from 'react';
import { Search, Filter, SlidersHorizontal, ShieldCheck, ArrowUpDown, Tag, MapPin, Briefcase } from 'lucide-react';
import './opportunities.css';

export const OpportunityFilters = ({
  filters = {
    search: '',
    category: '',
    sector: '',
    region: '',
    minCommission: '',
    onlyVerified: false,
    sortBy: 'relevant'
  },
  onChange,
  onReset
}) => {
  const handleFieldChange = (field, value) => {
    if (onChange) {
      onChange({
        ...filters,
        [field]: value
      });
    }
  };

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid var(--border-card)',
      borderRadius: 'var(--radius-xl)',
      padding: '1.25rem',
      boxShadow: 'var(--shadow-sm)',
      marginBottom: '1.5rem'
    }}>
      {/* Top Search Bar & Sort */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Buscar por producto, sector, empresa o requisitos..."
            value={filters.search}
            onChange={(e) => handleFieldChange('search', e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 1rem 0.65rem 2.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #cbd5e1',
              fontSize: '0.9rem'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowUpDown size={16} color="#64748b" />
          <select
            value={filters.sortBy}
            onChange={(e) => handleFieldChange('sortBy', e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #cbd5e1',
              fontSize: '0.85rem',
              background: '#fff'
            }}
          >
            <option value="relevant">Más relevantes</option>
            <option value="recent">Más recientes</option>
            <option value="highest_commission">Mayor comisión (%)</option>
            <option value="highest_earn">Mayor ganancia / venta (€)</option>
            <option value="verified_first">Empresas verificadas</option>
          </select>
        </div>
      </div>

      {/* Filter Row: Category, Sector, Region, Min Commission */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', alignItems: 'center' }}>
        <div>
          <select
            value={filters.category}
            onChange={(e) => handleFieldChange('category', e.target.value)}
            style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1', fontSize: '0.825rem' }}
          >
            <option value="">Todas las Categorías</option>
            <option value="Alimentación y Bebidas">Alimentación y Bebidas</option>
            <option value="Tecnología y Software">Tecnología y Software</option>
            <option value="Industrial y Maquinaria">Industrial y Maquinaria</option>
            <option value="Salud y Cosmética">Salud y Cosmética</option>
            <option value="Construcción e Inmobiliaria">Construcción e Inmobiliaria</option>
            <option value="Servicios B2B">Servicios B2B</option>
          </select>
        </div>

        <div>
          <select
            value={filters.region}
            onChange={(e) => handleFieldChange('region', e.target.value)}
            style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1', fontSize: '0.825rem' }}
          >
            <option value="">Todas las Zonas</option>
            <option value="España (Nacional)">España (Nacional)</option>
            <option value="Madrid">Madrid</option>
            <option value="Cataluña">Cataluña</option>
            <option value="Andalucía">Andalucía</option>
            <option value="Comunidad Valenciana">Comunidad Valenciana</option>
            <option value="País Vasco">País Vasco</option>
            <option value="Internacional">Internacional / Exportación</option>
          </select>
        </div>

        <div>
          <select
            value={filters.minCommission}
            onChange={(e) => handleFieldChange('minCommission', e.target.value)}
            style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1', fontSize: '0.825rem' }}
          >
            <option value="">Cualquier Comisión</option>
            <option value="10">Mínimo 10%</option>
            <option value="15">Mínimo 15%</option>
            <option value="20">Mínimo 20%</option>
            <option value="30">Mínimo 30%</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.825rem', cursor: 'pointer', userSelect: 'none' }}>
            <input
              type="checkbox"
              checked={filters.onlyVerified}
              onChange={(e) => handleFieldChange('onlyVerified', e.target.checked)}
              style={{ accentColor: 'var(--primary)' }}
            />
            <ShieldCheck size={15} color="#059669" />
            <span>Solo Verificadas</span>
          </label>

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              style={{
                marginLeft: 'auto',
                fontSize: '0.775rem',
                color: 'var(--text-muted)',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpportunityFilters;
