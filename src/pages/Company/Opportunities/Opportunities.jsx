import React, { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Package, CheckCircle2 } from 'lucide-react';
import { Button, Modal } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';
import { useOpportunities } from '../../../hooks/useOpportunities';
import { useProducts } from '../../../hooks/useProducts';
import { SECTORS, REGIONS } from '../../../utils/constants';

export const CompanyOpportunities = () => {
  const { opportunities, addOpportunity, removeOpportunity, loading } = useOpportunities();
  const { products } = useProducts();
  const [modalOpen, setModalOpen] = useState(false);

  const [newOpp, setNewOpp] = useState({
    title: '',
    sector: SECTORS[0],
    targetTerritory: REGIONS[0],
    commissionRate: '15% sobre facturación neta',
    requirements: '',
    selectedProductId: ''
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addOpportunity({
        title: newOpp.title,
        sector: newOpp.sector,
        targetTerritory: newOpp.targetTerritory,
        commissionRate: newOpp.commissionRate,
        requirements: newOpp.requirements,
        productIds: newOpp.selectedProductId ? [newOpp.selectedProductId] : [],
        products: newOpp.selectedProductId 
          ? products.filter(p => p.id === newOpp.selectedProductId)
          : []
      });
      setModalOpen(false);
      setNewOpp({
        title: '',
        sector: SECTORS[0],
        targetTerritory: REGIONS[0],
        commissionRate: '15% sobre facturación neta',
        requirements: '',
        selectedProductId: ''
      });
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
      <DashboardHeader
        title="Oportunidades Comerciales Publicadas"
        subtitle="Publica necesidades de comercialización asociadas a tus productos reales para captar agentes comerciales."
        action={
          <Button variant="primary" icon={Plus} onClick={() => setModalOpen(true)}>
            Publicar Nueva Oportunidad
          </Button>
        }
      />

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Cargando oportunidades...</div>
        ) : opportunities.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            <p>No tienes oportunidades comerciales publicadas actualmente.</p>
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Título de Oportunidad</th>
                <th>Sector</th>
                <th>Territorio Objetivo</th>
                <th>Comisión Ofrecida</th>
                <th>Productos Asociados</th>
                <th>Postulaciones</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map(o => (
                <tr key={o.id}>
                  <td><strong>{o.title}</strong></td>
                  <td>{o.sector}</td>
                  <td><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />{o.targetTerritory}</td>
                  <td><span className="badge badge-primary">{o.commissionRate}</span></td>
                  <td>
                    {o.products && o.products.length > 0 ? (
                      <span className="badge badge-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Package size={12} /> {o.products[0].name.slice(0, 20)}...
                      </span>
                    ) : (
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Sin vincular</span>
                    )}
                  </td>
                  <td><span className="badge badge-success">{o.applicationsCount || 0} comerciales</span></td>
                  <td><span className="badge badge-success">{o.status === 'published' ? 'Activa' : o.status}</span></td>
                  <td>
                    <div className="table-actions">
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(o.id)}>
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
        title="Publicar Oportunidad de Expansión Comercial"
      >
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Título de la Oportunidad / Perfil buscado</label>
            <input
              type="text"
              className="form-input"
              required
              value={newOpp.title}
              onChange={(e) => setNewOpp({ ...newOpp, title: e.target.value })}
              placeholder="Ej. Comercial HORECA para distribución en Cataluña"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Producto Real del Catálogo Vinculado</label>
            <select
              className="form-select"
              value={newOpp.selectedProductId}
              onChange={(e) => setNewOpp({ ...newOpp, selectedProductId: e.target.value })}
            >
              <option value="">-- Seleccionar producto del catálogo --</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <small style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>
              Debe vincularse a un producto real validado para inspirar máxima confianza al comercial.
            </small>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Sector</label>
              <select
                className="form-select"
                value={newOpp.sector}
                onChange={(e) => setNewOpp({ ...newOpp, sector: e.target.value })}
              >
                {SECTORS.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Zona o Territorio Objetivo</label>
              <select
                className="form-select"
                value={newOpp.targetTerritory}
                onChange={(e) => setNewOpp({ ...newOpp, targetTerritory: e.target.value })}
              >
                {REGIONS.map((r, i) => <option key={i} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Comisión Ofrecida</label>
            <input
              type="text"
              className="form-input"
              required
              value={newOpp.commissionRate}
              onChange={(e) => setNewOpp({ ...newOpp, commissionRate: e.target.value })}
              placeholder="Ej. 15% sobre facturación neta"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Requisitos del Comercial / Cartera</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={newOpp.requirements}
              onChange={(e) => setNewOpp({ ...newOpp, requirements: e.target.value })}
              placeholder="Ej. Cartera consolidada de clientes en canal HORECA, mínimo 3 años de experiencia..."
            />
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Publicar en Marketplace</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CompanyOpportunities;
