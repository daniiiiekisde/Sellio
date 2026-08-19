import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  User,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Handshake,
  CheckCircle2,
  Layers,
  Lock,
  Calculator,
  Flame
} from 'lucide-react';
import { Button } from '../../../components/common';

export const HowItWorks = () => {
  const steps = [
    {
      num: '01',
      title: 'La Empresa publica el producto y las condiciones',
      desc: 'Define el producto, el precio oficial y el porcentaje de comisión comercial (ej. 15%). Sin costes ocultos. Solo 2% de tarifa Sellio tras el cobro.',
      role: 'Para Empresas'
    },
    {
      num: '02',
      title: 'El Comercial descubre con Sellio Match',
      desc: 'Nuestro motor inteligente calcula el % de compatibilidad según el sector, zona y cartera del comercial. Conoce de antemano su ganancia potencial.',
      role: 'Para Comerciales'
    },
    {
      num: '03',
      title: 'Contacto y Acuerdo con identidad protegida',
      desc: 'El comercial muestra interés como Comercial Anónimo (#A482). Al aceptar la empresa, se formaliza un acuerdo contractual con condiciones inmutables.',
      role: 'Seguridad B2B'
    },
    {
      num: '04',
      title: 'Venta, Liquidación y Cobro 100% íntegro',
      desc: 'Registrada la venta confirmada, el comercial cobra su comisión completa. Sellio custodia la trazabilidad y garantiza la transparencia en cada operación.',
      role: 'Garantía Sellio'
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 800 }}>
          ⚙️ CÓMO FUNCIONA SELLIO
        </span>
        <h1 style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--text-primary)', margin: '1rem 0 1rem 0', letterSpacing: '-0.02em' }}>
          El flujo B2B que elimina la fricción entre <br />
          <span style={{ color: 'var(--primary)' }}>quien necesita vender y quien sabe vender</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
          Sellio no es un portal de empleo ni una tienda online. Es la infraestructura comercial donde fabricantes y agentes de ventas crean acuerdos transparentes y rentables.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/register">
            <Button variant="primary" size="lg">Comenzar Gratis en Sellio</Button>
          </Link>
          <Link to="/products">
            <Button variant="outline" size="lg">Explorar Oportunidades</Button>
          </Link>
        </div>
      </div>

      {/* 4 Steps Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
        {steps.map((step, idx) => (
          <div
            key={idx}
            style={{
              background: '#ffffff',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-2xl)',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)', opacity: 0.85 }}>
                  {step.num}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '6px' }}>
                  {step.role}
                </span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 0.75rem 0', lineHeight: 1.3 }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#ffffff',
        borderRadius: 'var(--radius-2xl)',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 1rem 0', color: '#ffffff' }}>
          ¿Listo para conectar tu red comercial?
        </h2>
        <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Tanto si tienes un catálogo de productos contrastados como si eres un comercial con cartera, Sellio acelera tus acuerdos.
        </p>
        <Link to="/register">
          <Button variant="primary" size="lg">Registrarme Ahora</Button>
        </Link>
      </div>
    </div>
  );
};

export default HowItWorks;
