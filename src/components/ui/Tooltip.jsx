import React, { useState } from 'react';

export const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-6px)',
          background: '#0f172a',
          color: '#ffffff',
          padding: '0.4rem 0.75rem',
          borderRadius: '6px',
          fontSize: '0.75rem',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          pointerEvents: 'none'
        }}>
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
