import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Scale,
  FileCheck2,
  History,
  EyeOff,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../../components/common';

export const Trust = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Empresas y Comerciales Verificados',
      desc: 'Validamos el CIF, la solvencia y la legitimidad de las marcas antes de permitir la publicación de oportunidades. Los comerciales cuentan con Sellio Score basado en actividad real.'
    },
    {
      icon: EyeOff,
      title: 'Identidad y Cartera Protegidas',
      desc: 'El comercial explora y postula protegiendo su identidad (Comercial #A482). Su nombre y datos de contacto solo se revelan una vez que la empresa acepta formalmente el contacto.'
    },
    {
      icon: FileCheck2,
      title: 'Condiciones Contractuales Inmutables',
      desc: 'Cada oportunidad y acuerdo genera un número de versión registrado. Ninguna parte puede modificar porcentajes o precios sobre operaciones ya acordadas o ventas en curso.'
    },
    {
      icon: History,
      title: 'Registro y Auditoría de Operaciones',
      desc: 'Todas las interacciones comerciales, postulaciones, acuerdos y confirmaciones de venta quedan registradas en un libro de auditoría inmutable.'
    },
    {
      icon: Scale,
      title: 'Sistema de Mediación y Disputas',
      desc: 'Sellio cuenta con un panel neutral de resolución de discrepancias en caso de cancelaciones, devoluciones o desacuerdos en liquidaciones.'
    },
    {
      icon: Lock,
      title: 'Seguridad y Privacidad por Diseño',
      desc: 'Protección de datos conforme al RGPD europeo con encriptación de extremos y custodia segura de credenciales.'
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span style={{ background: '#f0fdf4', color: '#15803d', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 800 }}>
          🛡️ CENTRO DE CONFIANZA Y SEGURIDAD B2B
        </span>
        <h1 style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--text-primary)', margin: '1rem 0 1rem 0', letterSpacing: '-0.02em' }}>
          La seguridad y la transparencia <br />
          <span style={{ color: '#059669' }}>son el núcleo de Sellio</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
          Para que un marketplace B2B funcione, ambas partes deben operar con certidumbre total: los comerciales deben saber que cobrarán su comisión y las empresas que su producto está en manos de profesionales contrastados.
        </p>
      </div>

      {/* 6 Trust Pillars Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-lg)',
                background: '#eff6ff',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Icon size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
                {p.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#ffffff',
        borderRadius: 'var(--radius-2xl)',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 1rem 0', color: '#ffffff' }}>
          Protege tus acuerdos comerciales con Sellio
        </h2>
        <p style={{ fontSize: '0.95rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Únete a cientos de comerciales y empresas que ya operan con reglas claras y pagos seguros.
        </p>
        <Link to="/register">
          <Button variant="primary" size="lg">Crear Cuenta Verificada</Button>
        </Link>
      </div>
    </div>
  );
};

export default Trust;
