import React from 'react';
import { PackageOpen, Sparkles, Plus } from 'lucide-react';
import Button from '../common/Button';

export const EmptyState = ({
  icon: Icon = PackageOpen,
  title = 'No hay elementos para mostrar',
  description = 'No se han encontrado registros en esta sección o con los filtros actuales.',
  actionLabel = null,
  onAction = null,
  actionIcon = null
}) => {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid var(--border-card, #e2e8f0)',
      borderRadius: 'var(--radius-xl, 16px)',
      padding: '3.5rem 1.5rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#94a3b8',
        marginBottom: '1.25rem'
      }}>
        <Icon size={28} />
      </div>

      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary, #0f172a)' }}>
        {title}
      </h3>
      <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9rem', color: 'var(--text-secondary, #64748b)', maxWidth: '420px', lineHeight: 1.5 }}>
        {description}
      </p>

      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction} icon={actionIcon}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
