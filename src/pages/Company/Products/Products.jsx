import React, { useState } from 'react';
import { Plus, Edit, Trash2, Tag, Percent, MapPin } from 'lucide-react';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
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
      territory: 'Cataluña / Baleares',
      commission: '15%',
      status: 'Activo'
    },
    {
      id: 2,
      name: 'Conservas Artesanales Gourmet — Bonito del Norte',
      category: 'Alimentación y Bebidas (HORECA)',
      territory: 'Madrid / Centro',
      commission: '18%',
      status: 'Activo'
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: SECTORS[0],
    territory: REGIONS[0],
    commission: '15%'
  });

  const handleAdd = (e) => {
    e.preventDefault();
    setProductList(prev => [
      ...prev,
      { ...newProduct, id: Date.now(), status: 'Activo' }
    ]);
    setModalOpen(false);
    setNewProduct({ name: '', category: SECTORS[0], territory: REGIONS[0], commission: '15%' });
  };

  return (
    <div className="company-products-page">
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Mis Productos y Oportunidades</h1>
          <p className="dash-subtitle">Publica y gestiona los productos que ofreces para representación comercial.</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => setModalOpen(true)}>
          Nuevo Producto
        </Button>
      </div>

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Sector</th>
              <th>Zona de Expansión</th>
              <th>Comisión</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productList.map(p => (
              <tr key={p.id}>
                <td><strong>{p.name}</strong></td>
                <td>{p.category}</td>
                <td>{p.territory}</td>
                <td><span className="badge badge-primary">{p.commission}</span></td>
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
        title="Publicar Nuevo Producto para Comerciales"
      >
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Nombre del Producto / Gama</label>
            <input
              type="text"
              className="form-input"
              required
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              placeholder="Ej. Línea Cosmética Natural Bio"
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
            <label className="form-label">Zona o Territorio de Búsqueda</label>
            <select
              className="form-select"
              value={newProduct.territory}
              onChange={(e) => setNewProduct({ ...newProduct, territory: e.target.value })}
            >
              {REGIONS.map((r, i) => <option key={i} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Comisión Ofrecida (%)</label>
            <input
              type="text"
              className="form-input"
              required
              value={newProduct.commission}
              onChange={(e) => setNewProduct({ ...newProduct, commission: e.target.value })}
              placeholder="Ej. 15% sobre ventas"
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

export default CompanyProducts;
