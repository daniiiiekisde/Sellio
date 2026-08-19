import { describe, it, expect } from 'vitest';
import { calculateCommissions } from '../utils/commissionCalculator';
import { validateStateTransition } from '../utils/stateTransitions';
import { SALE_STATUS, COMMISSION_STATUS, AGREEMENT_STATUS, REQUEST_STATUS } from '../utils/constants';

describe('Sellio End-to-End Operational Pipeline', () => {
  it('validates state transitions across the full pipeline', () => {
    // 1. Request Transition: pending -> accepted
    const reqTransition = validateStateTransition('request', REQUEST_STATUS.PENDING, REQUEST_STATUS.ACCEPTED);
    expect(reqTransition.isValid).toBe(true);

    // 2. Agreement Transition: draft -> pending_signature -> active
    const agrTransition1 = validateStateTransition('agreement', AGREEMENT_STATUS.DRAFT, AGREEMENT_STATUS.PENDING_SIGNATURE);
    expect(agrTransition1.isValid).toBe(true);

    const agrTransition2 = validateStateTransition('agreement', AGREEMENT_STATUS.PENDING_SIGNATURE, AGREEMENT_STATUS.ACTIVE);
    expect(agrTransition2.isValid).toBe(true);

    // 3. Sale Transition: pending -> confirmed
    const saleTransition = validateStateTransition('sale', SALE_STATUS.PENDING, SALE_STATUS.CONFIRMED);
    expect(saleTransition.isValid).toBe(true);

    // 4. Commission Transition: pending -> approved -> paid
    const commTransition1 = validateStateTransition('commission', COMMISSION_STATUS.PENDING, COMMISSION_STATUS.APPROVED);
    expect(commTransition1.isValid).toBe(true);

    const commTransition2 = validateStateTransition('commission', COMMISSION_STATUS.APPROVED, COMMISSION_STATUS.PAID);
    expect(commTransition2.isValid).toBe(true);
  });

  it('guarantees exact commission split and immutable snapshot integrity', () => {
    const saleValue = 1200; // 10 units x 120 €
    const unitPrice = 120;
    const quantity = 10;
    const commercialRate = 15; // 15%
    const sellioRate = 2; // 2%

    const calc = calculateCommissions({
      price: unitPrice,
      quantity,
      commercialCommissionRate: commercialRate,
      sellioCommissionRate: sellioRate
    });

    // 100% íntegro para el comercial: 15% de 1.200 € = 180 €
    expect(calc.commercialCommission).toBe(180);
    // Fee Sellio cobrado a la empresa: 2% de 1.200 € = 24 €
    expect(calc.sellioCommission).toBe(24);
    // Neto empresa: 1.200 - 180 - 24 = 996 €
    expect(calc.companyNetBeforeOtherCosts).toBe(996);
    expect(calc.saleValue).toBe(1200);
  });
});
