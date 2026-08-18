import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCompanies } from '../../../hooks/useCompanies';
import { useProducts } from '../../../hooks/useProducts';
import { ProductCard } from '../../../components/marketplace';
import './Company.css';

export const Company = () => {
  const { id } = useParams();
  const { companies } = useCompanies();
  const { products } = useProducts();

  const company = companies.find(c => c.id === id) || companies[0] || {
    id: 'comp_1',
    name: 'Iberia Gourmet SL',
    sector: 'Alimentación y Bebidas (HORECA)',
    region: 'Cataluña',
    description: 'Fabricante de aceites de oliva virgen extra premium y conservas artesanales de alta gama.',
    productsCount: 12,
    seekingAgents: 4,
    commission: '15% sobre ventas netas',
    verified: true
  };

  const companyProducts = products.filter(p => p.company === company.name || p.id === 'prod_1');

  return (
    <div className="company-detail-page container">
      <Link to="/companies" className="back-breadcrumb">
        <ArrowLeft size={16} /> Volver a Empresas
      </Link>

      <div className="company-profile-banner">
        <div className="company-avatar-box">
          <Building2 size={36} />
        </div>
        <div className="company-info-col">
          <div className="company-title-row">
            <h1>{company.name}</h1>
            {company.verified && (
              <span className="badge badge-primary"><ShieldCheck size={14} /> Empresa Verificada</span>
            )}
          </div>
          <p className="company-sector-sub">{company.sector} &bull; Sede en {company.region}</p>
          <p className="company-about">{company.description}</p>
        </div>
      </div>

      <div className="company-products-section">
        <h2 className="section-title">Catálogo y Oportunidades Abiertas ({companyProducts.length})</h2>
        <div className="products-grid">
          {companyProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Company;
