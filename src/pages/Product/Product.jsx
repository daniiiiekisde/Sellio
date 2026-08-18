import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Percent, 
  Tag, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  Send, 
  FileText, 
  ShieldCheck 
} from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { formatCurrency } from '../../utils/formatters';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import './Product.css';

export const Product = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const [modalOpen, setModalOpen] = useState(false);
  const [applied, setApplied] = useState(false);

  const product = products.find(p => p.id === id) || products[0] || {
    id: 'prod_1',
    name: 'Aceite de Oliva Virgen Extra Ecológico Gran Selección (500ml)',
    company: 'Iberia Gourmet SL',
    category: 'Alimentación y Bebidas (HORECA)',
    targetTerritory: 'Cataluña / Baleares',
    commissionRate: '15%',
    price: 18.50,
    description: 'Aceite monovarietal de cosecha temprana prensado en frío. Ideal para restaurantes de alta cocina y tiendas gourmet.',
    matchingScore: 94
  };

  const handleApply = () => {
    setApplied(true);
    setTimeout(() => {
      setModalOpen(false);
    }, 1800);
  };

  return (
    <div className="product-detail-page container">
      <Link to="/products" className="back-breadcrumb">
        <ArrowLeft size={16} /> Volver al Marketplace
      </Link>

      <div className="product-detail-layout">
        {/* Main Info */}
        <div className="product-detail-main">
          <div className="product-header-card">
            <div className="badge-row">
              <span className="badge badge-primary">{product.category}</span>
              <span className="badge badge-success"><Sparkles size={12} /> Match {product.matchingScore}%</span>
            </div>

            <h1 className="product-title">{product.name}</h1>

            <div className="company-meta-link">
              <Building2 size={18} />
              <span>Fabricado y distribuido por <strong>{product.company}</strong></span>
              <ShieldCheck size={16} className="verified-icon" />
            </div>
          </div>

          <div className="detail-section-card">
            <h3 className="section-title">Descripción y Propuesta de Valor</h3>
            <p className="product-full-desc">{product.description}</p>
            <p className="product-full-desc">
              Buscamos comerciales y representantes con cartera activa en el sector para consolidar la presencia en zonas de expansión prioritaria.
            </p>

            <h4 className="subsection-title">Requisitos y Perfil Buscado:</h4>
            <ul className="profile-requirements-list">
              <li><CheckCircle2 size={16} /> Experiencia comercial demostrable en {product.category}.</li>
              <li><CheckCircle2 size={16} /> Cartera de clientes activa en {product.targetTerritory}.</li>
              <li><CheckCircle2 size={16} /> Capacidad de prospección y cierre de acuerdos comerciales.</li>
            </ul>
          </div>
        </div>

        {/* Commercial Conditions Sidebar */}
        <div className="product-detail-sidebar">
          <div className="conditions-card">
            <h3 className="conditions-title">Condiciones Comerciales</h3>

            <div className="condition-row highlight-condition">
              <span className="cond-label">Comisión Ofrecida</span>
              <span className="cond-value">{product.commissionRate}</span>
            </div>

            <div className="condition-row">
              <span className="cond-label">Territorio Objetivo</span>
              <span className="cond-value">{product.targetTerritory}</span>
            </div>

            <div className="condition-row">
              <span className="cond-label">PVP Orientativo</span>
              <span className="cond-value">{formatCurrency(product.price)}</span>
            </div>

            <div className="condition-row">
              <span className="cond-label">Material de Apoyo</span>
              <span className="cond-value">Catálogo + Muestras</span>
            </div>

            <Button 
              variant="primary" 
              fullWidth 
              size="lg" 
              icon={Send} 
              onClick={() => setModalOpen(true)}
              style={{ marginTop: 'var(--space-4)' }}
            >
              Solicitar Representación
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Enviar propuesta a la empresa"
      >
        {applied ? (
          <div className="success-modal-message">
            <CheckCircle2 size={44} className="success-icon" />
            <h3>¡Propuesta comercial enviada!</h3>
            <p>Se ha notificado al equipo de {product.company}. Pronto contactarán contigo.</p>
          </div>
        ) : (
          <div>
            <p style={{ marginBottom: '1rem', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
              Indica brevemente tu zona de cobertura y experiencia relevante:
            </p>
            <textarea
              className="form-textarea"
              rows={4}
              defaultValue={`Hola, me interesa representar ${product.name} en ${product.targetTerritory}. Cuento con experiencia directa en el sector.`}
            />
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button>
              <Button variant="primary" onClick={handleApply}>Confirmar Envío</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Product;
