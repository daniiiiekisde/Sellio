import React from 'react';
import { Link } from 'react-router-dom';
import { User, ShieldCheck, MapPin, Briefcase, Users, Star } from 'lucide-react';
import Button from '../../common/Button';
import './SellerCard.css';

export const SellerCard = ({ seller }) => {
  const {
    id,
    name,
    sector,
    region,
    experience,
    portfolioCount,
    headline,
    bio,
    rating,
    verified
  } = seller || {};

  return (
    <div className="seller-card">
      <div className="seller-card-header">
        <div className="seller-avatar-box">
          <User size={24} />
        </div>
        <div>
          <h3 className="seller-name">
            <Link to={`/sellers/${id}`}>{name}</Link>
            {verified && <ShieldCheck size={16} className="verified-badge" title="Comercial verificado" />}
          </h3>
          <p className="seller-sector">{sector}</p>
        </div>
      </div>

      <div className="seller-headline">{headline}</div>
      <p className="seller-bio">{bio}</p>

      <div className="seller-card-stats">
        <span className="s-stat"><MapPin size={13} /> {region}</span>
        <span className="s-stat"><Briefcase size={13} /> {experience}</span>
        <span className="s-stat"><Users size={13} /> {portfolioCount} Contactos</span>
        {rating && <span className="s-stat"><Star size={13} style={{ color: '#f59e0b' }} /> {rating}</span>}
      </div>

      <div className="seller-card-footer">
        <Link to={`/sellers/${id}`}>
          <Button variant="outline" size="sm" fullWidth>Ver Perfil y Cartera</Button>
        </Link>
      </div>
    </div>
  );
};

export default SellerCard;
