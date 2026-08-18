import React from 'react';
import Products from '../../Products';

export const AdminProducts = () => {
  return (
    <div className="admin-products-view">
      <div className="dash-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="dash-title">Moderación de Catálogos y Productos</h1>
          <p className="dash-subtitle">Supervisión y aprobación de ofertas comerciales en el marketplace.</p>
        </div>
      </div>
      <Products />
    </div>
  );
};

export default AdminProducts;
