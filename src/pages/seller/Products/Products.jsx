import React from 'react';
import { Package, Building2, Percent, ArrowUpRight, Download } from 'lucide-react';
import { Button } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';

export const SellerProducts = () => {
  const myProducts = [
    {
      id: 'prod_1',
      name: 'Aceite de Oliva Virgen Extra Ecológico (500ml)',
      company: 'Iberia Gourmet SL',
      category: 'Alimentación y Bebidas (HORECA)',
      commissionRate: '15%',
      salesThisMonth: '1.250 €',
      status: 'En Cartera'
    },
    {
      id: 'prod_2',
      name: 'Conservas Artesanales Gourmet — Bonito del Norte',
      company: 'Iberia Gourmet SL',
      category: 'Alimentación y Bebidas (HORECA)',
      commissionRate: '18%',
      salesThisMonth: '1.200 €',
      status: 'En Cartera'
    }
  ];

  return (
    <div className="seller-products-page">
      <DashboardHeader
        title="Mi Cartera de Productos"
        subtitle="Catálogos y líneas de producto que representas activamente ante tus clientes."
      />

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Producto Representado</th>
              <th>Empresa Fabricante</th>
              <th>Sector</th>
              <th>Comisión Pactada</th>
              <th>Ventas Mes</th>
              <th>Material</th>
            </tr>
          </thead>
          <tbody>
            {myProducts.map(p => (
              <tr key={p.id}>
                <td><strong>{p.name}</strong></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Building2 size={14} color="#818cf8" />
                    <span>{p.company}</span>
                  </div>
                </td>
                <td>{p.category}</td>
                <td><span className="badge badge-primary">{p.commissionRate}</span></td>
                <td><strong>{p.salesThisMonth}</strong></td>
                <td>
                  <Button variant="outline" size="sm" icon={Download}>Catálogo PDF</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerProducts;
