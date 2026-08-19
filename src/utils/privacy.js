/**
 * SELLIO — Progressive Privacy & Identity Protection
 * 
 * Principio: Los comerciales aparecen públicamente con su handle anónimo (ej: Comercial #A482)
 * hasta que existe contacto y revelación explícita consentida.
 */

export const generateAnonymousHandle = (id = '0') => {
  const hash = String(id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const code = (hash % 9000 + 1000).toString(16).toUpperCase();
  return `Comercial #${code}`;
};

export const maskEmail = (email) => {
  if (!email || !email.includes('@')) return '***@***.***';
  const [user, domain] = email.split('@');
  const visible = user.slice(0, 2);
  return `${visible}***@${domain}`;
};

export const maskPhone = (phone) => {
  if (!phone) return '+34 *** *** ***';
  const clean = String(phone).replace(/\s+/g, '');
  return `${clean.slice(0, 4)} *** *** ${clean.slice(-2)}`;
};

export const formatSellerDisplay = (seller = {}, isRevealed = false) => {
  if (!seller) return 'Comercial Anónimo';
  
  if (isRevealed || seller.is_revealed) {
    const fullName = `${seller.first_name || ''} ${seller.last_name || ''}`.trim();
    return fullName || seller.name || seller.handle || generateAnonymousHandle(seller.id);
  }

  return seller.handle || generateAnonymousHandle(seller.id);
};
