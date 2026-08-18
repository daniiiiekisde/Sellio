import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useProducts } from '../../../hooks/useProducts';
import { SECTORS, REGIONS } from '../../../utils/constants';
import { SearchBar, Modal, Button } from '../../../components/common';
import { ProductCard } from '../../../components/marketplace';
import './Products.css';

export const Products = () => {
  const { products, loading } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [interestModalProduct, setInterestModalProduct] = useState(null);
  const [contactMessage, setContactMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const filteredProducts = products.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSector = selectedSector === 'ALL' || prod.category === selectedSector;
    const matchesRegion = selectedRegion === 'ALL' || (prod.targetTerritory && prod.targetTerritory.includes(selectedRegion));

    return matchesSearch && matchesSector && matchesRegion;
  });

  const handleInterest = (product) => {
    setInterestModalProduct(product);
    setSentSuccess(false);
    setContactMessage(`Hola, soy comercial en la zona y me interesa representar ${product.name}. Me gustaría recibir más detalles sobre condiciones y catálogo.`);
  };

  const handleSendInterest = () => {
    setSentSuccess(true);
    setTimeout(() => {
      setInterestModalProduct(null);
      setSentSuccess(false);
    }, 2000);
  };

  return (
    <div className="products-page container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Marketplace de Productos y Oportunidades</h1>
          <p className="page-subtitle">Explora productos de fabricantes listos para ser representados comercialmente.</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filters-container">
        <div className="filters-search">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por producto, marca o sector..."
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
            <label>Territorio:</label>
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

      {/* Products Grid */}
      <div className="products-grid-wrapper">
        <div className="results-count">
          <span>Mostrando <strong>{filteredProducts.length}</strong> oportunidades disponibles</span>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onInterestClick={handleInterest}
            />
          ))}
        </div>
      </div>

      {/* Interest Contact Modal */}
      <Modal
        isOpen={!!interestModalProduct}
        onClose={() => setInterestModalProduct(null)}
        title={`Solicitar representación — ${interestModalProduct?.name}`}
        footer={
          sentSuccess ? null : (
            <>
              <Button variant="outline" onClick={() => setInterestModalProduct(null)}>Cancelar</Button>
              <Button variant="primary" onClick={handleSendInterest}>Enviar Solicitud</Button>
            </>
          )
        }
      >
        {sentSuccess ? (
          <div className="success-modal-message">
            <Sparkles size={40} className="success-icon" />
            <h3>¡Solicitud enviada con éxito!</h3>
            <p>La empresa <strong>{interestModalProduct?.company}</strong> ha recibido tu interés y podrá contactarte directamente.</p>
          </div>
        ) : (
          <div className="interest-form-content">
            <p className="interest-intro">
              Enviarás una propuesta directa de representación comercial a <strong>{interestModalProduct?.company}</strong> para el producto:
            </p>
            <div className="product-summary-badge">
              <strong>{interestModalProduct?.name}</strong>
              <span>Comisión orientativa: {interestModalProduct?.commissionRate}</span>
            </div>

            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label className="form-label">Mensaje de presentación:</label>
              <textarea
                className="form-textarea"
                rows={4}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Products;
