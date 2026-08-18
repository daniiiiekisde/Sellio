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
