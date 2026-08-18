import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Package, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/Button';
import { useCompanies } from '../../hooks/useCompanies';
import { SECTORS, REGIONS } from '../../utils/constants';
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
          <div key={company.id} className="company-card">
            <div className="company-card-header">
              <div className="company-icon-box">
                <Building2 size={24} />
              </div>
              <div className="company-header-meta">
                <h3 className="company-name">
                  <Link to={`/companies/${company.id}`}>{company.name}</Link>
                  {company.verified && <ShieldCheck size={16} className="verified-badge" title="Empresa Verificada" />}
                </h3>
                <span className="company-sector">{company.sector}</span>
              </div>
            </div>

            <p className="company-desc">{company.description}</p>

            <div className="company-card-stats">
              <div className="c-stat">
                <MapPin size={14} />
                <span>{company.region}</span>
              </div>
              <div className="c-stat">
                <Package size={14} />
                <span>{company.productsCount} Productos</span>
              </div>
              <div className="c-stat">
                <Users size={14} />
                <span>Busca {company.seekingAgents} Comerciales</span>
              </div>
            </div>

            <div className="company-card-footer">
              <span className="company-commission-note">{company.commission}</span>
              <Link to={`/companies/${company.id}`}>
                <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                  Ver Perfil
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
