/**
 * SELLIO — Máquina de Estados y Transiciones Centralizada
 * 
 * Regla: No permitir saltos arbitrarios o ilegales entre estados.
 * Todas las transiciones de estado de negocio deben ser validadas.
 */

import {
  OPPORTUNITY_STATUS,
  REQUEST_STATUS,
  CONTACT_STATUS,
  AGREEMENT_STATUS,
  SALE_STATUS,
  COMMISSION_STATUS,
  DISPUTE_STATUS,
  VERIFICATION_STATUS
} from './constants';

/**
 * Matriz de transiciones permitidas por entidad
 */
export const STATE_TRANSITIONS = {
  opportunity: {
    [OPPORTUNITY_STATUS.DRAFT]: [OPPORTUNITY_STATUS.ACTIVE, OPPORTUNITY_STATUS.ARCHIVED],
    [OPPORTUNITY_STATUS.ACTIVE]: [OPPORTUNITY_STATUS.PAUSED, OPPORTUNITY_STATUS.CLOSED, OPPORTUNITY_STATUS.ARCHIVED],
    [OPPORTUNITY_STATUS.PAUSED]: [OPPORTUNITY_STATUS.ACTIVE, OPPORTUNITY_STATUS.CLOSED, OPPORTUNITY_STATUS.ARCHIVED],
    [OPPORTUNITY_STATUS.CLOSED]: [OPPORTUNITY_STATUS.ARCHIVED],
    [OPPORTUNITY_STATUS.ARCHIVED]: []
  },

  request: {
    [REQUEST_STATUS.PENDING]: [REQUEST_STATUS.ACCEPTED, REQUEST_STATUS.REJECTED, REQUEST_STATUS.EXPIRED, REQUEST_STATUS.CANCELLED],
    [REQUEST_STATUS.ACCEPTED]: [],
    [REQUEST_STATUS.REJECTED]: [],
    [REQUEST_STATUS.EXPIRED]: [],
    [REQUEST_STATUS.CANCELLED]: []
  },

  contact: {
    [CONTACT_STATUS.INITIATED]: [CONTACT_STATUS.ACTIVE, CONTACT_STATUS.CLOSED, CONTACT_STATUS.BLOCKED],
    [CONTACT_STATUS.ACTIVE]: [CONTACT_STATUS.REVEALED, CONTACT_STATUS.CLOSED, CONTACT_STATUS.BLOCKED],
    [CONTACT_STATUS.REVEALED]: [CONTACT_STATUS.CLOSED, CONTACT_STATUS.BLOCKED],
    [CONTACT_STATUS.BLOCKED]: [CONTACT_STATUS.ACTIVE],
    [CONTACT_STATUS.CLOSED]: []
  },

  agreement: {
    [AGREEMENT_STATUS.DRAFT]: [AGREEMENT_STATUS.PENDING_SIGNATURE, AGREEMENT_STATUS.TERMINATED],
    [AGREEMENT_STATUS.PENDING_SIGNATURE]: [AGREEMENT_STATUS.ACTIVE, AGREEMENT_STATUS.TERMINATED],
    [AGREEMENT_STATUS.ACTIVE]: [AGREEMENT_STATUS.COMPLETED, AGREEMENT_STATUS.TERMINATED, AGREEMENT_STATUS.DISPUTED],
    [AGREEMENT_STATUS.DISPUTED]: [AGREEMENT_STATUS.ACTIVE, AGREEMENT_STATUS.TERMINATED],
    [AGREEMENT_STATUS.COMPLETED]: [],
    [AGREEMENT_STATUS.TERMINATED]: []
  },

  sale: {
    [SALE_STATUS.PENDING]: [SALE_STATUS.CONFIRMED, SALE_STATUS.CANCELLED],
    [SALE_STATUS.CONFIRMED]: [SALE_STATUS.COMPLETED, SALE_STATUS.REFUNDED, SALE_STATUS.DISPUTED],
    [SALE_STATUS.COMPLETED]: [SALE_STATUS.REFUNDED, SALE_STATUS.DISPUTED],
    [SALE_STATUS.DISPUTED]: [SALE_STATUS.COMPLETED, SALE_STATUS.REFUNDED, SALE_STATUS.CANCELLED],
    [SALE_STATUS.CANCELLED]: [],
    [SALE_STATUS.REFUNDED]: []
  },

  commission: {
    [COMMISSION_STATUS.PENDING]: [COMMISSION_STATUS.APPROVED, COMMISSION_STATUS.CANCELLED, COMMISSION_STATUS.DISPUTED],
    [COMMISSION_STATUS.APPROVED]: [COMMISSION_STATUS.PAID, COMMISSION_STATUS.CANCELLED, COMMISSION_STATUS.DISPUTED],
    [COMMISSION_STATUS.PAID]: [COMMISSION_STATUS.REFUNDED, COMMISSION_STATUS.DISPUTED],
    [COMMISSION_STATUS.DISPUTED]: [COMMISSION_STATUS.APPROVED, COMMISSION_STATUS.PAID, COMMISSION_STATUS.REFUNDED, COMMISSION_STATUS.CANCELLED],
    [COMMISSION_STATUS.CANCELLED]: [],
    [COMMISSION_STATUS.REFUNDED]: []
  },

  dispute: {
    [DISPUTE_STATUS.OPENED]: [DISPUTE_STATUS.UNDER_REVIEW, DISPUTE_STATUS.RESOLVED, DISPUTE_STATUS.REJECTED],
    [DISPUTE_STATUS.UNDER_REVIEW]: [DISPUTE_STATUS.RESOLVED, DISPUTE_STATUS.REJECTED],
    [DISPUTE_STATUS.RESOLVED]: [],
    [DISPUTE_STATUS.REJECTED]: []
  },

  verification: {
    [VERIFICATION_STATUS.UNVERIFIED]: [VERIFICATION_STATUS.PENDING],
    [VERIFICATION_STATUS.PENDING]: [VERIFICATION_STATUS.VERIFIED, VERIFICATION_STATUS.REJECTED],
    [VERIFICATION_STATUS.REJECTED]: [VERIFICATION_STATUS.PENDING],
    [VERIFICATION_STATUS.VERIFIED]: [VERIFICATION_STATUS.PENDING] // Re-verificación
  }
};

