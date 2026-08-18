import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Percent, Tag, Sparkles, Building2, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';
import Button from '../../common/Button';
import './ProductCard.css';

export const ProductCard = ({ product, onInterestClick }) => {
  const {
    id,
    name,
    company,
    category,
    targetTerritory,
    commissionRate,
    price,
    description,
    matchingScore
  } = product || {};

  return (
    <div className="product-card">
      <div className="product-card-glow-beam"></div>
      
      <div className="product-card-top">
        <div className="product-card-badge-group">
          {category && (
            <span className="badge badge-secondary product-category-badge">
              <Tag size={12} /> {category}
            </span>
          )}
          {matchingScore && (
            <span className="badge badge-success match-badge">
              <span className="live-dot"></span>
              <span>Match {matchingScore}%</span>
            </span>
          )}
        </div>
      </div>

      <div className="product-card-content">
        <div className="product-card-company">
          <div className="company-avatar-pill">
            <Building2 size={13} />
          </div>
          <span className="company-name">{company}</span>
        </div>
        
        <h3 className="product-card-title">
          <Link to={`/products/${id}`}>{name}</Link>
        </h3>
        
        <p className="product-card-desc">{description}</p>

        <div className="product-card-meta">
          {commissionRate && (
            <div className="meta-item meta-commission">
              <span className="meta-label">Comisión</span>
              <span className="meta-value commission-highlight">
                <Percent size={13} /> {commissionRate}
              </span>
            </div>
          )}
          {targetTerritory && (
            <div className="meta-item meta-territory">
              <span className="meta-label">Zona objetivo</span>
              <span className="meta-value">
                <MapPin size={13} /> {targetTerritory}
              </span>
            </div>
          )}
          {price && (
            <div className="meta-item meta-price">
              <span className="meta-label">PVP orientativo</span>
              <span className="meta-value price-highlight">{formatCurrency(price)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="product-card-footer">
        <Link to={`/products/${id}`} className="btn-detail-link">
          <span>Ver ficha</span>
          <ArrowUpRight size={14} className="detail-arrow" />
        </Link>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onInterestClick && onInterestClick(product)}
        >
          Me interesa
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
