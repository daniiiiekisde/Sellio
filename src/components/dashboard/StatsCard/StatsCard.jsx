import React from 'react';
import './StatsCard.css';

export const StatsCard = ({
  title,
  value,
  change,
  icon: Icon,
  color = 'primary', // primary, warning, success, info, violet
  className = ''
}) => {
  return (
    <div className={`stats-card ${className}`}>
      <div className="stats-card-top">
        <span className="stats-card-title">{title}</span>
        {Icon && (
          <div className={`stats-icon-box stats-${color}`}>
            <Icon size={18} />
          </div>
        )}
      </div>
      <div className="stats-card-value">{value}</div>
      {change && <span className="stats-card-change">{change}</span>}
    </div>
  );
};

export default StatsCard;
