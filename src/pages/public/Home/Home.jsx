import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Building2, EyeOff, Search, ShieldCheck, Sparkles, Target, Users } from 'lucide-react';
import { Button } from '../../../components/common';
import { SECTORS } from '../../../utils/constants';
import './Home.css';

const steps = [
  { number: '01', title: 'Una empresa publica', text: 'Producto real, territorio, sector y condiciones comerciales claras.' },
  { number: '02', title: 'Un comercial descubre', text: 'Explora oportunidades que encajan con su experiencia y zona.' },
  { number: '03', title: 'Se acerca a la empresa', text: 'Muestra interés sin tener que exponer su identidad desde el principio.' },
  { number: '04', title: 'Ambos deciden', text: 'Contacto, negociación y acuerdo comercial directo.' },
];

export const Home = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const submitSearch = (event) => {
    event.preventDefault();
    navigate(query.trim() ? `/products?q=${encodeURIComponent(query.trim())}` : '/products');
  };

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="eyebrow"><span className="eyebrow-dot" /> El marketplace comercial B2B</div>
          <h1 className="hero-title">Los productos tienen que llegar <em>a quien sabe venderlos.</em></h1>
          <p className="hero-lead">Sellio conecta empresas con comerciales independientes. La empresa publica la oportunidad. El comercial la descubre y va a por la venta.</p>

          <div className="hero-actions">
            <Link to="/products"><Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">Explorar oportunidades</Button></Link>
            <Link to="/register"><Button variant="outline" size="lg">Entrar en Sellio</Button></Link>
          </div>

          <form className="hero-search" onSubmit={submitSearch}>
            <Search size={19} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca un producto, sector o territorio" aria-label="Buscar oportunidades" />
            <button type="submit">Buscar <ArrowUpRight size={16} /></button>
          </form>

          <div className="hero-note"><ShieldCheck size={15} /> Los comerciales pueden descubrir oportunidades con identidad pública protegida.</div>
        </div>
      </section>

      <section className="manifesto-section">
        <div className="container manifesto-grid">
          <div className="manifesto-kicker">01 / EL CAMBIO</div>
          <div>
            <h2>La empresa tiene el producto.<br /><span>El comercial tiene el mercado.</span></h2>
            <p>No queremos otro portal de empleo. No queremos que una empresa persiga perfiles. Sellio crea un espacio donde una empresa con algo real que vender publica una oportunidad y los profesionales independientes que encajan van hacia ella.</p>
          </div>
        </div>
      </section>

      <section className="flow-section">
        <div className="container">
          <div className="section-intro">
            <span>02 / CÓMO FUNCIONA</span>
            <h2>Una dirección.<br /><em>La oportunidad → el comercial.</em></h2>
          </div>
          <div className="flow-grid">
            {steps.map((step) => (
              <article className="flow-card" key={step.number}>
                <span className="flow-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="privacy-section">
        <div className="container privacy-grid">
          <div className="privacy-copy">
            <span className="section-label">03 / PRIVACIDAD</span>
            <h2>Ser anónimo no significa ser invisible.</h2>
            <p>Un comercial puede enseñar su experiencia, sectores y zonas sin revelar automáticamente su nombre, teléfono o email. Sellio puede verificar su identidad internamente cuando sea necesario.</p>
            <Link to="/register" className="text-link">Crear perfil comercial <ArrowRight size={16} /></Link>
          </div>
          <div className="anonymous-card">
            <div className="anonymous-top"><span>PERFIL PROFESIONAL</span><EyeOff size={18} /></div>
            <div className="anonymous-avatar"><Users size={25} /></div>
            <span className="anonymous-id">COMERCIAL #A482</span>
            <h3>Especialista en Horeca</h3>
            <div className="anonymous-tags"><span>Cataluña</span><span>+5 años</span><span>Alimentación</span><span>ES · CA · EN</span></div>
            <div className="anonymous-status"><span /> Identidad protegida</div>
          </div>
        </div>
      </section>

      <section className="split-section">
        <div className="container split-grid">
          <article className="split-panel company-panel">
            <div className="panel-index">PARA EMPRESAS</div>
            <Building2 size={30} />
            <h2>Publica lo que tienes.<br />Encuentra quién lo puede vender.</h2>
            <p>Producto real. Territorio. Sector. Condiciones. La oportunidad queda clara desde el primer vistazo.</p>
            <Link to="/register"><Button variant="outline">Publicar una oportunidad</Button></Link>
          </article>
          <article className="split-panel seller-panel">
            <div className="panel-index">PARA COMERCIALES</div>
            <BriefcaseBusiness size={30} />
            <h2>Encuentra algo que merezca<br />la pena vender.</h2>
            <p>Descubre marcas y productos. Mantén tu identidad protegida. Decide tú cuándo acercarte a la empresa.</p>
            <Link to="/products"><Button variant="primary" icon={ArrowRight} iconPosition="right">Explorar oportunidades</Button></Link>
          </article>
        </div>
      </section>

      <section className="sectors-section">
        <div className="container">
          <div className="section-intro sectors-intro"><span>04 / EXPLORA</span><h2>Encuentra tu próximo<br /><em>mercado.</em></h2></div>
          <div className="sector-grid">
            {SECTORS.slice(0, 8).map((sector, index) => (
              <Link className="sector-link" to={`/products?sector=${encodeURIComponent(sector)}`} key={sector}>
                <span>0{index + 1}</span><strong>{sector}</strong><ArrowUpRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="container final-cta">
          <Sparkles size={18} />
          <h2>Una empresa.<br /><em>Una oportunidad.</em><br />Un comercial que la hace crecer.</h2>
          <div><Link to="/register"><Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">Entrar en Sellio</Button></Link></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
