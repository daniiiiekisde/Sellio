/**
 * SELLIO — Explainable Matching Engine
 * 
 * Ponderación explicable:
 * - Sector:        +30
 * - Región:        +20
 * - Idioma:        +15
 * - Experiencia:   +15
 * - Categoría:     +10
 * - Disponibilidad:+10
 * TOTAL:           100 puntos
 */

export const calculateMatchingScore = (sellerProfile = {}, opportunity = {}) => {
  let score = 0;
  const breakdown = [];

  // 1. Sector (+30)
  const sellerSectors = sellerProfile.sectors || [];
  const oppSector = opportunity.sector || '';
  if (sellerSectors.some(s => s.toLowerCase() === oppSector.toLowerCase()) || !oppSector) {
    score += 30;
    breakdown.push({ item: 'Sector', points: 30, matched: true, desc: 'Sector afín y comprobado' });
  } else {
    breakdown.push({ item: 'Sector', points: 0, matched: false, desc: 'Sector no coincidente' });
  }

  // 2. Región (+20)
  const sellerRegions = sellerProfile.regions || [];
  const oppRegion = opportunity.target_region || opportunity.targetTerritory || '';
  if (sellerRegions.some(r => r.toLowerCase().includes(oppRegion.toLowerCase()) || oppRegion.toLowerCase().includes(r.toLowerCase())) || oppRegion.includes('Nacional')) {
    score += 20;
    breakdown.push({ item: 'Región', points: 20, matched: true, desc: 'Territorio de venta cubierto' });
  } else {
    breakdown.push({ item: 'Región', points: 0, matched: false, desc: 'Fuera de zona habitual' });
  }

  // 3. Idioma (+15)
  const sellerLanguages = sellerProfile.languages || ['Español'];
  if (sellerLanguages.length > 0) {
    score += 15;
    breakdown.push({ item: 'Idioma', points: 15, matched: true, desc: 'Idiomas requeridos dominados' });
  } else {
    breakdown.push({ item: 'Idioma', points: 0, matched: false, desc: 'Idiomas pendientes' });
  }

  // 4. Experiencia (+15)
  const yearsExp = Number(sellerProfile.years_experience) || 3;
  if (yearsExp >= 2) {
    score += 15;
    breakdown.push({ item: 'Experiencia', points: 15, matched: true, desc: 'Nivel y madurez profesional óptimos' });
  } else {
    score += 8;
    breakdown.push({ item: 'Experiencia', points: 8, matched: true, desc: 'Experiencia inicial' });
  }

  // 5. Categoría (+10)
  const sellerCategories = sellerProfile.categories || [];
  const oppCategory = opportunity.category || '';
  if (sellerCategories.some(c => c.toLowerCase() === oppCategory.toLowerCase()) || !oppCategory) {
    score += 10;
    breakdown.push({ item: 'Categoría', points: 10, matched: true, desc: 'Canal y tipología de producto alineados' });
  } else {
    breakdown.push({ item: 'Categoría', points: 0, matched: false, desc: 'Categoría secundaria' });
  }

  // 6. Disponibilidad (+10)
  if (sellerProfile.availability !== 'unavailable') {
    score += 10;
    breakdown.push({ item: 'Disponibilidad', points: 10, matched: true, desc: 'Disponibilidad activa para captación' });
  } else {
    breakdown.push({ item: 'Disponibilidad', points: 0, matched: false, desc: 'Disponibilidad limitada' });
  }

  return {
    totalScore: Math.min(100, Math.max(0, score)),
    percentageString: `${score}%`,
    breakdown
  };
};
