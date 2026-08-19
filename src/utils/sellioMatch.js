/**
 * SELLIO MATCH ENGINE
 * 
 * Genera el % de compatibilidad y una explicación comprensible:
 * "Coincides porque vendes Alimentación, trabajas en Cataluña y tienes experiencia en Canal Horeca."
 */

export const DEFAULT_COMMERCIAL_PROFILE = {
  id: 'usr_seller_1',
  code: '#A482',
  name: 'Carlos Mendoza',
  years_experience: 8,
  sectors: ['Alimentación y Bebidas', 'Alimentación y Bebidas (HORECA)', 'Consumo', 'Hostelería'],
  regions: ['Cataluña', 'Madrid', 'Barcelona', 'España (Nacional)'],
  languages: ['Español', 'Catalán', 'Inglés'],
  categories: ['Alimentación y Bebidas', 'Distribución y Ventas', 'Salud y Cosmética'],
  availability: 'inmediata',
  reputation_level: 'PRO',
  rating: 4.8,
  total_sales: 47,
  total_volume: 18450,
  active_agreements: 7,
  conversion_rate: 14.8
};

export const calculateSellioMatch = (opportunity, sellerProfile = DEFAULT_COMMERCIAL_PROFILE) => {
  if (!opportunity) {
    return {
      score: 85,
      reason: 'Oportunidad destacada en tu zona',
      tags: ['Oportunidad Activa'],
      details: []
    };
  }

  const profile = { ...DEFAULT_COMMERCIAL_PROFILE, ...(sellerProfile || {}) };
  let points = 0;
  const matchReasons = [];
  const tags = [];
  const details = [];

  // 1. Sector (35 pts)
  const oppSector = opportunity.sector || opportunity.category || '';
  const sectorMatch = profile.sectors.some(s => 
    s.toLowerCase().includes(oppSector.toLowerCase()) || 
    oppSector.toLowerCase().includes(s.toLowerCase())
  );

  if (sectorMatch || !oppSector) {
    points += 35;
    matchReasons.push(`vendes ${oppSector || 'en este sector'}`);
    tags.push(`✓ Sector ${oppSector || 'Afín'}`);
    details.push({ key: 'Sector', matched: true, text: `Especialidad en ${oppSector}` });
  } else {
    points += 10;
    details.push({ key: 'Sector', matched: false, text: `Sector no prioritario (${oppSector})` });
  }

  // 2. Territorio / Región (30 pts)
  const oppRegion = opportunity.target_region || opportunity.targetTerritory || 'España (Nacional)';
  const isNational = oppRegion.toLowerCase().includes('nacional') || oppRegion.toLowerCase().includes('españa');
  const regionMatch = isNational || profile.regions.some(r => 
    r.toLowerCase().includes(oppRegion.toLowerCase()) || 
    oppRegion.toLowerCase().includes(r.toLowerCase())
  );

  if (regionMatch) {
    points += 30;
    matchReasons.push(`trabajas en ${oppRegion}`);
    tags.push(`✓ Territorio ${oppRegion}`);
    details.push({ key: 'Territorio', matched: true, text: `Cobertura en ${oppRegion}` });
  } else {
    points += 5;
    details.push({ key: 'Territorio', matched: false, text: `Zona objetivo: ${oppRegion}` });
  }

  // 3. Experiencia (20 pts)
  const expMatch = profile.years_experience >= 2;
  if (expMatch) {
    points += 20;
    matchReasons.push(`cuentas con ${profile.years_experience} años de experiencia`);
    tags.push(`✓ Exp. ${profile.years_experience} años`);
    details.push({ key: 'Experiencia', matched: true, text: `Experiencia requerida cubierta` });
  } else {
    points += 10;
  }

  // 4. Idiomas / Disponibilidad (15 pts)
  if (profile.languages && profile.languages.length > 0) {
    points += 15;
    tags.push(`✓ ${profile.languages[0]}`);
    details.push({ key: 'Idiomas', matched: true, text: `Idiomas: ${profile.languages.join(', ')}` });
  }

  const finalScore = Math.min(99, Math.max(65, points));

  // Generar razón narrativa
  let verbalReason = 'Coincides con esta oportunidad comercial';
  if (matchReasons.length > 0) {
    verbalReason = `Coincides porque ${matchReasons.join(', ')}.`;
  }

  return {
    score: opportunity.matching_score || finalScore,
    reason: verbalReason,
    tags: tags.slice(0, 3),
    details,
    isTopMatch: (opportunity.matching_score || finalScore) >= 90
  };
};
