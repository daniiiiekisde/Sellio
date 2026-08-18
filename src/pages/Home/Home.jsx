import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Briefcase, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Target, 
  Sparkles,
  Search,
  CheckCircle2,
  Zap,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import Button from '../../components/Button';
import ProductCard from '../../components/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import { SECTORS } from '../../utils/constants';
import './Home.css';

export const Home = () => {
  const { products } = useProducts();
  const [heroSearch, setHeroSearch] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/products?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <div className="home-page bg-grid-ambient">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="ambient-spotlight-top"></div>
        <div className="ambient-spotlight-left"></div>
        <div className="ambient-spotlight-right"></div>

        <div className="container hero-container">
          {/* 21st.dev Floating Announcement Pill */}
          <div className="hero-pill-badge">
            <span className="live-dot"></span>
            <span className="hero-pill-text">Marketplace B2B de Fuerza de Ventas y Fabricantes</span>
            <Sparkles size={13} className="hero-pill-sparkle" />
          </div>

          {/* Headline */}
          <h1 className="hero-title">
            Conectamos <span className="hero-highlight-gradient">Empresas</span> con <span className="hero-highlight-cyan">Comerciales</span> Independientes
          </h1>

          <p className="hero-subtitle">
            Las empresas publican sus productos y condiciones para expandir nuevos territorios. Los comerciales independientes seleccionan marcas líderes para distribuir con total transparencia.
          </p>

          {/* Quick Hero Search Input */}
          <form onSubmit={handleSearchSubmit} className="hero-search-box">
            <Search size={18} className="hero-search-icon" />
            <input 
              type="text" 
              placeholder="Buscar por producto, sector, fabricante o zona (ej. Cosmética, Madrid, Alimentación)..." 
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              className="hero-search-input"
            />
            <Button type="submit" variant="primary" size="md">
              Buscar
            </Button>
          </form>

          {/* CTA Buttons */}
          <div className="hero-cta-group">
            <Link to="/register">
              <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Empezar gratis ahora
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="lg" icon={Zap}>
                Explorar oportunidades
              </Button>
            </Link>
          </div>

          {/* 21st.dev Bento Metric Stat Pills */}
          <div className="hero-stats-bento">
            <div className="stat-bento-card">
              <div className="stat-bento-header">
                <Building2 size={16} className="stat-icon-indigo" />
                <span className="stat-badge-pulse">+120 Activas</span>
              </div>
              <span className="stat-bento-number">+120</span>
              <span className="stat-bento-label">Empresas y Fabricantes</span>
            </div>

            <div className="stat-bento-card">
              <div className="stat-bento-header">
                <Briefcase size={16} className="stat-icon-cyan" />
                <span className="stat-badge-pulse stat-badge-cyan">Verificados</span>
              </div>
              <span className="stat-bento-number">+450</span>
              <span className="stat-bento-label">Comerciales con Cartera</span>
            </div>

            <div className="stat-bento-card">
              <div className="stat-bento-header">
                <TrendingUp size={16} className="stat-icon-violet" />
                <span className="stat-badge-pulse stat-badge-violet">IA Match</span>
              </div>
              <span className="stat-bento-number">94%</span>
              <span className="stat-bento-label">Afinidad Media de Contacto</span>
            </div>
          </div>
        </div>
      </section>

      {/* Two Pillars Bento Grid (For Companies vs For Sellers) */}
      <section className="pillars-section">
        <div className="container">
          <div className="section-header text-center">
            <div className="badge badge-secondary" style={{ marginBottom: '1rem' }}>
              <Layers size={14} /> Arquitectura B2B Dual
            </div>
            <h2 className="section-title">Una solución diseñada para ambas partes</h2>
            <p className="section-desc">Sin intermediarios burocráticos, con contratos claros y comisiones pactadas.</p>
          </div>

          <div className="pillars-bento-grid">
            {/* Pillar: Para Empresas */}
            <div className="pillar-bento-card pillar-company">
              <div className="pillar-top-glow"></div>
              <div className="pillar-badge-header">
                <div className="pillar-icon-wrapper">
                  <Building2 size={24} />
                </div>
                <span className="badge badge-primary">Para Fabricantes y Empresas</span>
              </div>

              <h3 className="pillar-title">“Encuentra comerciales que vendan tus productos”</h3>
              <p className="pillar-desc">
                Publica tu catálogo, define tu territorio de expansión y recibe solicitudes directas de comerciales especializados en tu sector.
              </p>

              <ul className="pillar-benefits">
                <li>
                  <div className="benefit-icon-circle"><CheckCircle2 size={15} /></div>
                  <span>Abre nuevos canales territoriales sin coste fijo inicial</span>
                </li>
                <li>
                  <div className="benefit-icon-circle"><CheckCircle2 size={15} /></div>
                  <span>Filtra comerciales por cartera de clientes activa y sector</span>
                </li>
                <li>
                  <div className="benefit-icon-circle"><CheckCircle2 size={15} /></div>
                  <span>Contacto directo y negociación de comisiones flexible</span>
                </li>
              </ul>

              <div className="pillar-action">
                <Link to="/register">
                  <Button variant="secondary" fullWidth size="lg">
                    Publicar mis productos
                  </Button>
                </Link>
              </div>
            </div>

            {/* Pillar: Para Comerciales */}
            <div className="pillar-bento-card pillar-seller">
              <div className="pillar-top-glow"></div>
              <div className="pillar-badge-header">
                <div className="pillar-icon-wrapper pillar-icon-seller">
                  <Briefcase size={24} />
                </div>
                <span className="badge badge-info">Para Comerciales y Agentes</span>
              </div>

              <h3 className="pillar-title">“Encuentra marcas y productos para representar”</h3>
              <p className="pillar-desc">
                Accede a un marketplace de fabricantes contrastados que buscan profesionales como tú para distribuir en tu zona de influencia.
              </p>

              <ul className="pillar-benefits">
                <li>
                  <div className="benefit-icon-circle benefit-icon-cyan"><CheckCircle2 size={15} /></div>
                  <span>Catálogos con condiciones y comisiones 100% transparentes</span>
                </li>
                <li>
                  <div className="benefit-icon-circle benefit-icon-cyan"><CheckCircle2 size={15} /></div>
                  <span>Oportunidades directas sin intermediarios opacos</span>
                </li>
                <li>
                  <div className="benefit-icon-circle benefit-icon-cyan"><CheckCircle2 size={15} /></div>
                  <span>Sistema de matching que valora tu especialización real</span>
                </li>
              </ul>

              <div className="pillar-action">
                <Link to="/register">
                  <Button variant="primary" fullWidth size="lg">
                    Buscar oportunidades
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products / Opportunities preview */}
      <section className="featured-section">
        <div className="container">
          <div className="featured-header">
            <div>
              <span className="badge badge-primary">Marketplace en tiempo real</span>
              <h2 className="section-title" style={{ marginTop: '0.5rem' }}>Últimas Oportunidades Publicadas</h2>
            </div>
            <Link to="/products">
              <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                Ver todas las oportunidades
              </Button>
            </Link>
          </div>

          <div className="products-grid">
            {products.slice(0, 3).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Sectors list */}
      <section className="sectors-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Sectores con Mayor Demanda</h2>
            <p className="section-desc">Encuentra o publica oportunidades comerciales segmentadas por industria.</p>
          </div>

          <div className="sectors-pills-wrap">
            {SECTORS.map((sector, i) => (
              <Link to={`/products?sector=${encodeURIComponent(sector)}`} key={i} className="sector-tag">
                <Target size={14} className="sector-icon" />
                <span>{sector}</span>
                <ArrowUpRight size={12} className="sector-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-bento">
            <div className="cta-glow-backdrop"></div>
            
            <div className="cta-content">
              <div className="badge badge-primary" style={{ marginBottom: '1.25rem' }}>
                <Sparkles size={13} /> Alta Velocidad de Conexión
              </div>
              <h2 className="cta-title">¿Listo para impulsar tu crecimiento comercial?</h2>
              <p className="cta-desc">
                Únete hoy a la plataforma B2B que está conectando empresas fabricantes con los comerciales más activos de cada territorio.
              </p>
              <div className="cta-buttons">
                <Link to="/register">
                  <Button variant="primary" size="lg">Crear Cuenta Gratis</Button>
                </Link>
                <Link to="/companies">
                  <Button variant="outline" size="lg">
                    Ver Empresas Registradas
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
