import React, { useState } from 'react';
import { Plus, Edit, Trash2, Tag, Percent, MapPin, Package } from 'lucide-react';
import { Button, Modal } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';
import { useProducts } from '../../../hooks/useProducts';
import { SECTORS, REGIONS } from '../../../utils/constants';

export const CompanyProducts = () => {
  const { products } = useProducts();
  const [modalOpen, setModalOpen] = useState(false);
  const [productList, setProductList] = useState([
    {
      id: 1,
      name: 'Aceite de Oliva Virgen Extra Ecológico Gran Selección (500ml)',
      category: 'Alimentación y Bebidas (HORECA)',
      price: 18.50,
      stockStatus: 'Disponible',
      status: 'Activo'
    },
    {
      id: 2,
      name: 'Conservas Artesanales Gourmet — Bonito del Norte',
      category: 'Alimentación y Bebidas (HORECA)',
      price: 12.00,
      stockStatus: 'Disponible',
      status: 'Activo'
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: SECTORS[0],
    price: '',
    stockStatus: 'Disponible'
  });

  const handleAdd = (e) => {
    e.preventDefault();
    setProductList(prev => [
      ...prev,
      { ...newProduct, id: Date.now(), status: 'Activo' }
    ]);
    setModalOpen(false);
    setNewProduct({ name: '', category: SECTORS[0], price: '', stockStatus: 'Disponible' });
  };

  return (
    <div className="company-products-page">
      <DashboardHeader
        title="Catálogo de Productos"
        subtitle="Gestiona el catálogo oficial de productos que tu empresa comercializa."
        action={
          <Button variant="primary" icon={Plus} onClick={() => setModalOpen(true)}>
            Añadir Producto al Catálogo
          </Button>
        }
      />

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Sector / Categoría</th>
              <th>PVP Orientativo</th>
              <th>Disponibilidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productList.map(p => (
              <tr key={p.id}>
                <td><strong>{p.name}</strong></td>
                <td>{p.category}</td>
                <td>{typeof p.price === 'number' ? `${p.price.toFixed(2)} €` : p.price}</td>
                <td><span className="badge badge-primary">{p.stockStatus}</span></td>
                <td><span className="badge badge-success">{p.status}</span></td>
                <td>
                  <div className="table-actions">
                    <Button variant="ghost" size="sm"><Edit size={16} /></Button>
                    <Button variant="ghost" size="sm"><Trash2 size={16} color="#ef4444" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Añadir Nuevo Producto al Catálogo"
      >
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Nombre del Producto</label>
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
            <label className="form-label">Sector</label>
            <select
              className="form-select"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            >
              {SECTORS.map((s, i) => <option key={i} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Precio Orientativo PVP (€)</label>
            <input
              type="number"
              step="0.01"
              className="form-input"
              required
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || '' })}
              placeholder="18.50"
            />
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar Producto</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CompanyProducts;
