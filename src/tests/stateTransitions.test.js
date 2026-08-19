import { describe, it, expect } from 'vitest';
import {
  validateStateTransition,
  getNextAllowedStates
} from '../utils/stateTransitions';
import {
  OPPORTUNITY_STATUS,
  REQUEST_STATUS,
  AGREEMENT_STATUS,
  SALE_STATUS,
  COMMISSION_STATUS
} from '../utils/constants';

describe('State Transitions & State Machine Tests', () => {
  describe('Ventas (Sales Transitions)', () => {
    it('Permite transición válida: pending -> confirmed', () => {
      const result = validateStateTransition('sale', SALE_STATUS.PENDING, SALE_STATUS.CONFIRMED);
      expect(result.isValid).toBe(true);
    });

    it('Permite transición válida: confirmed -> completed', () => {
      const result = validateStateTransition('sale', SALE_STATUS.CONFIRMED, SALE_STATUS.COMPLETED);
      expect(result.isValid).toBe(true);
    });

    it('Bloquea salto ilegal: pending -> completed directo', () => {
      const result = validateStateTransition('sale', SALE_STATUS.PENDING, SALE_STATUS.COMPLETED);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Transición no permitida');
    });

    it('Bloquea modificación desde un estado terminal (cancelled)', () => {
      const result = validateStateTransition('sale', SALE_STATUS.CANCELLED, SALE_STATUS.CONFIRMED);
      expect(result.isValid).toBe(false);
    });
  });

  describe('Comisiones (Commission Transitions)', () => {
    it('Permite flujo normal: pending -> approved -> paid', () => {
      const step1 = validateStateTransition('commission', COMMISSION_STATUS.PENDING, COMMISSION_STATUS.APPROVED);
      expect(step1.isValid).toBe(true);

      const step2 = validateStateTransition('commission', COMMISSION_STATUS.APPROVED, COMMISSION_STATUS.PAID);
      expect(step2.isValid).toBe(true);
    });

    it('Bloquea salto directo: pending -> paid sin aprobación previa', () => {
      const result = validateStateTransition('commission', COMMISSION_STATUS.PENDING, COMMISSION_STATUS.PAID);
      expect(result.isValid).toBe(false);
    });
  });

  describe('Acuerdos (Agreements)', () => {
    it('Permite flujo: draft -> pending_signature -> active', () => {
      const step1 = validateStateTransition('agreement', AGREEMENT_STATUS.DRAFT, AGREEMENT_STATUS.PENDING_SIGNATURE);
      expect(step1.isValid).toBe(true);

      const step2 = validateStateTransition('agreement', AGREEMENT_STATUS.PENDING_SIGNATURE, AGREEMENT_STATUS.ACTIVE);
      expect(step2.isValid).toBe(true);
    });

    it('Bloquea salto: draft -> active sin firma previa', () => {
      const result = validateStateTransition('agreement', AGREEMENT_STATUS.DRAFT, AGREEMENT_STATUS.ACTIVE);
      expect(result.isValid).toBe(false);
    });
  });

  describe('Utilidades de consulta', () => {
    it('Retorna lista correcta de siguientes estados permitidos', () => {
      const nextStates = getNextAllowedStates('opportunity', OPPORTUNITY_STATUS.ACTIVE);
      expect(nextStates).toContain(OPPORTUNITY_STATUS.PAUSED);
      expect(nextStates).toContain(OPPORTUNITY_STATUS.CLOSED);
      expect(nextStates).toContain(OPPORTUNITY_STATUS.ARCHIVED);
    });

    it('Maneja entidades inexistentes de forma segura', () => {
      const result = validateStateTransition('non_existent_entity', 'status1', 'status2');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Entidad desconocida');
    });
  });
});
