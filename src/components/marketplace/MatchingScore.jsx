import React, { useState } from 'react';
import { Sparkles, Info, CheckCircle2, XCircle } from 'lucide-react';
import { calculateMatchingScore } from '../../utils/matchingScore';

export const MatchingScore = ({
  score = 92,
  sellerProfile = null,
  opportunity = null,
  showBreakdown = false
}) => {
  const [openTooltip, setOpenTooltip] = useState(false);

  const scoreData = sellerProfile && opportunity
    ? calculateMatchingScore(sellerProfile, opportunity)
    : { totalScore: score, percentageString: `${score}%`, breakdown: [] };

  const finalScore = scoreData.totalScore;
  const isHigh = finalScore >= 80;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setOpenTooltip(!openTooltip)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          padding: '0.25rem 0.65rem',
          borderRadius: '9999px',
          fontSize: '0.775rem',
          fontWeight: 800,
          background: isHigh ? 'rgba(37, 99, 235, 0.1)' : '#f1f5f9',
          color: isHigh ? 'var(--primary)' : 'var(--text-secondary)',
          border: isHigh ? '1px solid rgba(37, 99, 235, 0.25)' : '1px solid #e2e8f0',
          cursor: 'pointer'
        }}
      >
        <Sparkles size={12} />
        <span>{scoreData.percentageString} Match</span>
      </button>

      {openTooltip && scoreData.breakdown.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '110%',
          right: 0,
          background: '#ffffff',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          padding: '1rem',
          width: '260px',
          zIndex: 50
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>
            Explicación del Algoritmo
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem' }}>
            {scoreData.breakdown.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: item.matched ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {item.item}
                </span>
                <span style={{ fontWeight: 700, color: item.matched ? '#059669' : '#dc2626' }}>
                  +{item.points} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchingScore;
