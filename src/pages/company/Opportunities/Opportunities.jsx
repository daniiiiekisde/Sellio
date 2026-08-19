import React, { useState } from 'react';
import { Plus, Trash2, MapPin, Package, CheckCircle2, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { Button, Modal } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';
import { useOpportunities } from '../../../hooks/useOpportunities';
import { useProducts } from '../../../hooks/useProducts';
import { SECTORS, REGIONS } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/formatters';
import { OfferCommissionForm, CommissionBadge } from '../../../components/commissions';
import { OpportunityStatus, OpportunityBadge } from '../../../components/opportunities';

export const CompanyOpportunities = () => {
  const { opportunities, addOpportunity, removeOpportunity, loading } = useOpportunities();
  const { products } = useProducts();
  const [modalOpen, setModalOpen] = useState(false);

  const initialFormState = {
    title: '',
    sector: SECTORS[0],
    category: 'Alimentación y Bebidas',
    target_region: REGIONS[0],
    selectedProductId: '',
    product_name: '',
    price: 100,
    required_experience: 'Media (2-3 años)',
    badge_type: 'NUEVA',
    commercial_commission_type: 'percentage',
    commercial_commission_rate: 15,
    commercial_commission_amount: 0,
    sellio_commission_model: 'fixed',
    sellio_commission_rate: 2,
    description: ''
  };

  const [formState, setFormState] = useState(initialFormState);

  const handleProductSelect = (productId) => {
    const selectedProd = products.find(p => p.id === productId);
    if (selectedProd) {
      setFormState(prev => ({
        ...prev,
        selectedProductId: productId,
        product_name: selectedProd.name,
        price: selectedProd.price || selectedProd.targetPrice || 100,
        category: selectedProd.category || prev.category
      }));
    } else {
      setFormState(prev => ({ ...prev, selectedProductId: productId }));
    }
  };

  const handleCommissionChange = (updatedCommissions) => {
    setFormState(prev => ({
      ...prev,
      ...updatedCommissions
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addOpportunity({
        title: formState.title || `Oportunidad: ${formState.product_name}`,
        product_name: formState.product_name || formState.title,
        company_name: 'Mi Empresa SL',
        category: formState.category,
        sector: formState.sector,
        target_region: formState.target_region,
        price: Number(formState.price),
        commercial_commission_rate: Number(formState.commercial_commission_rate),
        commercial_commission_amount: Number(formState.commercial_commission_amount),
        commercial_commission_type: formState.commercial_commission_type,
        sellio_commission_rate: Number(formState.sellio_commission_rate),
        sellio_commission_model: formState.sellio_commission_model,
        required_experience: formState.required_experience,
        badge_type: formState.badge_type,
        is_verified_company: true,
        description: formState.description,
        productIds: formState.selectedProductId ? [formState.selectedProductId] : []
      });
      setModalOpen(false);
      setFormState(initialFormState);
    } catch (err) {
      alert('Error al publicar oportunidad: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Deseas retirar esta oportunidad del Marketplace?')) {
      await removeOpportunity(id);
    }
  };

  return (
    <div className="company-opportunities-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <DashboardHeader
          title="Oportunidades Comerciales Publicadas"
          subtitle="Publica necesidades de comercialización por zona geográfica con condiciones de comisión claras."
        />
        <Button variant="primary" icon={Plus} onClick={() => setModalOpen(true)}>
          Crear Nueva Oportunidad
        </Button>
      </div>

      <div className="dash-card" style={{ marginTop: '1.5rem', background: '#fff', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-card)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem' }}>
          Tus Oportunidades Activas en el Mercado
        </h3>

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Cargando oportunidades...</div>
        ) : opportunities.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No tienes oportunidades comerciales publicadas. Pulsa en "Crear Nueva Oportunidad" para empezar.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <OpportunityBadge type={opp.badge_type || 'NUEVA'} />
                    <OpportunityStatus status={opp.status || 'published'} />
                  </div>

                  <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.1rem', fontWeight: 800 }}>
                    {opp.product_name || opp.title}
                  </h4>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                    <MapPin size={14} color="#64748b" />
                    <span>Zona: <strong>{opp.target_region || opp.targetTerritory}</strong></span>
                  </div>

                  <div style={{
                    background: '#ffffff',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Precio Base</span>
                      <strong style={{ fontSize: '1rem' }}>{formatCurrency(opp.price || 100)}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#047857', display: 'block' }}>Comisión Comercial</span>
                      <CommissionBadge rate={opp.commercial_commission_rate || 15} variant="emerald" />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #edf2f7', paddingTop: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Versión {opp.offer_version || 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(opp.id)}
                    style={{
                      color: '#dc2626',
                      background: 'none',
                      fontSize: '0.8rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={14} /> Retirar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Crear Oportunidad con Configuración de Comisiones */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Publicar Oportunidad Comercial en Sellio"
      >
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Vincular a Producto del Catálogo (Opcional)
            </label>
            <select
              value={formState.selectedProductId}
              onChange={(e) => handleProductSelect(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
            >
              <option value="">-- Seleccionar o crear ad-hoc --</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({formatCurrency(p.price || p.targetPrice || 0)})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Título de la Oportunidad / Producto
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Distribución de AOVE Ecológico en Cataluña"
                value={formState.title}
                onChange={(e) => setFormState({ ...formState, title: e.target.value, product_name: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Precio Base (€)
              </label>
              <input
                type="number"
                min="1"
                step="0.5"
                value={formState.price}
                onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Zona o Territorio Objetivo
              </label>
              <select
                value={formState.target_region}
                onChange={(e) => setFormState({ ...formState, target_region: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
              >
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Experiencia Requerida
              </label>
              <select
                value={formState.required_experience}
                onChange={(e) => setFormState({ ...formState, required_experience: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
              >
                <option value="Baja (Iniciación comercial)">Baja (Iniciación comercial)</option>
                <option value="Media (2-3 años)">Media (2-3 años)</option>
                <option value="Alta (>4 años o cartera activa)">Alta (&gt;4 años o cartera activa)</option>
              </select>
            </div>
          </div>

          {/* Formulario de Comisiones con Validación y Previsualización */}
          <OfferCommissionForm
            price={formState.price}
            values={{
              commercialCommissionType: formState.commercial_commission_type,
              commercialCommissionRate: formState.commercial_commission_rate,
              commercialCommissionAmount: formState.commercial_commission_amount,
              sellioCommissionModel: formState.sellio_commission_model,
              sellioCommissionRate: formState.sellio_commission_rate
            }}
            onChange={handleCommissionChange}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <Button variant="secondary" type="button" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Publicar Oportunidad (Versión 1)
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CompanyOpportunities;
