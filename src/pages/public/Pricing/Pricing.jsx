import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ShieldCheck, Sparkles, Building2, User, HelpCircle } from 'lucide-react';
import { Button } from '../../../components/common';

export const Pricing = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Pricing Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span style={{ background: '#ecfdf5', color: '#047857', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 800 }}>
          💶 PRECIOS Y MODELO DE NEGOCIO TRANSPARENTE
        </span>
        <h1 style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--text-primary)', margin: '1rem 0 1rem 0', letterSpacing: '-0.02em' }}>
          Sin cuotas fijas sorpresa. <br />
          <span style={{ color: '#059669' }}>Solo ganamos cuando tú vendes</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
          Sellio basa su modelo en incentivos alineados: el comercial cobra el 100% íntegro de su comisión pactada, y la empresa solo abona una tarifa del 2% tras la venta confirmada.
        </p>
      </div>

      {/* Pricing Comparison Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        {/* Card Comercial */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-2xl)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#eff6ff', color: '#1d4ed8', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '1rem' }}>
              <User size={14} /> Para Comerciales
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 0.5rem 0' }}>
              100% Gratis
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0 0 2rem 0' }}>
              Cero costes para el comercial. Tu comisión se transfiere íntegra sin ningún descuento de Sellio.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
              {[
                'Acceso ilimitado al Marketplace B2B',
                'Sellio Match & Sellio Potential ilimitado',
                'Identidad protegida y confidencialidad comercial',
                'Contratos y condiciones contractuales inmutables',
                'Gestión de solicitudes, acuerdos y cobros',
                'Perfil profesional y sistema de reputación (PRO/EXPERT)'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={14} />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Link to="/register?role=seller">
            <Button variant="primary" style={{ width: '100%', padding: '0.85rem' }}>
              Registrarme como Comercial
            </Button>
          </Link>
        </div>

        {/* Card Empresa */}
        <div style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
          border: '2px solid var(--primary)',
          borderRadius: 'var(--radius-2xl)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ position: 'absolute', top: '-14px', right: '2rem', background: 'var(--primary)', color: '#ffffff', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
            Plan Éxito Comercial
          </div>

          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f0fdf4', color: '#15803d', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '1rem' }}>
              <Building2 size={14} /> Para Empresas & Fabricantes
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 0.5rem 0' }}>
              2% <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>/ venta liquidada</span>
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0 0 2rem 0' }}>
              Sin costes mensuales de mantenimiento. Publica tus productos y solo pagas cuando se genera una venta.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
              {[
                'Publicación ilimitada de oportunidades de venta',
                'Acceso directo a red de comerciales cualificados',
                'Matching inteligente con comerciales de tu zona',
                'CRM comercial y panel de rendimiento',
                'Trazabilidad legal de acuerdos y comisiones',
                'Auditoría y resolución de disputas asistida'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#eff6ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={14} />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Link to="/register?role=company">
            <Button variant="primary" style={{ width: '100%', padding: '0.85rem' }}>
              Publicar mis Productos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
