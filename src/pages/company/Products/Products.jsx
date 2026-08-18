import React, { useState } from 'react';
import { Plus, Edit, Trash2, Package, CheckCircle2 } from 'lucide-react';
import { Button, Modal } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';
import { useProducts } from '../../../hooks/useProducts';
import { SECTORS } from '../../../utils/constants';

export const CompanyProducts = () => {
  const { products, addProduct, removeProduct, loading } = useProducts();
  const [modalOpen, setModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: SECTORS[0],
    description: '',
    targetPrice: '',
    suggestedCommission: '15%'
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        name: newProduct.name,
        category: newProduct.category,
        description: newProduct.description,
        targetPrice: newProduct.targetPrice ? `${newProduct.targetPrice} €` : 'A consultar',
        suggestedCommission: newProduct.suggestedCommission,
        status: 'published',
        is_real_product_confirmed: true,
        available_for_sales: true
      });
      setModalOpen(false);
      setNewProduct({
        name: '',
        category: SECTORS[0],
        description: '',
        targetPrice: '',
        suggestedCommission: '15%'
      });
    } catch (err) {
      alert('Error al añadir producto: ' + err.message);
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
        title="Catálogo de Productos"
        subtitle="Gestiona el catálogo oficial de productos reales que tu empresa comercializa y vincula a oportunidades."
        action={
          <Button variant="primary" icon={Plus} onClick={() => setModalOpen(true)}>
            Añadir Producto al Catálogo
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
                <th>Comisión Sugerida</th>
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
                    {p.description && <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{p.description.slice(0, 70)}...</div>}
                  </td>
                  <td>{p.category}</td>
                  <td>{p.targetPrice || (typeof p.price === 'number' ? `${p.price.toFixed(2)} €` : p.price || '-')}</td>
                  <td><span className="badge badge-primary">{p.suggestedCommission || p.commissionRate || '15%'}</span></td>
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
        title="Añadir Nuevo Producto al Catálogo"
      >
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
            <label className="form-label">Descripción del Producto</label>
            <textarea
              className="form-textarea"
              rows={2}
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              placeholder="Características técnicas, packaging, formato de venta..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Precio Orientativo PVP (€)</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={newProduct.targetPrice}
                onChange={(e) => setNewProduct({ ...newProduct, targetPrice: e.target.value })}
                placeholder="18.50"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Comisión Estimada (%)</label>
              <input
                type="text"
                className="form-input"
                value={newProduct.suggestedCommission}
                onChange={(e) => setNewProduct({ ...newProduct, suggestedCommission: e.target.value })}
                placeholder="15%"
              />
            </div>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar Producto en Catálogo</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CompanyProducts;
