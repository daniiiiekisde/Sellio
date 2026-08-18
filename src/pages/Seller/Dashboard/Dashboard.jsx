import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Users, BadgePercent, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/common';
import { StatsCard, DashboardHeader } from '../../../components/dashboard';
import { ProductCard } from '../../../components/marketplace';
import { useProducts } from '../../../hooks/useProducts';

export const SellerDashboard = () => {
  const { products } = useProducts();

  const stats = [
    { title: 'Oportunidades Compatibles', value: '18', change: 'Afinidad > 80%', icon: Sparkles, color: 'primary' },
    { title: 'Marcas Representadas', value: '3', change: 'Contratos activos', icon: ShoppingBag, color: 'success' },
    { title: 'Solicitudes Enviadas', value: '5', change: '2 en revisión', icon: Users, color: 'warning' },
    { title: 'Comisiones Estimadas', value: '2.450 €', change: 'Mes en curso', icon: BadgePercent, color: 'info' }
  ];

  return (
    <div className="seller-dashboard-page" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <DashboardHeader
        title="Panel del Comercial"
        subtitle="Bienvenido Carlos. Descubre oportunidades de alta afinidad para tu cartera de clientes."
        action={
          <Link to="/seller/marketplace">
            <Button variant="primary" icon={ShoppingBag}>Explorar Oportunidades</Button>
          </Link>
        }
      />

      {/* KPI Cards */}
      <div className="kpi-grid">
        {stats.map((s, i) => (
          <StatsCard
            key={i}
            title={s.title}
            value={s.value}
            change={s.change}
            icon={s.icon}
            color={s.color}
          />
        ))}
      </div>

      {/* High affinity match recommendation */}
      <div className="dash-card">
        <div className="dash-card-header">
          <div>
            <h3>Oportunidades Recomendadas por Afinidad (Matching B2B)</h3>
            <p style={{ fontSize: 'var(--font-size-xs)', color: '#94a3b8' }}>
              Basado en tu especialidad (Alimentación & HORECA) y zona de cobertura (Cataluña).
            </p>
          </div>
          <Link to="/seller/marketplace" className="view-all-link">
            Ver todas <ArrowRight size={14} />
          </Link>
        </div>

        <div className="products-grid" style={{ marginTop: '1rem' }}>
          {products.slice(0, 2).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
