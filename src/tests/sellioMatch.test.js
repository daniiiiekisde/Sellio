import { describe, it, expect } from 'vitest';
import { calculateSellioMatch, DEFAULT_COMMERCIAL_PROFILE } from '../utils/sellioMatch';

describe('Sellio Match Engine', () => {
  it('calculates high match (+90%) for matching sector and territory', () => {
    const opp = {
      sector: 'Alimentación y Bebidas (HORECA)',
      target_region: 'Cataluña',
      required_experience: 'Media',
      matching_score: 95
    };

    const match = calculateSellioMatch(opp, DEFAULT_COMMERCIAL_PROFILE);
    expect(match.score).toBeGreaterThanOrEqual(90);
    expect(match.isTopMatch).toBe(true);
    expect(match.reason).toContain('Alimentación y Bebidas');
    expect(match.reason).toContain('Cataluña');
  });

  it('provides transparent explanation details', () => {
    const opp = {
      sector: 'Energías Renovables',
      target_region: 'Andalucía',
      required_experience: 'Alta'
    };

    const match = calculateSellioMatch(opp, DEFAULT_COMMERCIAL_PROFILE);
    expect(match.details.length).toBeGreaterThan(0);
    expect(match.score).toBeLessThan(90);
  });
});
