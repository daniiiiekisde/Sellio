import React, { useState } from 'react';
import { Plus, Edit, Trash2, Package, CheckCircle2, ShieldCheck, Percent, Layers, Eye } from 'lucide-react';
import { Button, Modal } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';
import { useProducts } from '../../../hooks/useProducts';
import { SECTORS } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/formatters';
import { 
  OfferCommissionForm, 
  CommissionPreview, 
  CommissionBadge 
} from '../../../components/commissions';
import { 
  DEFAULT_VOLUME_TIERS, 
  validateCommissionConfig 
} from '../../../utils/commissionCalculator';

export const CompanyProducts = () => {
  const { products, addProduct, removeProduct, loading } = useProducts();
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationStep, setConfirmationStep] = useState(false);

  const initialFormState = {
    name: '',
    category: SECTORS[0],
    description: '',
    targetPrice: '100',
    price: 100,
    currency: 'EUR',
    // Comisiones
    commercial_commission_type: 'percentage',
    commercial_commission_rate: 15,
    commercial_commission_amount: 0,
    commercial_commission_basis: 'sale_value',
    commission_notes: 'Comisión íntegra para el comercial por venta realizada.',
    sellio_commission_type: 'percentage',
    sellio_commission_rate: 2.0,
    sellio_commission_cap: 5.0,
    sellio_commission_model: 'fixed',
    volume_tiers: DEFAULT_VOLUME_TIERS,
    // Condiciones
    minimum_sale_value: '',
    commission_payment_trigger: 'paid_sale',
    payment_period: '30 días fin de mes',
    returns_policy: '14 días estándar'
  };

  const [newProduct, setNewProduct] = useState(initialFormState);

  const handleCommissionFormChange = (updatedFields) => {
    setNewProduct(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  const handleOpenModal = () => {
    setNewProduct(initialFormState);
    setConfirmationStep(false);
    setModalOpen(true);
  };

  const handleProceedToConfirmation = (e) => {
    e.preventDefault();
    const validation = validateCommissionConfig({
      commercialRate: newProduct.commercial_commission_rate,
      commercialAmount: newProduct.commercial_commission_amount,
      commercialType: newProduct.commercial_commission_type,
      sellioRate: newProduct.sellio_commission_rate,
      sellioModel: newProduct.sellio_commission_model,
      volumeTiers: newProduct.volume_tiers
    });

    if (!validation.isValid) {
      alert('Por favor, corrige los errores en la configuración de comisiones:\n' + validation.errors.join('\n'));
      return;
    }

    setConfirmationStep(true);
  };

  const handleFinalPublish = async () => {
    try {
      const numericPrice = parseFloat(String(newProduct.targetPrice).replace('€', '').trim()) || 0;
      await addProduct({
        ...newProduct,
        price: numericPrice,
        product_price: numericPrice,
        targetPrice: `${numericPrice.toFixed(2)} €`,
        suggestedCommission: `${newProduct.commercial_commission_rate}%`,
        commissionRate: `${newProduct.commercial_commission_rate}%`,
        status: 'published',
        is_real_product_confirmed: true,
        available_for_sales: true
      });
      setModalOpen(false);
      setConfirmationStep(false);
      setNewProduct(initialFormState);
    } catch (err) {
      alert('Error al publicar producto: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto del catálogo?')) {
      await removeProduct(id);
    }
  };

  return (
    <div className="company-products-page">
      <DashboardHeader
        title="Catálogo y Ofertas Comerciales"
        subtitle="Configura tus productos con modelos de comisiones transparentes para comerciales y la plataforma Sellio (máx 5%)."
        action={
          <Button variant="primary" icon={Plus} onClick={handleOpenModal}>
            Publicar Nueva Oferta de Producto
          </Button>
        }
      />

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Cargando catálogo...</div>
        ) : products.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            <Package size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
            <p>No tienes productos registrados en el catálogo.</p>
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Sector / Categoría</th>
                <th>PVP Orientativo</th>
                <th>Comisión Comercial</th>
                <th>Comisión Sellio</th>
                <th>Verificación</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>
                    <strong>{p.name}</strong>
                    {p.description && <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{p.description.slice(0, 60)}...</div>}
                  </td>
                  <td>{p.category}</td>
                  <td><strong>{p.targetPrice || (typeof p.price === 'number' ? `${p.price.toFixed(2)} €` : p.price || '-')}</strong></td>
                  <td>
                    <CommissionBadge
                      commercialRate={p.commercial_commission_rate || p.commissionRate || '15%'}
                      variant="pill"
                      size="sm"
                    />
                  </td>
                  <td>
                    <span className="badge badge-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <ShieldCheck size={12} /> {p.sellio_commission_model === 'volume_tiered' ? 'Por tramos (Máx 5%)' : `${p.sellio_commission_rate || 2}% Fijo`}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={12} /> Real Verificado
                    </span>
                  </td>
                  <td><span className="badge badge-success">{p.status === 'published' ? 'Publicado' : p.status || 'Activo'}</span></td>
                  <td>
                    <div className="table-actions">
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)}>
                        <Trash2 size={16} color="#ef4444" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={confirmationStep ? "Confirmación Económica antes de Publicar" : "Configurar Nueva Oferta de Producto"}
      >
        {!confirmationStep ? (
          <form onSubmit={handleProceedToConfirmation} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Nombre del Producto Real</label>
              <input
                type="text"
                className="form-input"
                required
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder="Ej. Aceite Monovarietal Arbequina 500ml"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Sector / Categoría</label>
                <select
                  className="form-select"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                  {SECTORS.map((s, i) => <option key={i} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Precio Unitario de Venta PVP (€)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  className="form-input"
                  value={newProduct.targetPrice}
                  onChange={(e) => setNewProduct({ ...newProduct, targetPrice: e.target.value, price: parseFloat(e.target.value) || 0 })}
                  placeholder="100.00"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Descripción del Producto</label>
              <textarea
                className="form-textarea"
                rows={2}
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                placeholder="Packaging, cualidades diferenciales, propuesta de valor para el comercial..."
              />
            </div>

            {/* SECCIÓN MODULAR DE COMISIONES SEGÚN ESPECIFICACIÓN */}
            <div style={{ marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                Configuración del Modelo de Comisiones
              </h4>
              <OfferCommissionForm
                values={newProduct}
                onChange={handleCommissionFormChange}
                productPrice={parseFloat(newProduct.targetPrice) || 100}
              />
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button>
              <Button variant="primary" type="submit">Previsualizar y Confirmar</Button>
            </div>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: '8px' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{newProduct.name}</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Categoría: <strong>{newProduct.category}</strong> | PVP: <strong>{newProduct.targetPrice} €</strong>
              </p>
            </div>

            {/* PREVISUALIZACIÓN COMPLETA CENTRALIZADA */}
            <CommissionPreview
              price={parseFloat(newProduct.targetPrice) || 100}
              commercialCommissionRate={newProduct.commercial_commission_rate}
              commercialCommissionType={newProduct.commercial_commission_type}
              commercialCommissionAmount={newProduct.commercial_commission_amount}
              sellioCommissionRate={newProduct.sellio_commission_rate}
              sellioCommissionModel={newProduct.sellio_commission_model}
              volumeTiers={newProduct.volume_tiers}
              title="Resumen Económico de la Oferta"
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <Button variant="outline" onClick={() => setConfirmationStep(false)}>
                Modificar Parámetros
              </Button>
              <Button variant="primary" onClick={handleFinalPublish}>
                Confirmar y Publicar Oferta Oficial
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CompanyProducts;
