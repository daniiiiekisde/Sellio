import React, { useState } from 'react';
import { useSellers } from '../../../hooks/useSellers';
import { SECTORS, REGIONS } from '../../../utils/constants';
import { SearchBar } from '../../../components/common';
import { SellerCard } from '../../../components/marketplace';
import './Sellers.css';

export const Sellers = () => {
  const { sellers, loading, error } = useSellers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');

  const filtered = (sellers || []).filter(s => {
    const nameStr = (s.name || s.alias || s.anonymousId || '').toLowerCase();
    const headlineStr = (s.headline || '').toLowerCase();
    const bioStr = (s.bio || '').toLowerCase();
    const query = searchTerm.toLowerCase();
    const matchesSearch = nameStr.includes(query) || headlineStr.includes(query) || bioStr.includes(query);
    const matchesSector = selectedSector === 'ALL' || s.sector === selectedSector;
    const matchesRegion = selectedRegion === 'ALL' || (s.region && s.region.includes(selectedRegion));
    return matchesSearch && matchesSector && matchesRegion;
  });

  return (
    <div className="sellers-page container">
      <div className="page-header">
        <h1 className="page-title">Directorio de Comerciales y Agentes</h1>
        <p className="page-subtitle">Profesionales de venta independientes con carteras de clientes activas listos para representar tus marcas.</p>
      </div>

      <div className="filters-container">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar comerciales por sector, zona o especialidad..."
          size="lg"
        />

        <div className="filters-row">
          <div className="filter-select-group">
            <label>Sector:</label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">Todos los sectores</option>
              {SECTORS.map((s, i) => <option key={i} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="filter-select-group">
            <label>Zona de Influencia:</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">Todas las zonas</option>
              {REGIONS.map((r, i) => <option key={i} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="sellers-grid">
        {filtered.map(seller => (
          <SellerCard key={seller.id} seller={seller} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
          <p>No se encontraron comerciales con los filtros seleccionados.</p>
        </div>
      )}
    </div>
  );
};

export default Sellers;
