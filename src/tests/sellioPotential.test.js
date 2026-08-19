import { describe, it, expect } from 'vitest';
import { calculateSellioPotential } from '../utils/sellioPotential';

describe('Sellio Potential Engine', () => {
  it('calculates custom sales potential for percentage commission', () => {
    const result = calculateSellioPotential({
      price: 100,
      commissionRate: 15,
      commissionType: 'percentage',
      customSalesCount: 20
    });

    expect(result.unitCommission).toBe(15);
    expect(result.customSalesCount).toBe(20);
    expect(result.customTotal).toBe(300);
  });

  it('generates accurate standard tier presets (10, 25, 50, 100 sales)', () => {
    const result = calculateSellioPotential({
      price: 200,
      commissionRate: 10,
      commissionType: 'percentage',
      customSalesCount: 10
    });

    expect(result.unitCommission).toBe(20);
    expect(result.tiers).toEqual([
      { sales: 10, total: 200, label: '10 ventas' },
      { sales: 25, total: 500, label: '25 ventas' },
      { sales: 50, total: 1000, label: '50 ventas' },
      { sales: 100, total: 2000, label: '100 ventas' }
    ]);
  });

  it('supports fixed amount commissions', () => {
    const result = calculateSellioPotential({
      price: 500,
      commissionAmount: 50,
      commissionType: 'fixed',
      customSalesCount: 10
    });

    expect(result.unitCommission).toBe(50);
    expect(result.customTotal).toBe(500);
  });
});
