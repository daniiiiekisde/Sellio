import React from 'react';
import './LoadingScreen.css';

export const LoadingScreen = ({ message = 'Cargando…' }) => (
  <div className="loading-screen" role="status" aria-live="polite" aria-label={message}>
    <div className="loading-screen__mark" aria-hidden="true">
      <span />
    </div>
    <p className="loading-screen__message">{message}</p>
  </div>
);

export default LoadingScreen;
