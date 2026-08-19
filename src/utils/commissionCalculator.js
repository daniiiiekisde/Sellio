/**
 * SELLIO — Utilidad Central de Cálculo de Comisiones
 * 
 * Reglas económicas fundamentales:
 * 1. La comisión del comercial pertenece 100% al comercial (Sellio nunca la descuenta).
 * 2. La comisión de Sellio es adicional, la abona la empresa y tiene un tope máximo funcional del 5.0%.
 * 3. Los cálculos monetarios son idénticos y consistentes en todas las pantallas.
 */

export const SELLIO_MAX_COMMISSION_RATE = 5.0; // 5% máximo

export const DEFAULT_VOLUME_TIERS = [
  { minVolume: 0, maxVolume: 5000, rate: 3.0, label: '0 – 5.000 €' },
  { minVolume: 5001, maxVolume: 15000, rate: 2.5, label: '5.001 – 15.000 €' },
  { minVolume: 15001, maxVolume: 30000, rate: 2.0, label: '15.001 – 30.000 €' },
  { minVolume: 30001, maxVolume: 50000, rate: 1.5, label: '30.001 – 50.000 €' },
  { minVolume: 50001, maxVolume: null, rate: 1.0, label: '+50.000 €' }
];

/**
 * Redondeo seguro a 2 decimales para operaciones monetarias
 */
