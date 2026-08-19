import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../../components/common';

const pillars = [
  ['01','Identidad protegida','El comercial puede explorar y mostrar interés sin exponer de entrada su cartera ni sus datos personales.'],
  ['02','Acuerdos versionados','Precio, porcentaje y condiciones quedan asociados a una versión concreta de la oportunidad y del acuerdo.'],
  ['03','Operaciones trazables','Solicitudes, acuerdos, ventas y liquidaciones dejan un historial claro para cada parte.'],
  ['04','Comisiones protegidas','La comisión pactada para el comercial no se utiliza para financiar la tarifa de Sellio. Son conceptos separados.'],
  ['05','Mediación','Las discrepancias pueden gestionarse con contexto y trazabilidad en lugar de depender de conversaciones dispersas.'],
  ['06','Privacidad por diseño','El acceso a información sensible se limita por rol y las reglas de seguridad viven también en el backend.']
];

export const Trust = () => (
  <div className="public-experience public-trust">
    <div className="public-experience-inner">
      <div className="public-kicker">● Trust / Sellio</div>
      <h1 className="public-display">Cuando el dinero importa, <span className="accent">la confianza no puede ser opcional.</span></h1>
      <p className="public-lead">Sellio está diseñado para que empresa y comercial sepan qué se ha acordado, qué se ha vendido y cómo se liquida. La confianza se construye con reglas visibles y trazabilidad.</p>

      <div className="public-trust-grid">
        {pillars.map(([index,title,desc]) => (
          <article className="public-trust-card" key={index}>
            <div className="trust-index">SELLIO / {index}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>

      <div className="public-premium-cta">
        <div className="public-kicker">Infraestructura comercial</div>
        <h2>Vender mejor empieza por saber exactamente con quién estás vendiendo.</h2>
        <p>Descubre el marketplace, crea tu perfil y entra en un entorno donde las reglas están claras desde el primer contacto.</p>
        <div className="public-actions">
          <Link to="/register"><Button variant="primary" size="lg">Crear cuenta verificada <ArrowRight size={17}/></Button></Link>
        </div>
      </div>
    </div>
  </div>
);

export default Trust;
