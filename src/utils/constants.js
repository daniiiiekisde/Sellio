/**
 * Global Constants for Sellio Platform
 */

export const USER_ROLES = {
  COMPANY: 'company',
  SELLER: 'seller',
  ADMIN: 'admin'
};

export const USER_ROLE_LABELS = {
  [USER_ROLES.COMPANY]: 'Empresa / Fabricante',
  [USER_ROLES.SELLER]: 'Comercial / Agente',
  [USER_ROLES.ADMIN]: 'Administrador'
};

export const SECTORS = [
  'Alimentación y Bebidas (HORECA)',
  'Tecnología y Software',
  'Moda y Textil',
  'Salud y Farmacia',
  'Construcción y Reformas',
  'Industria y Maquinaria',
  'Automoción',
  'Servicios Financieros y Seguros',
  'Energías Renovables',
  'Bienes de Consumo'
];

export const REGIONS = [
  'Cataluña',
  'Comunidad de Madrid',
  'Andalucía',
  'Comunidad Valenciana',
  'País Vasco',
  'Galicia',
  'Castilla y León',
  'Canarias',
  'Baleares',
  'Internacional / Remoto'
];

export const COMMISSION_TYPES = {
  PERCENTAGE: 'Porcentaje por venta',
  FIXED_PLUS_COMMISSION: 'Fijo + Comisión',
  TIERED: 'Comisión escalada por volumen',
  RECURRING: 'Comisión recurrente'
};

/**
 * Estados centralizados del dominio de Sellio
 */
export const OPPORTUNITY_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PAUSED: 'paused',
  CLOSED: 'closed',
  ARCHIVED: 'archived'
};

export const REQUEST_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled'
};

export const CONTACT_STATUS = {
  INITIATED: 'initiated',
  ACTIVE: 'active',
  REVEALED: 'revealed',
  BLOCKED: 'blocked',
  CLOSED: 'closed'
};

export const AGREEMENT_STATUS = {
  DRAFT: 'draft',
  PENDING_SIGNATURE: 'pending_signature',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  TERMINATED: 'terminated',
  DISPUTED: 'disputed'
};

export const SALE_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
  DISPUTED: 'disputed'
};

export const COMMISSION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  PAID: 'paid',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
  DISPUTED: 'disputed'
};

export const DISPUTE_STATUS = {
  OPENED: 'opened',
  UNDER_REVIEW: 'under_review',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
};

export const VERIFICATION_STATUS = {
  UNVERIFIED: 'unverified',
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected'
};
