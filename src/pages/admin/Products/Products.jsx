import React from 'react';
import Products from '../../marketplace/Products';
import { DashboardHeader } from '../../../components/dashboard';

export const AdminProducts = () => {
  return (
    <div className="admin-products-view">
      <DashboardHeader
        title="Moderación de Catálogos y Productos"
        subtitle="Supervisión y aprobación de ofertas comerciales en el marketplace."
      />
      <Products />
    </div>
  );
};

export default AdminProducts;
