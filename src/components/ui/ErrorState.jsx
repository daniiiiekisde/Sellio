import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import Button from '../common/Button';

export const ErrorState = ({
  title = 'No hemos podido cargar la información',
  description = 'Ha ocurrido un problema al consultar los datos. Comprueba tu conexión e inténtalo de nuevo.',
  onRetry = null
}) => {
  return (
    <div style={{
      background: '#fff1f2',
      border: '1px solid #fecdd3',
      borderRadius: 'var(--radius-xl, 16px)',
      padding: '3rem 1.5rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '550px',
      margin: '0 auto'
    }}>
      <div style={{
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        background: '#ffe4e6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#e11d48',
        marginBottom: '1rem'
      }}>
        <AlertCircle size={26} />
      </div>

      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#9f1239' }}>
        {title}
      </h3>
      <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.875rem', color: '#be123c', maxWidth: '400px', lineHeight: 1.5 }}>
        {description}
      </p>

      {onRetry && (
        <Button variant="primary" onClick={onRetry} icon={RotateCcw} size="sm">
          Reintentar
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
