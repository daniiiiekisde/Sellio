import { describe, it, expect } from 'vitest';
import { calculateMatchingScore } from '../utils/matchingScore';

describe('Matching Score Algorithm Tests', () => {
  const seller = {
    sectors: ['Alimentación y Bebidas (HORECA)', 'Tecnología y Software'],
    regions: ['Cataluña', 'Comunidad de Madrid'],
    preferred_commission_types: ['percentage'],
    years_experience: 5,
    is_verified: true
  };

  const highMatchOpp = {
    sector: 'Alimentación y Bebidas (HORECA)',
    target_region: 'Cataluña',
    category: 'Alimentación'
  };

  const lowMatchOpp = {
    sector: 'Construcción y Reformas',
    target_region: 'Galicia',
    category: 'Construcción'
  };

  it('Calcula puntuación alta para coincidencia de sector, región y tipo', () => {
    const result = calculateMatchingScore(seller, highMatchOpp);
    expect(result.totalScore).toBeGreaterThanOrEqual(70);
    expect(result.percentageString).toBeDefined();
    expect(result.breakdown.length).toBeGreaterThan(0);
  });

  it('Calcula puntuación baja para oportunidad fuera de sector y región', () => {
    const result = calculateMatchingScore(seller, lowMatchOpp);
    expect(result.totalScore).toBeLessThan(60);
  });

  it('Maneja datos nulos o vacíos sin lanzar excepciones', () => {
    const result = calculateMatchingScore(null, null);
    expect(typeof result.totalScore).toBe('number');
    expect(result.totalScore).toBeGreaterThanOrEqual(0);
  });
});
