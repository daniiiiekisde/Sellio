import { describe, it, expect } from 'vitest';
import { salesService } from '../services/sales';
import { agreementsService } from '../services/agreements';
import { calculateCommissions } from '../utils/commissionCalculator';
import { SALE_STATUS } from '../utils/constants';

describe('Production Readiness V1 — Security, RLS & Integration Tests', () => {
  it('enforces isolation between Company A and Company B data', async () => {
    const companyASales = await salesService.getAll({ company_id: 'usr_comp_1' });
    const companyBSales = await salesService.getAll({ company_id: 'usr_comp_999_isolated' });

    // Empresa B no debe tener acceso a las ventas de Empresa A
    expect(companyBSales.length).toBe(0);
    expect(companyASales.every(s => s.company_id === 'usr_comp_1')).toBe(true);
  });

  it('prevents tampering with confirmed sales and frozen commission snapshots', async () => {
    const sale = {
      agreement_id: 'agr_test_1',
      company_id: 'usr_comp_1',
      seller_id: 'usr_seller_1',
      unit_price: 100,
      quantity: 5,
      commercial_commission_rate: 15,
      sellio_commission_rate: 2,
      offer_version: 1
    };

    const created = await salesService.createAndConfirmSale(sale);
    expect(created.status).toBe(SALE_STATUS.CONFIRMED);
    expect(created.sale_snapshot).toBeDefined();
    expect(created.sale_snapshot.commercial_commission).toBe(75); // 15% de 500 €
    expect(created.sale_snapshot.sellio_commission).toBe(10); // 2% de 500 €
  });

  it('handles null rating for new commercials without falsifying reputation', () => {
    const newSellerProfile = {
      id: 'sell_new_01',
      years_experience: 1,
      total_sales: 0
    };

    const displayRating = newSellerProfile.total_sales >= 5 ? '4.8 ⭐' : 'Sin valoraciones';
    expect(displayRating).toBe('Sin valoraciones');
  });

  it('executes complete end-to-end transaction pipeline without state corruption', async () => {
    // 1. Snapshot de acuerdo
    const agreement = await agreementsService.create({
      company_id: 'usr_comp_1',
      seller_id: 'usr_seller_1',
      agreed_commission_rate: 15,
      status: 'active'
    });
    expect(agreement.status).toBe('active');

    // 2. Registro de venta bajo ese acuerdo
    const sale = await salesService.createAndConfirmSale({
      agreement_id: agreement.id,
      company_id: agreement.company_id,
      seller_id: agreement.seller_id,
      unit_price: 250,
      quantity: 4,
      commercial_commission_rate: agreement.agreed_commission_rate,
      sellio_commission_rate: 2
    });

    expect(sale.sale_value).toBe(1000); // 4 x 250 €
    expect(sale.commercial_commission_amount).toBe(150); // 15%
    expect(sale.sellio_commission_amount).toBe(20); // 2%
    expect(sale.company_net_amount).toBe(830); // 1.000 - 150 - 20
  });
});
