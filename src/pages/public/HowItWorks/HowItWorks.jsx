import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/common';

export const HowItWorks = () => {
  const steps = [
    ['01','Empresa','Publica el producto y define precio, territorio y comisión comercial. Sellio añade solo su tarifa cuando existe una venta confirmada.'],
    ['02','Match','El comercial descubre oportunidades con un score de compatibilidad basado en sector, zona, experiencia y cartera.'],
    ['03','Acuerdo','Se protege la identidad durante el primer contacto y, al aceptar ambas partes, las condiciones quedan versionadas.'],
    ['04','Venta','La venta se registra, se calcula la liquidación y el comercial conserva íntegramente la comisión que la empresa había pactado.']
  ];

  return (
    <div className="public-experience public-how">
      <div className="public-experience-inner">
        <div className="public-kicker">● El sistema Sellio</div>
        <h1 className="public-display">De una oportunidad a una venta. <span className="accent">Sin fricción.</span></h1>
        <p className="public-lead">Sellio conecta producto, talento comercial y trazabilidad en un único flujo B2B. Menos intermediarios. Más claridad. Un acuerdo que todos entienden.</p>
        <div className="public-actions">
          <Link to="/register"><Button variant="primary" size="lg">Entrar en Sellio <ArrowRight size={17}/></Button></Link>
          <Link to="/products"><Button variant="outline" size="lg">Explorar oportunidades</Button></Link>
        </div>

        <div className="public-how-steps">
          {steps.map(([num,role,title], idx) => (
            <article className="public-how-step" key={num}>
              <div className="public-how-step-number">{num}</div>
              <div className="public-how-step-role">{role}</div>
              <h3>{title}</h3>
              <p>{idx === 0 ? 'La empresa mantiene el control de su oferta y decide exactamente qué quiere vender y cuánto está dispuesta a pagar al comercial.' : idx === 1 ? 'El marketplace deja de ser un catálogo infinito y se convierte en una selección relevante para cada perfil.' : idx === 2 ? 'Las condiciones pactadas quedan registradas para que precio, porcentaje y versión de la oferta no se puedan alterar arbitrariamente.' : 'Cada operación deja una trazabilidad clara desde el acuerdo hasta la liquidación.'}</p>
            </article>
          ))}
        </div>

        <div className="public-premium-cta">
          <div className="public-kicker">Listo para el siguiente paso</div>
          <h2>La red comercial que tu producto todavía no tiene.</h2>
          <p>Empieza como empresa o como comercial y descubre cómo encaja Sellio en tu forma de vender.</p>
          <div className="public-actions">
            <Link to="/register"><Button variant="primary" size="lg">Crear cuenta <ArrowRight size={17}/></Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
