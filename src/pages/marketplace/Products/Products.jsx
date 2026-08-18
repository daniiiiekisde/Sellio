import React, { useState } from 'react';
import { Sparkles, Briefcase, Package, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../../hooks/useProducts';
import { useOpportunities } from '../../../hooks/useOpportunities';
import { useRequests } from '../../../hooks/useRequests';
import { SECTORS, REGIONS } from '../../../utils/constants';
import { SearchBar, Modal, Button } from '../../../components/common';
import { ProductCard, OpportunityCard } from '../../../components/marketplace';
import './Products.css';

export const Products = () => {
  const [activeTab, setActiveTab] = useState('opportunities'); // 'opportunities' | 'products'
  const { products, loading: loadingProducts } = useProducts();
  const { opportunities, loading: loadingOpps } = useOpportunities();
  const { sendInterest } = useRequests();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');

  // Modal State
  const [interestTarget, setInterestTarget] = useState(null); // Opportunity or Product object
  const [contactMessage, setContactMessage] = useState('');
  const [shareContactDetails, setShareContactDetails] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  // Filter Opportunities
  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSector = selectedSector === 'ALL' || opp.sector === selectedSector;
    const matchesRegion = selectedRegion === 'ALL' || (opp.targetTerritory && opp.targetTerritory.includes(selectedRegion));

    return matchesSearch && matchesSector && matchesRegion;
  });

  // Filter Products
  const filteredProducts = products.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSector = selectedSector === 'ALL' || prod.category === selectedSector;
    const matchesRegion = selectedRegion === 'ALL' || (prod.targetTerritory && prod.targetTerritory.includes(selectedRegion));

    return matchesSearch && matchesSector && matchesRegion;
  });

  const handleOpenInterest = (item) => {
    setInterestTarget(item);
    setSentSuccess(false);
    setShareContactDetails(false);
    setContactMessage(
      `Hola, soy comercial independiente con experiencia activa en la zona. Me interesa representar ${item.title || item.name} y acordar las condiciones de comisión por venta.`
    );
  };

  const handleSendInterest = () => {
    if (!interestTarget) return;

    sendInterest({
      opportunityId: interestTarget.id,
      opportunityTitle: interestTarget.title || `Representación de ${interestTarget.name}`,
      productName: interestTarget.name || interestTarget.title,
      companyName: interestTarget.company,
      sellerId: 'sell_1',
      sellerAnonymousId: 'COMERCIAL #A482',
      sellerExperience: '+12 años de experiencia',
      sellerRegion: selectedRegion !== 'ALL' ? selectedRegion : 'Cataluña',
      sellerSector: interestTarget.sector || interestTarget.category || 'Alimentación y Bebidas (HORECA)',
      sellerSpecialization: 'Distribución y Venta B2B',
      sellerMatchScore: interestTarget.matchScore || interestTarget.matchingScore || 94,
      message: contactMessage,
      shareFullContact: shareContactDetails
    });

    setSentSuccess(true);
  };

  return (
    <div className="products-page container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Marketplace de Oportunidades y Productos</h1>
          <p className="page-subtitle">
            Encuentra fabricantes con productos reales listos para comercializar. Postula tu interés manteniendo tu privacidad.
          </p>
        </div>
      </div>

      {/* Main Tabs: Oportunidades vs Productos */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`btn ${activeTab === 'opportunities' ? 'btn-primary' : 'btn-outline'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem' }}
        >
          <Briefcase size={16} />
          <span>Oportunidades Comerciales ({opportunities.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`btn ${activeTab === 'products' ? 'btn-primary' : 'btn-outline'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem' }}
        >
          <Package size={16} />
          <span>Catálogo de Productos ({products.length})</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="filters-container">
        <div className="filters-search">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={activeTab === 'opportunities' ? "Buscar por oportunidad, empresa o sector..." : "Buscar por producto, marca o sector..."}
            size="lg"
          />
        </div>

        <div className="filters-row">
          <div className="filter-select-group">
            <label>Sector:</label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">Todos los sectores</option>
              {SECTORS.map((sec, i) => (
                <option key={i} value={sec}>{sec}</option>
              ))}
            </select>
          </div>

          <div className="filter-select-group">
            <label>Territorio Objetivo:</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">Todas las zonas</option>
              {REGIONS.map((reg, i) => (
                <option key={i} value={reg}>{reg}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content Rendering */}
      {activeTab === 'opportunities' ? (
        <div className="products-grid-wrapper">
          <div className="results-count">
            <span>Mostrando <strong>{filteredOpportunities.length}</strong> oportunidades comerciales activas</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
            {filteredOpportunities.map(opp => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                onInterestClick={handleOpenInterest}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="products-grid-wrapper">
          <div className="results-count">
            <span>Mostrando <strong>{filteredProducts.length}</strong> productos listos para representación</span>
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onInterestClick={handleOpenInterest}
              />
            ))}
          </div>
        </div>
      )}

      {/* Interest Contact Modal */}
      <Modal
        isOpen={!!interestTarget}
        onClose={() => setInterestTarget(null)}
        title={`Postular Interés — ${interestTarget?.title || interestTarget?.name}`}
        footer={
          sentSuccess ? (
            <div style={{ display: 'flex', gap: '0.5rem', width: '100%', justifyContent: 'flex-end' }}>
              <Link to="/seller/requests">
                <Button variant="outline" size="sm" icon={ArrowRight}>Ver mis solicitudes</Button>
              </Link>
              <Button variant="primary" size="sm" onClick={() => setInterestTarget(null)}>Aceptar</Button>
            </div>
          ) : (
            <>
              <Button variant="outline" onClick={() => setInterestTarget(null)}>Cancelar</Button>
              <Button variant="primary" onClick={handleSendInterest}>Enviar Propuesta de Interés</Button>
            </>
          )
        }
      >
        {sentSuccess ? (
          <div className="success-modal-message" style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>¡Propuesta enviada con éxito!</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              La empresa <strong>{interestTarget?.company}</strong> ha recibido tu interés desde tu perfil anónimo <strong>COMERCIAL #A482</strong>.
            </p>
            <p style={{ color: '#cbd5e1', fontSize: '0.8rem', marginTop: '0.5rem' }}>
              Podrás seguir el estado y conversar con el fabricante desde tu panel de Solicitudes.
            </p>
          </div>
        ) : (
          <div className="interest-form-content">
            <p className="interest-intro" style={{ fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '1rem' }}>
              Te acercarás a <strong>{interestTarget?.company}</strong> para proponer la comercialización de:
            </p>

            <div style={{ background: 'rgba(6, 9, 14, 0.5)', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.95rem' }}>
                {interestTarget?.title || interestTarget?.name}
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.4rem', fontSize: '0.8rem', color: '#818cf8' }}>
                <span>Comisión: <strong>{interestTarget?.commissionRate}</strong></span>
                <span>Zona: <strong>{interestTarget?.targetTerritory}</strong></span>
              </div>
            </div>

            {/* Privacy Option */}
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.25)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <Lock size={18} color="#818cf8" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>
                  Envío con Perfil Anónimo Protegido (COMERCIAL #A482)
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                  La empresa verá tus capacidades comerciales (sectores, zonas, años de experiencia), pero tus datos personales (teléfono, email, nombre legal) permanecerán confidenciales hasta que acuerdes revelarlos.
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Mensaje de presentación comercial:</label>
              <textarea
                className="form-textarea"
                rows={4}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Indica tu experiencia en la zona, tipo de clientes que atiendes o capacidad de penetración comercial..."
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Products;
