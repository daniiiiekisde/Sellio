import { describe, it, expect } from 'vitest';
import {
  validateCompanyProfile,
  validateSellerProfile,
  validateProduct,
  validateOpportunity,
  validateSale,
  validateCommission,
  isValidEmail,
  isValidPassword,
  isValidPhone,
  isValidCifNieDni
} from '../utils/validators';

describe('Entity Validators and Schemas Tests', () => {
  describe('Formatos básicos', () => {
    it('Valida emails correctamente', () => {
      expect(isValidEmail('test@sellio.com')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });

    it('Valida contraseña mínima', () => {
      expect(isValidPassword('Password123')).toBe(true);
      expect(isValidPassword('short')).toBe(false);
    });

    it('Valida teléfonos españoles/internacionales', () => {
      expect(isValidPhone('+34 612 345 678')).toBe(true);
      expect(isValidPhone('912345678')).toBe(true);
      expect(isValidPhone('123')).toBe(false);
    });

    it('Valida CIF / NIF / NIE', () => {
      expect(isValidCifNieDni('B12345678')).toBe(true);
      expect(isValidCifNieDni('12345678Z')).toBe(true);
      expect(isValidCifNieDni('X1234567A')).toBe(true);
      expect(isValidCifNieDni('INVALID')).toBe(false);
    });
  });

  describe('Esquemas de Entidad', () => {
    it('Valida perfil de empresa correcto', () => {
      const valid = validateCompanyProfile({
        company_name: 'Tech Solutions SL',
        cif: 'B12345678',
        email: 'info@techsolutions.es',
        phone: '912345678'
      });
      expect(valid.isValid).toBe(true);
    });

    it('Detecta empresa incompleta o con CIF inválido', () => {
      const invalid = validateCompanyProfile({
        company_name: '',
        cif: '123'
      });
      expect(invalid.isValid).toBe(false);
      expect(invalid.errors.company_name).toBeDefined();
      expect(invalid.errors.cif).toBeDefined();
    });

    it('Valida producto con precio positivo', () => {
      const valid = validateProduct({
        name: 'Aceite de Oliva Premium',
        base_price: 15.50,
        sector: 'Alimentación'
      });
      expect(valid.isValid).toBe(true);

      const invalid = validateProduct({
        name: 'Producto Gratis',
        base_price: -10,
        sector: 'Alimentación'
      });
      expect(invalid.isValid).toBe(false);
      expect(invalid.errors.base_price).toBeDefined();
    });

    it('Valida oportunidad comercial', () => {
      const valid = validateOpportunity({
        title: 'Buscamos comerciales para HORECA',
        product_name: 'Café de Especialidad',
        commission_rate: 15
      });
      expect(valid.isValid).toBe(true);

      const invalid = validateOpportunity({
        title: '',
        commission_rate: 120 // Imposible > 100%
      });
      expect(invalid.isValid).toBe(false);
      expect(invalid.errors.title).toBeDefined();
      expect(invalid.errors.commission_rate).toBeDefined();
    });

    it('Valida venta económica', () => {
      const valid = validateSale({
        seller_id: 'usr_s1',
        company_id: 'usr_c1',
        sale_value: 500,
        units_sold: 5
      });
      expect(valid.isValid).toBe(true);

      const invalid = validateSale({
        seller_id: '',
        company_id: '',
        sale_value: 0
      });
      expect(invalid.isValid).toBe(false);
    });

    it('Valida límites en transacciones de comisión', () => {
      const valid = validateCommission({
        sale_id: 'sale_1',
        commercial_amount: 50,
        sellio_rate: 2
      });
      expect(valid.isValid).toBe(true);

      const invalidSellio = validateCommission({
        sale_id: 'sale_1',
        commercial_amount: 50,
        sellio_rate: 8 // Supera el 5% máximo
      });
      expect(invalidSellio.isValid).toBe(false);
      expect(invalidSellio.errors.sellio_rate).toContain('5%');
    });
  });
});
