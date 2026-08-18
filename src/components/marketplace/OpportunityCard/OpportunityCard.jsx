import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Percent, Building2, Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Button from '../../common/Button';
import './OpportunityCard.css';

export const OpportunityCard = ({ opportunity, onApplyClick }) => {
  const {
    id,
    title,
    company,
    sector,
    targetTerritory,
    commissionRate,
    requirements,
    description,
    matchScore
  } = opportunity || {};

  return (
    <div className="opportunity-card">
      <div className="opp-card-glow-beam"></div>

      <div className="opp-card-header">
        <div className="opp-badge-group">
          {sector && <span className="badge badge-primary">{sector}</span>}
          {matchScore && (
            <span className="badge badge-success">
              <span className="live-dot"></span> Match {matchScore}%
            </span>
          )}
        </div>
      </div>

      <div className="opp-card-body">
        <div className="opp-company-row">
          <div className="opp-company-icon">
            <Building2 size={13} />
          </div>
          <span className="opp-company-name">{company}</span>
        </div>

        <h3 className="opp-title">
          <Link to={`/products?opportunity=${id}`}>{title}</Link>
        </h3>

        <p className="opp-desc">{description}</p>

        {requirements && (
          <div className="opp-requirements-chip">
            <CheckCircle2 size={13} className="req-check" />
            <span>{requirements}</span>
          </div>
        )}

        <div className="opp-meta-grid">
          {commissionRate && (
            <div className="opp-meta-item">
              <span className="opp-meta-label">Condiciones:</span>
              <span className="opp-meta-val opp-commission">{commissionRate}</span>
            </div>
          )}
          {targetTerritory && (
            <div className="opp-meta-item">
              <span className="opp-meta-label">Territorio:</span>
              <span className="opp-meta-val"><MapPin size={12} /> {targetTerritory}</span>
            </div>
          )}
        </div>
      </div>

      <div className="opp-card-footer">
        <span className="opp-status-pill">Oportunidad Activa</span>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onApplyClick && onApplyClick(opportunity)}
        >
          Presentar Candidatura
        </Button>
      </div>
    </div>
  );
};

export default OpportunityCard;