/**
 * Valida si una transición de estado es legal para una entidad
 * 
 * @param {string} entity - Tipo de entidad ('sale', 'commission', 'agreement', 'opportunity', etc.)
 * @param {string} currentStatus - Estado actual
 * @param {string} targetStatus - Estado destino solicitado
 * @returns {{ isValid: boolean, error?: string }}
 */
export const validateStateTransition = (entity, currentStatus, targetStatus) => {
  if (!entity || !STATE_TRANSITIONS[entity]) {
    return {
      isValid: false,
      error: `Entidad desconocida para máquina de estados: "${entity}".`
    };
  }

  if (currentStatus === targetStatus) {
    return { isValid: true };
  }

  const allowedTransitions = STATE_TRANSITIONS[entity][currentStatus];

  if (!allowedTransitions) {
    return {
      isValid: false,
      error: `Estado actual no reconocido "${currentStatus}" para la entidad "${entity}".`
    };
  }

  if (!allowedTransitions.includes(targetStatus)) {
    return {
      isValid: false,
      error: `Transición no permitida de "${currentStatus}" a "${targetStatus}" en ${entity}. Transiciones válidas: [${allowedTransitions.join(', ')}].`
    };
  }

  return { isValid: true };
};

/**
 * Obtiene los estados siguientes permitidos desde el estado actual
 */
export const getNextAllowedStates = (entity, currentStatus) => {
  if (!entity || !STATE_TRANSITIONS[entity]) return [];
  return STATE_TRANSITIONS[entity][currentStatus] || [];
};
