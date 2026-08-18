import React from 'react';
import { Building2, MapPin, Percent, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Target } from 'lucide-react';
import Button from '../../common/Button';
import './OpportunityCard.css';

export const OpportunityCard = ({ opportunity, onInterestClick }) => {
  const {
    id,
    title,
    company,
    sector,
    targetTerritory,
    commissionRate,
    requirements,
    description,
    matchScore,
    status
  } = opportunity || {};

  return (
    <div className="opportunity-card">
      <div className="opp-glow-line"></div>

      <div className="opp-card-header">
        <div className="opp-company-badge">
          <Building2 size={14} />
          <span>{company}</span>
          <ShieldCheck size={13} className="opp-verified-icon" title="Empresa Verificada" />
        </div>
        {matchScore && (
          <span className="badge badge-success opp-match-badge">
            <Sparkles size={12} /> Afinidad {matchScore}%
          </span>
        )}
      </div>

      <h3 className="opp-card-title">{title}</h3>
      <p className="opp-card-desc">{description}</p>

      {requirements && (
        <div className="opp-requirements-box">
          <div className="req-label">
            <Target size={12} /> Perfil / Cartera requerida:
          </div>
          <p className="req-text">{requirements}</p>
        </div>
      )}

      <div className="opp-meta-grid">
        <div className="opp-meta-item">
          <span className="opp-meta-title">Zona / Territorio</span>
          <span className="opp-meta-value"><MapPin size={13} /> {targetTerritory}</span>
        </div>
        <div className="opp-meta-item">
          <span className="opp-meta-title">Sector</span>
          <span className="opp-meta-value">{sector}</span>
        </div>
        <div className="opp-meta-item opp-commission-box">
          <span className="opp-meta-title">Condiciones de Comisión</span>
          <span className="opp-commission-val"><Percent size={13} /> {commissionRate}</span>
        </div>
      </div>

      <div className="opp-card-footer">
        <div className="opp-status-tag">
          <span className="status-indicator"></span>
          <span>Oportunidad {status || 'Activa'}</span>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={ArrowRight}
          onClick={() => onInterestClick && onInterestClick(opportunity)}
        >
          Me interesa esta oportunidad
        </Button>
      </div>
    </div>
  );
};

export default OpportunityCard;
