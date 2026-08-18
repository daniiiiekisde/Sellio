import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, MapPin, Award, ShieldCheck, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { Button, Modal } from '../../../components/common';
import './Seller.css';

export const Seller = () => {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const seller = {
    id: id || 'sell_1',
    anonymousId: 'COMERCIAL #A482',
    name: 'Comercial #A482',
    headline: 'Agente Comercial Senior HORECA & Alimentación Gourmet',
    sector: 'Alimentación y Bebidas (HORECA)',
    region: 'Cataluña (Barcelona, Girona, Tarragona)',
    experience: '+12 años de experiencia',
    verified: true,
    languages: ['Español', 'Catalán', 'Inglés'],
    clientType: 'Restaurantes gastronómicos, Cadenas hoteleras, Tiendas Delicatessen',
    bio: 'Cartera consolidada de más de 80 restaurantes estrella y grupos de restauración en Barcelona y Girona. Enfoque en productos gourmet con valor añadido y distribución selectiva.',
    skills: ['Canal HORECA', 'Negociación B2B', 'Distribución Selectiva', 'Gestión de Cuentas Clave', 'Cata y Prescripción'],
    currentBrands: ['Vinos D.O. Penedès', 'Conservas Artesanas del Cantábrico', 'Jamones Ibéricos Reserva']
  };

  const handleContact = () => {
    setSent(true);
    setTimeout(() => setModalOpen(false), 1800);
  };

  return (
    <div className="seller-detail-page container">
      <Link to="/sellers" className="back-breadcrumb">
        <ArrowLeft size={16} /> Volver a Comerciales
      </Link>

      <div className="seller-detail-layout">
        <div className="seller-detail-main">
          <div className="seller-header-card">
            <div className="seller-avatar-large" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8' }}>
              <ShieldCheck size={40} />
            </div>
            <div className="seller-header-info">
              <div className="seller-name-row">
                <h1>{seller.anonymousId}</h1>
                <span className="badge badge-secondary" style={{ fontSize: '12px' }}>🔒 Perfil Anónimo</span>
                {seller.verified && (
                  <span className="badge badge-primary"><ShieldCheck size={14} /> Verificado por Sellio</span>
                )}
              </div>
              <p className="seller-headline-text">{seller.headline}</p>
              <div className="seller-meta-row">
                <span><MapPin size={14} /> {seller.region}</span>
                <span><Award size={14} /> {seller.experience}</span>
              </div>
            </div>
          </div>

          <div className="seller-bio-card">
            <h3 className="section-title">Sobre trayectoria y cartera de clientes</h3>
            <p className="seller-bio-text">{seller.bio}</p>

            <h4 className="subsection-title">Tipo de Clientes que atiende</h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: '#cbd5e1', marginBottom: '1.25rem' }}>
              {seller.clientType}
            </p>

            <h4 className="subsection-title">Especialidades comerciales</h4>
            <div className="skills-pills">
              {seller.skills.map((skill, i) => (
                <span key={i} className="skill-pill">{skill}</span>
              ))}
            </div>

            <h4 className="subsection-title">Líneas afines representadas</h4>
            <ul className="brands-list">
              {seller.currentBrands.map((b, i) => (
                <li key={i}><CheckCircle2 size={16} /> {b}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="seller-detail-sidebar">
          <div className="contact-seller-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="badge badge-primary">Privacidad Sellio</span>
            </div>
            <h3>Proponer Oportunidad</h3>
            <p>Invita al {seller.anonymousId} a conocer tu catálogo de productos y condiciones de comisión.</p>
            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '0.5rem', marginBottom: '1.25rem' }}>
              La identidad privada del comercial se revelará únicamente tras mutuo acuerdo.
            </p>
            <Button variant="primary" fullWidth size="lg" icon={Send} onClick={() => setModalOpen(true)}>
              Proponer Oportunidad
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Proponer Oportunidad a ${seller.anonymousId}`}
      >
        {sent ? (
          <div className="success-modal-message">
            <CheckCircle2 size={44} className="success-icon" />
            <h3>¡Propuesta comercial enviada!</h3>
            <p>El comercial recibirá tu invitación y podrá revisar tus oportunidades y productos.</p>
          </div>
        ) : (
          <div>
            <label className="form-label">Mensaje de invitación para {seller.anonymousId}:</label>
            <textarea
              className="form-textarea"
              rows={4}
              defaultValue={`Hola ${seller.anonymousId}, representamos a una empresa fabricante en ${seller.sector} y nos interesa tu experiencia para expandir ventas en ${seller.region}. Te invitamos a conocer nuestras oportunidades activas.`}
            />
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button>
              <Button variant="primary" onClick={handleContact}>Enviar Invitación</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Seller;
