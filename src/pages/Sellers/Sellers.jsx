import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Briefcase, Award, ArrowRight, ShieldCheck } from 'lucide-react';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/Button';
import { SECTORS, REGIONS } from '../../utils/constants';
import './Sellers.css';

export const Sellers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');

  const mockSellers = [
    {
      id: 'sell_1',
      name: 'Carlos Méndez',
      headline: 'Agente Comercial Senior HORECA & Alimentación Gourmet',
      sector: 'Alimentación y Bebidas (HORECA)',
      region: 'Cataluña',
      experience: '12 años de experiencia',
      verified: true,
      bio: 'Cartera consolidada de más de 80 restaurantes estrella y grupos de restauración en Barcelona y Girona. Enfoque en productos gourmet con valor añadido.'
    },
    {
      id: 'sell_2',
      name: 'Marta Soler',
      headline: 'Especialista en Venta Industrial & Renovables',
      sector: 'Energías Renovables',
      region: 'Comunidad de Madrid',
      experience: '8 años de experiencia',
      verified: true,
      bio: 'Representación comercial para empresas de ingeniería, placas solares y climatización eficiente en zona centro.'
    },
    {
      id: 'sell_3',
      name: 'Javier Navarro',
      headline: 'Delegado Comercial Farmacéutico & Dermocosmética',
      sector: 'Salud y Farmacia',
      region: 'Comunidad Valenciana',
      experience: '15 años de experiencia',
      verified: false,
      bio: 'Relación directa con más de 120 farmacias y clínicas en Valencia, Alicante y Castellón.'
    }
  ];

  const filtered = mockSellers.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'ALL' || s.sector === selectedSector;
    const matchesRegion = selectedRegion === 'ALL' || s.region === selectedRegion;
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
          <div key={seller.id} className="seller-card">
            <div className="seller-card-header">
              <div className="seller-avatar-box">
                <User size={24} />
              </div>
              <div className="seller-header-meta">
                <h3 className="seller-name">
                  <Link to={`/sellers/${seller.id}`}>{seller.name}</Link>
                  {seller.verified && <ShieldCheck size={16} className="verified-badge" title="Comercial Verificado" />}
                </h3>
                <span className="seller-sector">{seller.sector}</span>
              </div>
            </div>

            <p className="seller-headline">{seller.headline}</p>
            <p className="seller-bio">{seller.bio}</p>

            <div className="seller-card-stats">
              <div className="s-stat"><MapPin size={14} /> {seller.region}</div>
              <div className="s-stat"><Award size={14} /> {seller.experience}</div>
            </div>

            <div className="seller-card-footer">
              <Link to={`/sellers/${seller.id}`} style={{ width: '100%' }}>
                <Button variant="outline" size="sm" fullWidth icon={ArrowRight} iconPosition="right">
                  Ver Perfil y Contactar
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sellers;
