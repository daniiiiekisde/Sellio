/**
 * Reusable validation functions
 */

export const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).trim());
};

export const isValidPassword = (password) => {
  // Minimum 8 chars, at least one letter and one number
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
