import React from 'react';
import './DashboardHeader.css';

export const DashboardHeader = ({
  title,
  subtitle,
  action,
  badge
}) => {
  return (
    <div className="dash-header-wrap">
      <div className="dash-header-left">
        {badge && <span className="dash-header-badge">{badge}</span>}
        <h1 className="dash-header-title">{title}</h1>
        {subtitle && <p className="dash-header-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="dash-header-action">{action}</div>}
    </div>
  );
};

export default DashboardHeader;
