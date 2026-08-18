import React from 'react';
import './LoadingScreen.css';

/**
 * Componente LoadingScreen para estados de carga elegantes y desacoplados.
 * @param {string} message - Mensaje principal de carga
 * @param {string} subMessage - Mensaje secundario explicativo
 * @param {boolean} fullScreen - Si ocupa toda la pantalla (fixed/100vh) o se adapta a su contenedor
 * @param {'sm' | 'md' | 'lg'} size - Tamaño del indicador de carga
 */
export const LoadingScreen = ({
  message = 'Cargando...',
  subMessage = null,
  fullScreen = true,
  size = 'md',
  className = ''
}) => {
  return (
    <div className={`loading-screen-container ${fullScreen ? 'full-screen' : ''} ${className}`}>
      <div className="loading-spinner-wrapper">
        <div className="loading-spinner-glow" />
        <div className={`loading-spinner-ring size-${size}`} />
      </div>
      {message && <p className="loading-message">{message}</p>}
      {subMessage && <p className="loading-submessage">{subMessage}</p>}
    </div>
  );
};

export default LoadingScreen;
