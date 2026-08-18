import React, { useState } from 'react';
import { useCompanies } from '../../../hooks/useCompanies';
import { SECTORS, REGIONS } from '../../../utils/constants';
import { SearchBar } from '../../../components/common';
import { CompanyCard } from '../../../components/marketplace';
import './Companies.css';

export const Companies = () => {
  const { companies } = useCompanies();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');

  const filtered = companies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'ALL' || c.sector === selectedSector;
    const matchesRegion = selectedRegion === 'ALL' || c.region === selectedRegion;
    return matchesSearch && matchesSector && matchesRegion;
  });

  return (
    <div className="companies-page container">
      <div className="page-header">
        <h1 className="page-title">Directorio de Empresas y Fabricantes</h1>
        <p className="page-subtitle">Encuentra marcas líderes que buscan comerciales y representantes para sus productos.</p>
      </div>

      <div className="filters-container">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar empresas por nombre o actividad..."
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
            <label>Sede / Región:</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">Todas las regiones</option>
              {REGIONS.map((r, i) => <option key={i} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="companies-grid">
        {filtered.map(company => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default Companies;