export const roundCurrency = (value) => {
  if (typeof value !== 'number' || isNaN(value)) return 0;
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

/**
 * Extrae o normaliza un número de tasa/porcentaje
 */
export const parseRate = (rate) => {
  if (typeof rate === 'number') return rate;
  if (!rate) return 0;
  const cleaned = String(rate).replace('%', '').trim().replace(',', '.');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Determina la tasa de Sellio correspondiente según el tramo de volumen mensual
 */
export const determineTierRate = (monthlyVolume = 0, tiers = DEFAULT_VOLUME_TIERS) => {
  const vol = Math.max(0, Number(monthlyVolume) || 0);
  const activeTiers = Array.isArray(tiers) && tiers.length > 0 ? tiers : DEFAULT_VOLUME_TIERS;
  
  for (const tier of activeTiers) {
    const min = tier.minVolume || 0;
    const max = tier.maxVolume === null || tier.maxVolume === undefined ? Infinity : tier.maxVolume;
    if (vol >= min && vol <= max) {
      return Math.min(SELLIO_MAX_COMMISSION_RATE, parseRate(tier.rate));
    }
  }
  
  // Por defecto si no coincide ningún tramo
  return Math.min(SELLIO_MAX_COMMISSION_RATE, parseRate(activeTiers[0]?.rate || 2.0));
};

/**
 * Calcula el desglose completo de una oferta de producto
 * 
 * @param {Object} params
 * @param {number|string} params.price - Precio del producto (o base de venta)
 * @param {string} [params.commercialCommissionType='percentage'] - 'percentage' | 'fixed_amount'
 * @param {number|string} [params.commercialCommissionRate=15] - Porcentaje comercial (ej: 15 o '15%')
 * @param {number} [params.commercialCommissionAmount=0] - Importe fijo comercial si aplica
 * @param {string} [params.sellioCommissionModel='fixed'] - 'fixed' | 'volume_tiered'
 * @param {number|string} [params.sellioCommissionRate=2] - Porcentaje de Sellio si es fijo (máx 5%)
 * @param {number} [params.monthlyVolume=0] - Volumen mensual acumulado para modelo por tramos
 * @param {Array} [params.volumeTiers=DEFAULT_VOLUME_TIERS] - Tramos de volumen configurados
 * @param {number} [params.quantity=1] - Cantidad de unidades
 */
export const calculateCommissions = ({
  price = 0,
  commercialCommissionType = 'percentage',
  commercialCommissionRate = 15,
  commercialCommissionAmount = 0,
  sellioCommissionModel = 'fixed',
  sellioCommissionRate = 2,
  monthlyVolume = 0,
  volumeTiers = DEFAULT_VOLUME_TIERS,
  quantity = 1
} = {}) => {
  const unitPrice = Math.max(0, parseFloat(String(price).replace('€', '').replace(',', '.').trim()) || 0);
  const qty = Math.max(1, parseInt(quantity, 10) || 1);
  const saleValue = roundCurrency(unitPrice * qty);

  // 1. Cálculo Comisión Comercial
  let commercialRateApplied = 0;
  let commercialCommission = 0;

  if (commercialCommissionType === 'fixed_amount') {
    commercialCommission = roundCurrency(Math.max(0, Number(commercialCommissionAmount) || 0) * qty);
    commercialRateApplied = saleValue > 0 ? roundCurrency((commercialCommission / saleValue) * 100) : 0;
  } else {
    commercialRateApplied = parseRate(commercialCommissionRate);
    commercialCommission = roundCurrency(saleValue * (commercialRateApplied / 100));
  }

  // 2. Cálculo Comisión Sellio
  let sellioRateApplied = 0;
  if (sellioCommissionModel === 'volume_tiered') {
    sellioRateApplied = determineTierRate(monthlyVolume, volumeTiers);
  } else {
    sellioRateApplied = parseRate(sellioCommissionRate);
  }

  // Aplicar tope estricto del 5%
  const isCapped = sellioRateApplied > SELLIO_MAX_COMMISSION_RATE;
  sellioRateApplied = Math.min(SELLIO_MAX_COMMISSION_RATE, Math.max(0, sellioRateApplied));
  const sellioCommission = roundCurrency(saleValue * (sellioRateApplied / 100));

  // 3. Resultado neto para la empresa (antes de costes adicionales/impuestos)
  const companyNetBeforeOtherCosts = roundCurrency(saleValue - commercialCommission - sellioCommission);

  return {
    saleValue,
    unitPrice,
    quantity: qty,
    commercialCommission,
    commercialRateApplied,
    commercialCommissionType,
    sellioCommission,
    sellioRateApplied,
    sellioCommissionModel,
    isCapped,
    companyNetBeforeOtherCosts,
    currency: 'EUR',
    currencySymbol: '€',
    calculatedAt: new Date().toISOString()
  };
};

/**
 * Valida la configuración de comisiones antes de publicar o guardar
 */
export const validateCommissionConfig = ({
  commercialRate = 0,
  commercialAmount = 0,
  commercialType = 'percentage',
  sellioRate = 0,
  sellioModel = 'fixed',
  volumeTiers = []
}) => {
  const errors = [];

  // Validación comercial
  if (commercialType === 'percentage') {
    const rate = parseRate(commercialRate);
    if (rate <= 0) {
      errors.push('La comisión del comercial debe ser superior a 0%.');
    }
    if (rate > 100) {
      errors.push('La comisión del comercial no puede superar el 100%.');
    }
  } else {
    if (Number(commercialAmount) <= 0) {
      errors.push('El importe fijo de la comisión comercial debe ser superior a 0 €.');
    }
  }

  // Validación Sellio
  if (sellioModel === 'fixed') {
    const rate = parseRate(sellioRate);
    if (rate < 0) {
      errors.push('La comisión de Sellio no puede ser negativa.');
    }
    if (rate > SELLIO_MAX_COMMISSION_RATE) {
      errors.push(`La comisión de Sellio no puede superar el límite del ${SELLIO_MAX_COMMISSION_RATE}%.`);
    }
  } else if (sellioModel === 'volume_tiered') {
    if (!Array.isArray(volumeTiers) || volumeTiers.length === 0) {
      errors.push('Debe definirse al menos un tramo de volumen para el modelo escalonado.');
    } else {
      volumeTiers.forEach((tier, index) => {
        const rate = parseRate(tier.rate);
        if (rate > SELLIO_MAX_COMMISSION_RATE) {
          errors.push(`El tramo ${index + 1} (${tier.label || tier.minVolume}) supera el límite máximo de Sellio (${SELLIO_MAX_COMMISSION_RATE}%).`);
        }
        if (rate < 0) {
          errors.push(`El tramo ${index + 1} tiene un porcentaje negativo no permitido.`);
        }
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
