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
  ShieldCheck,
  Calculator,
  FileText
} from 'lucide-react';
import { useProducts } from '../../../hooks/useProducts';
import { formatCurrency } from '../../../utils/formatters';
import { Button, Modal } from '../../../components/common';
import { CommissionBreakdown, CommissionPreview } from '../../../components/commissions';
import './Product.css';

export const Product = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const [modalOpen, setModalOpen] = useState(false);
  const [applied, setApplied] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);

  const foundProduct = products.find(p => p.id === id) || products[0];
  const product = foundProduct || {
    id: 'prod_1',
    name: 'Aceite de Oliva Virgen Extra Ecológico D.O. 500ml',
    company: 'Iberia Gourmet SL',
    category: 'Alimentación y Gourmet',
    targetTerritory: 'Cataluña / Levante / Madrid',
    commissionRate: '15%',
    commercial_commission_rate: 15,
    sellio_commission_rate: 2.0,
    price: 14.50,
    description: 'AOVE de cosecha temprana extracción en frío, botella de vidrio oscuro premium 500ml. Certificación ecológica europea.',
    matchingScore: 95
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
        <ArrowLeft size={16} /> Volver al Catálogo de Oportunidades
      </Link>

      <div className="product-detail-layout">
        {/* Main Info */}
        <div className="product-detail-main">
          <div className="product-header-card">
            <div className="badge-row">
              <span className="badge badge-primary">{product.category}</span>
              {product.matchingScore && (
                <span className="badge badge-success"><Sparkles size={12} /> Match {product.matchingScore}%</span>
              )}
            </div>

            <h1 className="product-title">{product.name}</h1>

            <div className="company-meta-link">
              <Building2 size={18} />
              <span>Fabricado y distribuido por <strong>{product.company || product.companyName}</strong></span>
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
              <li><CheckCircle2 size={16} /> Cartera de clientes activa en {product.targetTerritory || 'el territorio asignado'}.</li>
              <li><CheckCircle2 size={16} /> Capacidad de prospección y cierre de acuerdos comerciales.</li>
            </ul>
          </div>

          {/* Interactive Calculator / Preview Toggle */}
          <div className="detail-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calculator size={20} className="text-primary" />
                <h3 className="section-title" style={{ margin: 0 }}>Simulador de Rendimiento Comercial</h3>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowSimulator(!showSimulator)}
              >
                {showSimulator ? 'Ocultar simulador' : 'Abrir simulador en vivo'}
              </Button>
            </div>
            
            {showSimulator ? (
              <CommissionPreview
                price={product.price || 100}
                commercialCommissionRate={product.commercial_commission_rate || product.commissionRate || 15}
                commercialCommissionType={product.commercial_commission_type || 'percentage'}
                commercialCommissionAmount={product.commercial_commission_amount || 0}
                sellioCommissionRate={product.sellio_commission_rate || 2.0}
                sellioCommissionModel={product.sellio_commission_model || 'fixed'}
                title="Simulador de Ingresos por Venta / Pedido"
              />
            ) : (
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
                Haz clic en el simulador para proyectar tus ganancias estimadas según el volumen o precio por pedido de este producto.
              </p>
            )}
          </div>
        </div>

        {/* Commercial Conditions Sidebar */}
        <div className="product-detail-sidebar">
          <div className="conditions-card">
            <h3 className="conditions-title">Condiciones Económicas</h3>

            {/* Modular Commission Breakdown */}
            <CommissionBreakdown
              product={product}
              role="seller"
              showConditions={true}
            />

            <div style={{ marginTop: '1.25rem' }}>
              <Button 
                variant="primary" 
                fullWidth 
                size="lg" 
                icon={Send} 
                onClick={() => setModalOpen(true)}
              >
                Me interesa representar este producto
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Solicitar Representación: ${product.name}`}
      >
        {applied ? (
          <div className="success-modal-message">
            <CheckCircle2 size={44} className="success-icon" />
            <h3>¡Propuesta comercial enviada!</h3>
            <p>Se ha notificado al equipo de <strong>{product.company || product.companyName}</strong>. Pronto contactarán contigo.</p>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.2rem' }}>
              <CommissionBreakdown
                product={product}
                role="seller"
                showConditions={false}
              />
            </div>

            <p style={{ marginBottom: '0.5rem', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Indica brevemente tu zona de cobertura, clientes potenciales y experiencia:
            </p>
            <textarea
              className="form-textarea"
              rows={4}
              defaultValue={`Hola, me interesa representar ${product.name} en ${product.targetTerritory || 'mi zona'}. Cuento con cartera activa de clientes y experiencia directa en el sector.`}
            />
            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button>
              <Button variant="primary" onClick={handleApply}>Confirmar e Interesarme</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Product;
