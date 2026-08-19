import { describe, it, expect } from 'vitest';
import {
  calculateCommissions,
  validateCommissionConfig,
  determineTierRate,
  roundCurrency,
  SELLIO_MAX_COMMISSION_RATE
} from '../utils/commissionCalculator';

describe('Commission Calculator & Engine — Architecture V1 Tests', () => {
  it('Caso base esperado: Venta 100 €, Comercial 15 %, Sellio 2 %', () => {
    const result = calculateCommissions({
      price: 100,
      quantity: 1,
      commercialCommissionRate: 15,
      sellioCommissionRate: 2
    });

    expect(result.saleValue).toBe(100);
    expect(result.commercialCommission).toBe(15);
    expect(result.commercialRateApplied).toBe(15);
    expect(result.sellioCommission).toBe(2);
    expect(result.sellioRateApplied).toBe(2);
    expect(result.companyNetBeforeOtherCosts).toBe(83);
    expect(result.isCapped).toBe(false);
  });

  it('Límite estricto de Sellio: 100 € × 7 % Sellio debe topar en 5 %', () => {
    const result = calculateCommissions({
      price: 100,
      quantity: 1,
      commercialCommissionRate: 10,
      sellioCommissionRate: 7
    });

    expect(result.sellioRateApplied).toBe(SELLIO_MAX_COMMISSION_RATE);
    expect(result.sellioCommission).toBe(5);
    expect(result.isCapped).toBe(true);
    expect(result.commercialCommission).toBe(10);
    expect(result.companyNetBeforeOtherCosts).toBe(85);
  });

  it('Límite exacto de Sellio: 100 € × 5 % Sellio', () => {
    const result = calculateCommissions({
      price: 100,
      quantity: 1,
      commercialCommissionRate: 10,
      sellioCommissionRate: 5
    });

    expect(result.sellioRateApplied).toBe(5);
    expect(result.sellioCommission).toBe(5);
    expect(result.isCapped).toBe(false);
  });

  it('Valores extremos: 0 €', () => {
    const result = calculateCommissions({
      price: 0,
      quantity: 1,
      commercialCommissionRate: 15,
      sellioCommissionRate: 2
    });

    expect(result.saleValue).toBe(0);
    expect(result.commercialCommission).toBe(0);
    expect(result.sellioCommission).toBe(0);
    expect(result.companyNetBeforeOtherCosts).toBe(0);
  });

  it('Valores pequeños: 1 € con redondeo', () => {
    const result = calculateCommissions({
      price: 1,
      quantity: 1,
      commercialCommissionRate: 15,
      sellioCommissionRate: 2
    });

    expect(result.saleValue).toBe(1);
    expect(result.commercialCommission).toBe(0.15);
    expect(result.sellioCommission).toBe(0.02);
    expect(result.companyNetBeforeOtherCosts).toBe(0.83);
  });

  it('Valores grandes: 10.000 €', () => {
    const result = calculateCommissions({
      price: 10000,
      quantity: 1,
      commercialCommissionRate: 12.5,
      sellioCommissionRate: 2
    });

    expect(result.saleValue).toBe(10000);
    expect(result.commercialCommission).toBe(1250);
    expect(result.sellioCommission).toBe(200);
    expect(result.companyNetBeforeOtherCosts).toBe(8550);
  });

  it('Comisión fija por unidad', () => {
    const result = calculateCommissions({
      price: 50,
      quantity: 3,
      commercialCommissionType: 'fixed_amount',
      commercialCommissionAmount: 10,
      sellioCommissionRate: 2
    });

    expect(result.saleValue).toBe(150);
    expect(result.commercialCommission).toBe(30); // 3 uds * 10€
    expect(result.sellioCommission).toBe(3); // 2% de 150€
    expect(result.companyNetBeforeOtherCosts).toBe(117);
  });

  it('Modelo escalonado por volumen (Tiered)', () => {
    // 0 - 5.000 -> 3%
    // 5.001 - 15.000 -> 2.5%
    // +50.000 -> 1.0%
    const rateTier1 = determineTierRate(2000);
    expect(rateTier1).toBe(3.0);

    const rateTier2 = determineTierRate(10000);
    expect(rateTier2).toBe(2.5);

    const rateTierHigh = determineTierRate(60000);
    expect(rateTierHigh).toBe(1.0);

    const result = calculateCommissions({
      price: 500,
      quantity: 20,
      sellioCommissionModel: 'volume_tiered',
      monthlyVolume: 60000,
      commercialCommissionRate: 10
    });

    expect(result.saleValue).toBe(10000);
    expect(result.sellioRateApplied).toBe(1.0);
    expect(result.sellioCommission).toBe(100);
  });

  it('Validación de configuración de comisiones', () => {
    const valid = validateCommissionConfig({
      commercialRate: 15,
      sellioRate: 2
    });
    expect(valid.isValid).toBe(true);
    expect(valid.errors.length).toBe(0);

    const invalidSellio = validateCommissionConfig({
      commercialRate: 15,
      sellioRate: 8 // Excede 5%
    });
    expect(invalidSellio.isValid).toBe(false);
    expect(invalidSellio.errors[0]).toContain('5%');

    const invalidCommercial = validateCommissionConfig({
      commercialRate: 150 // Excede 100%
    });
    expect(invalidCommercial.isValid).toBe(false);
  });

  it('Redondeo seguro roundCurrency', () => {
    expect(roundCurrency(10.005)).toBe(10.01);
    expect(roundCurrency(10.004)).toBe(10);
    expect(roundCurrency('invalid')).toBe(0);
  });
});
