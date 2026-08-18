/**
 * Reusable data formatters
 */

export const formatCurrency = (amount, currency = 'EUR', locale = 'es-ES') => {
  if (amount === undefined || amount === null || isNaN(amount)) return '0,00 €';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount);
};

export const formatDate = (date, locale = 'es-ES', options = {}) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  const defaultOptions = { year: 'numeric', month: 'short', day: 'numeric', ...options };
  return new Intl.DateTimeFormat(locale, defaultOptions).format(d);
};

export const formatPercentage = (rate, locale = 'es-ES') => {
  if (rate === undefined || rate === null || isNaN(rate)) return '0%';
  return `${rate}%`;
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};
