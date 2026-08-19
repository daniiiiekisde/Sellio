import React from 'react';
import './ui.css';

export const OpportunityCardSkeleton = () => (
  <div style={{
    background: '#ffffff',
    border: '1px solid var(--border-card, #e2e8f0)',
    borderRadius: 'var(--radius-xl, 16px)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="skeleton-box" style={{ width: '80px', height: '22px', borderRadius: '9999px' }} />
      <div className="skeleton-box" style={{ width: '90px', height: '22px', borderRadius: '9999px' }} />
    </div>

    <div>
      <div className="skeleton-box" style={{ width: '70%', height: '20px', marginBottom: '8px' }} />
      <div className="skeleton-box" style={{ width: '45%', height: '14px' }} />
    </div>

    <div className="skeleton-box" style={{ width: '100%', height: '70px', borderRadius: '12px' }} />

    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
      <div className="skeleton-box" style={{ flex: 1, height: '38px', borderRadius: '8px' }} />
      <div className="skeleton-box" style={{ flex: 1, height: '38px', borderRadius: '8px' }} />
    </div>
  </div>
);

export const TableRowSkeleton = ({ columns = 5 }) => (
  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} style={{ padding: '1rem' }}>
        <div className="skeleton-box" style={{ width: i === 0 ? '60%' : '80%', height: '16px' }} />
      </td>
    ))}
  </tr>
);

export const DashboardKPISkeleton = () => (
  <div style={{
    background: '#ffffff',
    border: '1px solid var(--border-card, #e2e8f0)',
    borderRadius: 'var(--radius-xl, 16px)',
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  }}>
    <div className="skeleton-box" style={{ width: '50%', height: '14px' }} />
    <div className="skeleton-box" style={{ width: '75%', height: '28px', margin: '4px 0' }} />
    <div className="skeleton-box" style={{ width: '40%', height: '12px' }} />
  </div>
);
