import React from 'react';
import { CheckCircle2, Clock, PauseCircle, Archive, AlertCircle, FileEdit, XCircle } from 'lucide-react';
import './opportunities.css';

export const OPPORTUNITY_STATUSES = {
  DRAFT: 'draft',
  PENDING_REVIEW: 'pending_review',
  PUBLISHED: 'published',
  PAUSED: 'paused',
  EXPIRED: 'expired',
  ARCHIVED: 'archived',
  CANCELLED: 'cancelled'
};

export const OpportunityStatus = ({ status = 'published', showIcon = true }) => {
  const statusConfigs = {
    published: {
      label: 'Publicada',
      className: 'opp-status-published',
      icon: CheckCircle2
    },
    draft: {
      label: 'Borrador',
      className: 'opp-status-draft',
      icon: FileEdit
    },
    pending_review: {
      label: 'En Revisión',
      className: 'opp-status-pending_review',
      icon: Clock
    },
    paused: {
      label: 'Pausada',
      className: 'opp-status-paused',
      icon: PauseCircle
    },
    expired: {
      label: 'Expirada',
      className: 'opp-status-expired',
      icon: AlertCircle
    },
    archived: {
      label: 'Archivada',
      className: 'opp-status-expired',
      icon: Archive
    },
    cancelled: {
      label: 'Cancelada',
      className: 'opp-status-paused',
      icon: XCircle
    }
  };

  const current = statusConfigs[status] || statusConfigs.published;
  const IconComponent = current.icon;

  return (
    <span className={`opp-status-pill ${current.className}`}>
      {showIcon && <IconComponent size={12} />}
      <span>{current.label}</span>
    </span>
  );
};

export default OpportunityStatus;
