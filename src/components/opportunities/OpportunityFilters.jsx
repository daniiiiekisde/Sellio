import React from 'react';
import { Search, Filter, ShieldCheck, ArrowUpDown, Tag, MapPin, Sparkles, Flame, Heart, LayoutGrid, List, RotateCcw } from 'lucide-react';
import './opportunities.css';

export const OpportunityFilters = ({
  filters = {
    search: '',
    category: '',
    sector: '',
    region: '',
    minCommission: '',
    onlyVerified: false,
    onlyTopMatch: false,
    onlySaved: false,
    sortBy: 'relevant'
  },
  onChange,
  onReset,
  viewMode = 'grid',
  onViewModeChange = null,
  totalResults = 0,
  savedCount = 0
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
      {/* Top Search Bar & Sort & View Mode Switcher */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Buscar por producto, sector, empresa, territorio..."
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ArrowUpDown size={15} color="#64748b" />
          <select
            value={filters.sortBy}
            onChange={(e) => handleFieldChange('sortBy', e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #cbd5e1',
              fontSize: '0.825rem',
              background: '#fff'
            }}
          >
            <option value="relevant">🎯 Ordenar: Mayor Sellio Match</option>
            <option value="recent">⏱️ Más recientes</option>
            <option value="highest_commission">💰 Mayor comisión (%)</option>
            <option value="highest_earn">💶 Mayor ganancia por venta (€)</option>
            <option value="verified_first">🛡️ Empresas verificadas</option>
          </select>
        </div>

        {/* View Switcher */}
        {onViewModeChange && (
          <div style={{ display: 'flex', border: '1px solid #cbd5e1', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              style={{
                padding: '0.55rem 0.75rem',
                background: viewMode === 'grid' ? '#2563eb' : '#ffffff',
                color: viewMode === 'grid' ? '#ffffff' : '#64748b',
                border: 'none',
                cursor: 'pointer'
              }}
              title="Vista en Cuadrícula"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              style={{
                padding: '0.55rem 0.75rem',
                background: viewMode === 'list' ? '#2563eb' : '#ffffff',
                color: viewMode === 'list' ? '#ffffff' : '#64748b',
                border: 'none',
                cursor: 'pointer'
              }}
              title="Vista en Lista"
            >
              <List size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Quick Filter Tags / Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
        <button
          type="button"
          onClick={() => handleFieldChange('onlyTopMatch', !filters.onlyTopMatch)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.775rem',
            fontWeight: 700,
            border: filters.onlyTopMatch ? '1px solid #2563eb' : '1px solid #e2e8f0',
            background: filters.onlyTopMatch ? '#eff6ff' : '#f8fafc',
            color: filters.onlyTopMatch ? '#1d4ed8' : '#475569',
            cursor: 'pointer'
          }}
        >
          <Sparkles size={13} color={filters.onlyTopMatch ? '#1d4ed8' : '#94a3b8'} />
          <span>+90% Match con mi perfil</span>
        </button>

        <button
          type="button"
          onClick={() => handleFieldChange('minCommission', filters.minCommission === '15' ? '' : '15')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.775rem',
            fontWeight: 700,
            border: filters.minCommission === '15' ? '1px solid #ea580c' : '1px solid #e2e8f0',
            background: filters.minCommission === '15' ? '#fff7ed' : '#f8fafc',
            color: filters.minCommission === '15' ? '#c2410c' : '#475569',
            cursor: 'pointer'
          }}
        >
          <Flame size={13} color={filters.minCommission === '15' ? '#ea580c' : '#94a3b8'} />
          <span>Alta Comisión (≥ 15%)</span>
        </button>

        <button
          type="button"
          onClick={() => handleFieldChange('onlyVerified', !filters.onlyVerified)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.775rem',
            fontWeight: 700,
            border: filters.onlyVerified ? '1px solid #16a34a' : '1px solid #e2e8f0',
            background: filters.onlyVerified ? '#f0fdf4' : '#f8fafc',
            color: filters.onlyVerified ? '#15803d' : '#475569',
            cursor: 'pointer'
          }}
        >
          <ShieldCheck size={14} color={filters.onlyVerified ? '#16a34a' : '#94a3b8'} />
          <span>Empresas Verificadas</span>
        </button>

        <button
          type="button"
          onClick={() => handleFieldChange('onlySaved', !filters.onlySaved)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.775rem',
            fontWeight: 700,
            border: filters.onlySaved ? '1px solid #e11d48' : '1px solid #e2e8f0',
            background: filters.onlySaved ? '#fff1f2' : '#f8fafc',
            color: filters.onlySaved ? '#be123c' : '#475569',
            cursor: 'pointer'
          }}
        >
          <Heart size={13} color={filters.onlySaved ? '#e11d48' : '#94a3b8'} fill={filters.onlySaved ? '#e11d48' : 'none'} />
          <span>Guardadas ({savedCount})</span>
        </button>
      </div>

      {/* Selects Row: Category, Region, Min Commission */}
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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Mostrando <strong>{totalResults}</strong> oportunidades
          </span>

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.775rem',
                color: 'var(--text-secondary)',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={12} />
              <span>Limpiar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpportunityFilters;
