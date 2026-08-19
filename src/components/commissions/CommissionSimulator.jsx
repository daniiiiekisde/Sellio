import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingUp, DollarSign, ArrowRight, ShieldCheck, PieChart } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { calculateCommissions, SELLIO_MAX_COMMISSION_RATE } from '../../utils/commissionCalculator';
import './commissions.css';

export const CommissionSimulator = ({
  initialPrice = 250,
  initialCommissionRate = 12,
  initialSalesCount = 20,
  compact = false
}) => {
  const [price, setPrice] = useState(initialPrice);
  const [rate, setRate] = useState(initialCommissionRate);
  const [salesCount, setSalesCount] = useState(initialSalesCount);
  const [sellioRate, setSellioRate] = useState(2.0);

  const unitCalc = calculateCommissions({
    price,
    commercialCommissionRate: rate,
    sellioCommissionRate: sellioRate,
    quantity: 1
  });

  const totalCalc = calculateCommissions({
    price,
    commercialCommissionRate: rate,
    sellioCommissionRate: sellioRate,
    quantity: salesCount
  });

  const totalCommercialEarnings = totalCalc.commercialCommission;
  const totalSalesVolume = totalCalc.saleValue;
  const totalSellioCost = totalCalc.sellioCommission;
  const totalCompanyNet = totalCalc.companyNetBeforeOtherCosts;

  return (
    <div className="simulator-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'rgba(37, 99, 235, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary)'
        }}>
          <Calculator size={22} />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Simulador de Ganancias y Comisiones
          </h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Proyecta tus ingresos estimados calculando comisiones por volumen de ventas.
          </p>
        </div>
      </div>

      <div className="simulator-grid">
        {/* Panel de Controles / Sliders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="simulator-input-group">
            <label>
              <span>Precio medio del producto</span>
              <strong style={{ color: 'var(--primary)' }}>{formatCurrency(price)}</strong>
            </label>
            <input
              type="range"
              min="10"
              max="5000"
              step="10"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="slider-range"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>10 €</span>
              <span>2.500 €</span>
              <span>5.000 €</span>
            </div>
          </div>

          <div className="simulator-input-group">
            <label>
              <span>Comisión comercial pactada</span>
              <strong style={{ color: '#059669' }}>{rate}%</strong>
            </label>
            <input
              type="range"
              min="1"
              max="50"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="slider-range"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>1%</span>
              <span>25%</span>
              <span>50%</span>
            </div>
          </div>

          <div className="simulator-input-group">
            <label>
              <span>Ventas mensuales estimadas</span>
              <strong style={{ color: 'var(--text-primary)' }}>{salesCount} unidades</strong>
            </label>
            <input
              type="range"
              min="1"
              max="150"
              step="1"
              value={salesCount}
              onChange={(e) => setSalesCount(Number(e.target.value))}
              className="slider-range"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>1 ud.</span>
              <span>75 uds.</span>
              <span>150 uds.</span>
            </div>
          </div>

          <div style={{
            background: '#f8fafc',
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #e2e8f0',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Comisión ganada por 1 venta:</span>
              <strong style={{ color: '#059669' }}>{formatCurrency(unitCalc.commercialCommission)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Comisión plataforma Sellio (2%):</span>
              <span style={{ color: '#2563eb' }}>{formatCurrency(unitCalc.sellioCommission)} / venta</span>
            </div>
          </div>
        </div>

        {/* Panel de Resultados / Visual KPI */}
        <div className="simulator-result-box">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-success" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: 'none' }}>
                <Sparkles size={12} /> Proyección Mensual
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Base {salesCount} ventas
              </span>
            </div>

            <div className="simulator-kpi-main">
              <div className="simulator-kpi-title">Tus Ganancias Comerciales</div>
              <div className="simulator-kpi-amount">
                {formatCurrency(totalCommercialEarnings)}
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>
                Transferidas 100% íntegras a tu cuenta.
              </p>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.06)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Facturación Total</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                {formatCurrency(totalSalesVolume)}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Neto Empresa</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0' }}>
                {formatCurrency(totalCompanyNet)}
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} color="#34d399" />
            <span>Condiciones protegidas por contrato digital inmutable.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionSimulator;
