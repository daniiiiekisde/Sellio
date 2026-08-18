import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, MapPin, Package, Users, ArrowUpRight } from 'lucide-react';
import Button from '../../common/Button';
import './CompanyCard.css';

export const CompanyCard = ({ company }) => {
  const {
    id,
    name,
    sector,
    region,
    description,
    productsCount,
    seekingAgents,
    commission,
    verified
  } = company || {};

  return (
    <div className="company-card">
      <div className="company-card-header">
        <div className="company-icon-box">
          <Building2 size={24} />
        </div>
        <div>
          <h3 className="company-name">
            <Link to={`/companies/${id}`}>{name}</Link>
            {verified && <ShieldCheck size={16} className="verified-badge" title="Empresa verificada" />}
          </h3>
          <p className="company-sector">{sector}</p>
        </div>
      </div>

      <p className="company-desc">{description}</p>

      <div className="company-card-stats">
        <span className="c-stat"><MapPin size={13} /> {region}</span>
        <span className="c-stat"><Package size={13} /> {productsCount} Catálogos</span>
        <span className="c-stat"><Users size={13} /> Busca {seekingAgents} agentes</span>
      </div>

      <div className="company-card-footer">
        <span className="company-commission-note">{commission}</span>
        <Link to={`/companies/${id}`}>
          <Button variant="outline" size="sm">Ver Perfil</Button>
        </Link>
      </div>
    </div>
  );
};

export default CompanyCard;
