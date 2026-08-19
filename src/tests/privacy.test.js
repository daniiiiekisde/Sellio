import { describe, it, expect } from 'vitest';
import {
  generateAnonymousHandle,
  maskEmail,
  maskPhone,
  formatSellerDisplay
} from '../utils/privacy';

describe('Privacy and Identity Protection Tests', () => {
  it('Genera handles consistentes y anónimos a partir del id', () => {
    const handle1 = generateAnonymousHandle('usr_seller_1');
    const handle2 = generateAnonymousHandle('usr_seller_1');
    expect(handle1).toBe(handle2);
    expect(handle1).toMatch(/^Comercial #[0-9A-F]+$/);
  });

  it('Oculta emails de forma segura', () => {
    expect(maskEmail('carlos.mendoza@example.com')).toBe('ca***@example.com');
    expect(maskEmail('invalid')).toBe('***@***.***');
    expect(maskEmail('')).toBe('***@***.***');
  });

  it('Oculta teléfonos privados', () => {
    const masked = maskPhone('+34 612 345 678');
    expect(masked).toContain('***');
    expect(masked.startsWith('+34')).toBe(true);
    expect(masked.endsWith('78')).toBe(true);
  });

  it('Formatea la visualización del comercial respetando el estado de revelación', () => {
    const seller = {
      id: 'usr_seller_123',
      first_name: 'Carlos',
      last_name: 'Mendoza',
      handle: 'Comercial #B194'
    };

    // Cuando no está revelado
    const anonymous = formatSellerDisplay(seller, false);
    expect(anonymous).toBe('Comercial #B194');

    // Cuando está revelado
    const revealed = formatSellerDisplay(seller, true);
    expect(revealed).toBe('Carlos Mendoza');
  });
});
