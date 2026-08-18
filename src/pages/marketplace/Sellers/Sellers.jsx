import React, { useState } from 'react';
import { useSellers } from '../../../hooks/useSellers';
import { SECTORS, REGIONS } from '../../../utils/constants';
import { SearchBar } from '../../../components/common';
import { SellerCard } from '../../../components/marketplace';
import './Sellers.css';

export const Sellers = () => {
  const { sellers } = useSellers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');

  const filtered = sellers.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'ALL' || s.sector === selectedSector;
    const matchesRegion = selectedRegion === 'ALL' || s.region.includes(selectedRegion);
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
          placeholder="Buscar comerciales por sector o nombre..."
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
    </div>
  );
};

export default Sellers;
