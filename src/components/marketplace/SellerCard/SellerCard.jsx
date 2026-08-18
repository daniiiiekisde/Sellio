import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Briefcase, Star, Sparkles, Lock, Globe, Target } from 'lucide-react';
import Button from '../../common/Button';
import './SellerCard.css';

export const SellerCard = ({ seller }) => {
  const {
    id,
    anonymousId,
    alias,
    name,
    sector,
    region,
    experience,
    specialization,
    languages,
    clientType,
    headline,
    bio,
    rating,
    verified,
    matchScore
  } = seller || {};

  const displayName = anonymousId || alias || name || 'Comercial Sellio';

  return (
    <div className="seller-card">
      <div className="seller-card-header">
        <div className="seller-avatar-box">
          <Lock size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            <h3 className="seller-name">
              <Link to={`/sellers/${id}`}>{displayName}</Link>
              {verified && <ShieldCheck size={16} className="verified-badge" title="Perfil verificado por la plataforma" />}
            </h3>
            {matchScore && (
              <span className="badge badge-success" style={{ fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Sparkles size={11} /> {matchScore}% Match
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '3px' }}>
            <span className="badge badge-secondary" style={{ fontSize: '10px', padding: '2px 6px' }}>
              🔒 Perfil Anónimo
            </span>
            <span className="seller-sector">{sector}</span>
          </div>
        </div>
      </div>

      <div className="seller-headline">{headline}</div>
      <p className="seller-bio">{bio}</p>

      {specialization && (
        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Target size={12} color="var(--primary)" /> <strong>Especialidad:</strong> {specialization}
        </div>
      )}

      {clientType && (
        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
          <Briefcase size={12} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
          <span><strong>Clientes tipo:</strong> {clientType}</span>
        </div>
      )}

      <div className="seller-card-stats">
        <span className="s-stat"><MapPin size={13} /> {region}</span>
        <span className="s-stat"><Briefcase size={13} /> {experience}</span>
        {languages && (
          <span className="s-stat"><Globe size={13} /> {languages.join(' / ')}</span>
        )}
        {rating && <span className="s-stat"><Star size={13} style={{ color: 'var(--warning)' }} /> {rating}</span>}
      </div>

      <div className="seller-card-footer">
        <Link to={`/sellers/${id}`}>
          <Button variant="outline" size="sm" fullWidth>Ver Ficha Profesional</Button>
        </Link>
      </div>
    </div>
  );
};

export default SellerCard;
