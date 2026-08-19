/**
 * SELLIO POTENTIAL ENGINE
 * 
 * Calcula proyecciones de ingresos reales para el comercial basadas en volumen de ventas.
 */

export const calculateSellioPotential = ({
  price = 100,
  commissionRate = 15,
  commissionAmount = 0,
  commissionType = 'percentage',
  customSalesCount = 20
}) => {
  const actualPrice = typeof price === 'number' ? price : (parseFloat(String(price).replace('€', '').trim()) || 0);
  
  const unitCommission = commissionType === 'percentage'
    ? actualPrice * (Number(commissionRate) / 100)
    : Number(commissionAmount);

  // Escenarios estándar
  const tiers = [
    { sales: 10, total: 10 * unitCommission, label: '10 ventas' },
    { sales: 25, total: 25 * unitCommission, label: '25 ventas' },
    { sales: 50, total: 50 * unitCommission, label: '50 ventas' },
    { sales: 100, total: 100 * unitCommission, label: '100 ventas' }
  ];

  const customTotal = customSalesCount * unitCommission;

  return {
    unitCommission: Math.round(unitCommission * 100) / 100,
    customSalesCount,
    customTotal: Math.round(customTotal * 100) / 100,
    tiers: tiers.map(t => ({ ...t, total: Math.round(t.total * 100) / 100 })),
    monthlyEstimate: Math.round(20 * unitCommission),
    annualEstimate: Math.round(240 * unitCommission)
  };
};
