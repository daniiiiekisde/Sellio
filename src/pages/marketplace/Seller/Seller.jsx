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
    name: 'Carlos Méndez',
    headline: 'Agente Comercial Senior HORECA & Alimentación Gourmet',
    sector: 'Alimentación y Bebidas (HORECA)',
    region: 'Cataluña (Barcelona, Girona, Tarragona)',
    experience: '12 años de experiencia',
    verified: true,
    bio: 'Cartera consolidada de más de 80 restaurantes estrella y grupos de restauración en Barcelona y Girona. Enfoque en productos gourmet con valor añadido y distribución selectiva.',
    skills: ['Canal HORECA', 'Negociación B2B', 'Distribución Selectiva', 'Gestión de Cuentas Clave'],
    currentBrands: ['Vinos D.O. Penedès', 'Jamones Ibéricos Reserva']
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
            <div className="seller-avatar-large">
              <User size={40} />
            </div>
            <div className="seller-header-info">
              <div className="seller-name-row">
                <h1>{seller.name}</h1>
                {seller.verified && (
                  <span className="badge badge-primary"><ShieldCheck size={14} /> Verificado</span>
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
            <h3 className="section-title">Sobre mi trayectoria y cartera</h3>
            <p className="seller-bio-text">{seller.bio}</p>

            <h4 className="subsection-title">Especialidades comerciales</h4>
            <div className="skills-pills">
              {seller.skills.map((skill, i) => (
                <span key={i} className="skill-pill">{skill}</span>
              ))}
            </div>

            <h4 className="subsection-title">Marcas o líneas afines representadas</h4>
            <ul className="brands-list">
              {seller.currentBrands.map((b, i) => (
                <li key={i}><CheckCircle2 size={16} /> {b}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="seller-detail-sidebar">
          <div className="contact-seller-card">
            <h3>Proponer Representación</h3>
            <p>Invita a {seller.name} a conocer tu catálogo y negociar un acuerdo comercial.</p>
            <Button variant="primary" fullWidth size="lg" icon={Send} onClick={() => setModalOpen(true)}>
              Contactar con el comercial
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Contactar con ${seller.name}`}
      >
        {sent ? (
          <div className="success-modal-message">
            <CheckCircle2 size={44} className="success-icon" />
            <h3>¡Mensaje de invitación enviado!</h3>
            <p>El comercial recibirá tu notificación y podrá revisar tus productos.</p>
          </div>
        ) : (
          <div>
            <label className="form-label">Mensaje para {seller.name}:</label>
            <textarea
              className="form-textarea"
              rows={4}
              defaultValue={`Hola ${seller.name}, represento a una empresa de ${seller.sector} y nos interesa tu perfil para expandir ventas en ${seller.region}.`}
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
