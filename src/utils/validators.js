/**
 * SELLIO — Validaciones y Esquemas Centralizados
 * 
 * Regla: La validación debe existir antes de crear, actualizar, publicar o confirmar.
 */

import { isValidCommissionConfig, SELLIO_MAX_COMMISSION_RATE } from './commissionCalculator';

export const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).trim());
};

export const isValidPassword = (password) => {
  if (!password) return false;
  return password.length >= 8;
};

export const isNotEmpty = (value) => {
  if (value === null || value === undefined) return false;
  return String(value).trim().length > 0;
};

export const isValidPhone = (phone) => {
  if (!phone) return false;
  const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
  return phoneRegex.test(String(phone).trim()) && phone.replace(/\D/g, '').length >= 9;
};

export const isValidCifNieDni = (identifier) => {
  if (!identifier) return false;
  const cleaned = String(identifier).trim().toUpperCase();
  return /^[0-9XYZKLM][0-9]{7}[A-Z0-9]$|^[ABCDEFGHJNPQRSUVW][0-9]{7}[0-9A-J]$/.test(cleaned);
};

/**
 * Validador de Perfil de Empresa
 */
export const validateCompanyProfile = (data = {}) => {
  const errors = {};
  if (!isNotEmpty(data.company_name)) errors.company_name = 'El nombre de la empresa es obligatorio.';
  if (data.cif && !isValidCifNieDni(data.cif)) errors.cif = 'El CIF proporcionado no tiene un formato válido.';
  if (data.email && !isValidEmail(data.email)) errors.email = 'El email de contacto no es válido.';
  if (data.phone && !isValidPhone(data.phone)) errors.phone = 'El teléfono no es válido (mínimo 9 dígitos).';

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validador de Perfil de Comercial
 */
export const validateSellerProfile = (data = {}) => {
  const errors = {};
  if (!isNotEmpty(data.first_name)) errors.first_name = 'El nombre es obligatorio.';
  if (data.email && !isValidEmail(data.email)) errors.email = 'El email no es válido.';
  if (data.phone && !isValidPhone(data.phone)) errors.phone = 'El teléfono no es válido.';
  if (data.dni_nie && !isValidCifNieDni(data.dni_nie)) errors.dni_nie = 'El DNI/NIE no tiene un formato válido.';

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validador de Producto
 */
export const validateProduct = (data = {}) => {
  const errors = {};
  if (!isNotEmpty(data.name)) errors.name = 'El nombre del producto es obligatorio.';
  if (data.base_price === undefined || data.base_price === null || Number(data.base_price) <= 0) {
    errors.base_price = 'El precio base del producto debe ser mayor que 0 €.';
  }
  if (!isNotEmpty(data.sector)) errors.sector = 'El sector de actividad es obligatorio.';

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validador de Oportunidad
 */
export const validateOpportunity = (data = {}) => {
  const errors = {};
  if (!isNotEmpty(data.title)) errors.title = 'El título de la oportunidad es obligatorio.';
  if (!isNotEmpty(data.product_id) && !isNotEmpty(data.product_name)) {
    errors.product = 'Debe seleccionarse o asociarse un producto a la oportunidad.';
  }
  
  // Validar esquema económico
  if (data.commission_rate !== undefined) {
    const rate = Number(data.commission_rate);
    if (isNaN(rate) || rate <= 0 || rate > 100) {
      errors.commission_rate = 'La comisión comercial debe situarse entre 0.1% y 100%.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validador de Acuerdo (Agreement)
 */
export const validateAgreement = (data = {}) => {
  const errors = {};
  if (!isNotEmpty(data.company_id)) errors.company_id = 'La empresa es obligatoria.';
  if (!isNotEmpty(data.seller_id)) errors.seller_id = 'El comercial es obligatorio.';
  if (!isNotEmpty(data.opportunity_id)) errors.opportunity_id = 'La oportunidad vinculada es obligatoria.';
  if (data.commission_rate === undefined || Number(data.commission_rate) <= 0) {
    errors.commission_rate = 'La tasa de comisión pactada debe ser mayor a 0%.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validador de Venta (Sale)
 */
export const validateSale = (data = {}) => {
  const errors = {};
  if (!isNotEmpty(data.seller_id)) errors.seller_id = 'El comercial emisor es obligatorio.';
  if (!isNotEmpty(data.company_id)) errors.company_id = 'La empresa destinataria es obligatoria.';
  if (data.sale_value === undefined || Number(data.sale_value) <= 0) {
    errors.sale_value = 'El importe total de la venta debe ser mayor a 0 €.';
  }
  if (data.units_sold !== undefined && Number(data.units_sold) <= 0) {
    errors.units_sold = 'El número de unidades vendidas debe ser al menos 1.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validador de Transacción de Comisión
 */
export const validateCommission = (data = {}) => {
  const errors = {};
  if (!isNotEmpty(data.sale_id) && !isNotEmpty(data.deal_id)) {
    errors.sale_id = 'La comisión debe estar vinculada a una venta o acuerdo.';
  }
  if (data.commercial_amount === undefined || Number(data.commercial_amount) < 0) {
    errors.commercial_amount = 'El importe de comisión comercial no puede ser negativo.';
  }
  if (data.sellio_rate !== undefined && Number(data.sellio_rate) > SELLIO_MAX_COMMISSION_RATE) {
    errors.sellio_rate = `La comisión de Sellio no puede superar el límite estricto del ${SELLIO_MAX_COMMISSION_RATE}%.`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
