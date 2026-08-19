import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Building2, User, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/common';

const features = [
  'Acceso ilimitado al Marketplace B2B',
  'Sellio Match & Sellio Potential',
  'Identidad protegida y confidencialidad comercial',
  'Acuerdos y condiciones versionadas',
  'Gestión de solicitudes, ventas y liquidaciones',
  'Perfil profesional y reputación'
];

export const Pricing = () => (
  <div className="public-experience public-pricing">
    <div className="public-experience-inner">
      <div className="public-pricing-hero">
        <div className="public-kicker">● Modelo transparente</div>
        <h1 className="public-display">Tu coste depende de <em>tu resultado.</em></h1>
        <p className="public-lead">El comercial no pierde ni un euro de la comisión que la empresa le haya pactado. Para la empresa, Sellio cobra una tarifa del 2% sobre la venta liquidada.</p>
      </div>

      <div className="public-pricing-grid">
        <article className="public-price-card">
          <div className="public-kicker"><User size={14}/> Comerciales</div>
          <div className="price-number">0€</div>
          <p className="price-note">Sin cuotas. Sin descuento sobre tu comisión. Si una empresa establece un 15%, ese 15% es tuyo.</p>
          <div style={{marginTop:'1.7rem'}}>
            {features.map((item) => <div className="price-feature" key={item}><Check size={17} className="price-check"/><span>{item}</span></div>)}
          </div>
          <Link to="/register?role=seller"><Button variant="primary" fullWidth size="lg" style={{marginTop:'1.3rem'}}>Entrar como comercial <ArrowRight size={17}/></Button></Link>
        </article>

        <article className="public-price-card featured">
          <div className="public-kicker" style={{color:'#93c5fd',background:'rgba(96,165,250,.1)',borderColor:'rgba(96,165,250,.2)'}}><Building2 size={14}/> Empresas y fabricantes</div>
          <div className="price-number">2<span style={{fontSize:'1.2rem',letterSpacing:'0'}}> %</span></div>
          <p className="price-note">Una tarifa sobre la venta liquidada. No cobramos al comercial y no añadimos una cuota mensual obligatoria.</p>
          <div className="public-price-breakdown">
            <div className="public-price-row"><span>Producto vendido</span><strong>100 €</strong></div>
            <div className="public-price-row"><span>Comisión comercial · 15%</span><strong>15 €</strong></div>
            <div className="public-price-row"><span>Sellio · 2%</span><strong>2 €</strong></div>
            <div className="public-price-row"><span>Empresa</span><strong>83 €</strong></div>
          </div>
          <div style={{marginTop:'1.5rem'}}>
            {['Publicación de oportunidades','Red comercial y Match','CRM y trazabilidad','Control de comisiones y acuerdos'].map(item => <div className="price-feature" key={item}><Check size={17} className="price-check"/><span>{item}</span></div>)}
          </div>
          <Link to="/register?role=company"><Button variant="primary" fullWidth size="lg" style={{marginTop:'1.3rem'}}>Publicar productos <ArrowRight size={17}/></Button></Link>
        </article>
      </div>

      <div className="public-premium-cta">
        <div className="public-kicker">Sin letra pequeña</div>
        <h2>La comisión del comercial es suya. Punto.</h2>
        <p>Sellio monetiza desde la empresa y mantiene separado el incentivo del comercial. Esa regla forma parte del diseño del producto.</p>
      </div>
    </div>
  </div>
);

export default Pricing;
