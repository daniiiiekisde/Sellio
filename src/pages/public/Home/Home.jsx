import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  EyeOff,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
  Check,
  CheckCircle2,
  Sliders,
  Calculator,
  TrendingUp,
  Percent,
  Lock,
  ChevronRight,
  Star,
  Layers,
  Handshake,
  DollarSign
} from 'lucide-react';
import { Button } from '../../../components/common';
import { opportunitiesService } from '../../../services/opportunities';
import { SECTORS } from '../../../utils/constants';
import './Home.css';
import './HomeEnhancements.css';
import './HomeBrand.css';

export const Home = () => {
  const [query, setQuery] = useState('');
  const [activeRoleTab, setActiveRoleTab] = useState('sellers'); // 'sellers' | 'companies'
  const [featuredOpps, setFeaturedOpps] = useState([]);
  
  // Interactive Hero Simulator State
  const [simSalesCount, setSimSalesCount] = useState(15);
  const samplePrice = 120;
  const sampleCommRate = 15;
  const sampleCommPerUnit = (samplePrice * sampleCommRate) / 100;
  const sampleTotalEarnings = sampleCommPerUnit * simSalesCount;

  const navigate = useNavigate();

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await opportunitiesService.getAll();
        setFeaturedOpps(data.slice(0, 3));
      } catch (e) {
        console.error(e);
      }
    };
    loadFeatured();
  }, []);

  const submitSearch = (event) => {
    event.preventDefault();
    navigate(query.trim() ? `/products?q=${encodeURIComponent(query.trim())}` : '/products');
  };

  const quickSectors = [
    'Alimentación & HORECA',
    'Energías Renovables',
    'Salud y Farmacia',
    'Industrial & Maquinaria',
    'Software B2B'
  ];

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="home-hero">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-light hero-light-one" aria-hidden="true" />
        <div className="hero-light hero-light-two" aria-hidden="true" />
        
        <div className="container hero-inner">
          {/* Left Hero Column */}
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>EL MARKETPLACE B2B DE FUERZA COMERCIAL</span>
            </div>

            <h1 className="hero-title">
              Donde las empresas encuentran a quienes <em>de verdad saben vender.</em>
            </h1>

            <p className="hero-lead">
              Conectamos marcas con productos validados con comerciales independientes de alto rendimiento.
              Términos contractuales inmutables, comisiones 100% íntegras y matching explicable.
            </p>

            {/* Instant Search Bar */}
            <form className="hero-search" onSubmit={submitSearch}>
              <Search size={20} style={{ color: '#94a3b8', flexShrink: 0 }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busca por producto, sector (ej. HORECA) o territorio..."
                aria-label="Buscar oportunidades"
              />
              <button type="submit">
                <span>Explorar</span>
                <ArrowUpRight size={16} />
              </button>
            </form>

            {/* Quick Filter Pills */}
            <div className="hero-quick-pills">
              <span className="quick-label">Tendencias:</span>
              {quickSectors.map((sec) => (
                <button
                  type="button"
                  key={sec}
                  onClick={() => navigate(`/products?sector=${encodeURIComponent(sec)}`)}
                  className="quick-pill"
                >
                  {sec}
                </button>
              ))}
            </div>

            {/* Trust Micro-Bullets */}
            <div className="hero-trust-bullets">
              <div className="trust-bullet">
                <ShieldCheck size={16} className="bullet-icon-green" />
                <span>Identidad protegida (#A482)</span>
              </div>
              <div className="trust-bullet">
                <CheckCircle2 size={16} className="bullet-icon-blue" />
                <span>Comisión 100% íntegra para el comercial</span>
              </div>
              <div className="trust-bullet">
                <Percent size={16} className="bullet-icon-purple" />
                <span>2% tarifa Sellio transparente</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Interactive Live Opportunity & Potential Card */}
          <div className="hero-card-column">
            <div className="hero-interactive-card">
              <div className="card-glass-header">
                <div className="badge-verified">
                  <ShieldCheck size={13} />
                  <span>EMPRESA VERIFICADA</span>
                </div>
                <div className="badge-match-top">
                  <Sparkles size={13} />
                  <span>95% MATCH</span>
                </div>
              </div>

              <div className="card-body">
                <span className="card-sector-tag">Alimentación Gourmet · HORECA</span>
                <h3 className="card-title">Aceite de Oliva Virgen Extra Ecológico D.O. 500ml</h3>
                <p className="card-company">Por <strong>Iberia Gourmet SL</strong> · Cataluña y Baleares</p>

                {/* Economic Breakdown Box */}
                <div className="hero-economics-box">
                  <div className="eco-item">
                    <span className="eco-label">PVP Unitario</span>
                    <strong className="eco-val">{samplePrice} €</strong>
                  </div>
                  <div className="eco-item">
                    <span className="eco-label">Comisión</span>
                    <strong className="eco-val text-green">{sampleCommRate}% ({sampleCommPerUnit} €)</strong>
                  </div>
                  <div className="eco-item">
                    <span className="eco-label">Sellio Fee</span>
                    <strong className="eco-val text-muted">2% (Empresa)</strong>
                  </div>
                </div>

                {/* Live Simulator Widget */}
                <div className="hero-simulator-widget">
                  <div className="sim-header">
                    <span className="sim-title"><Calculator size={14} /> Simulador de Ganancias</span>
                    <strong className="sim-total">+{sampleTotalEarnings.toLocaleString()} €</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={simSalesCount}
                    onChange={(e) => setSimSalesCount(Number(e.target.value))}
                    className="hero-slider"
                  />
                  <div className="sim-footer">
                    <span>Volumen estimado: <strong>{simSalesCount} ventas</strong></span>
                    <span className="sim-note">💡 Tu comisión no sufre deducciones</span>
                  </div>
                </div>

                <div className="card-actions">
                  <Link to="/products" style={{ width: '100%' }}>
                    <Button variant="primary" size="lg" style={{ width: '100%', justifyContent: 'center' }} icon={ArrowUpRight} iconPosition="right">
                      Ver Oportunidad y Postular
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & PROOF RIBBON */}
      <section className="stats-ribbon">
        <div className="container stats-grid">
          <div className="stat-card">
            <div className="stat-number">+310</div>
            <div className="stat-label">Oportunidades de Venta Activas</div>
            <div className="stat-sub">En 8 comunidades autónomas</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Comisión Íntegra Comercial</div>
            <div className="stat-sub">Sellio nunca resta de tu porcentaje</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">2.0%</div>
            <div className="stat-label">Tarifa Sellio para Empresas</div>
            <div className="stat-sub">Sin costes fijos ni cuotas ocultas</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">&lt; 24h</div>
            <div className="stat-label">Tiempo Medio de Matching</div>
            <div className="stat-sub">Contacto directo con tomadores de decisión</div>
          </div>
        </div>
      </section>

      {/* 3. DUAL VALUE PROPOSITION (TAB SWITCHER) */}
      <section className="dual-value-section">
        <div className="container">
          <div className="section-centered-header">
            <span className="section-pill">DOS LADOS, UN MISMO OBJETIVO</span>
            <h2 className="section-main-title">
              Diseñado para cerrar operaciones, <em>no para perder el tiempo.</em>
            </h2>
            <p className="section-subtitle">
              Tanto si tienes un catálogo que necesita expansión como si eres un comercial buscando maximizar tu cartera.
            </p>

            {/* Tabs Role Selector */}
            <div className="role-switch-pills">
              <button
                type="button"
                className={`role-pill ${activeRoleTab === 'sellers' ? 'active' : ''}`}
                onClick={() => setActiveRoleTab('sellers')}
              >
                <BriefcaseBusiness size={18} />
                <span>Para Comerciales Independientes</span>
              </button>
              <button
                type="button"
                className={`role-pill ${activeRoleTab === 'companies' ? 'active' : ''}`}
                onClick={() => setActiveRoleTab('companies')}
              >
                <Building2 size={18} />
                <span>Para Empresas y Marcas</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeRoleTab === 'sellers' ? (
            <div className="dual-grid animate-fade">
              <div className="feature-box">
                <div className="feature-icon-wrapper blue">
                  <EyeOff size={24} />
                </div>
                <h3>Identidad 100% Protegida</h3>
                <p>
                  Postula con tu alias anónimo (ej. <strong>Comercial #A482</strong>), mostrando tu sector, territorio y años de experiencia sin exponer tu cartera actual hasta que decidas aceptar el acuerdo.
                </p>
              </div>

              <div className="feature-box">
                <div className="feature-icon-wrapper green">
                  <Sparkles size={24} />
                </div>
                <h3>Sellio Match & Explicabilidad</h3>
                <p>
                  El algoritmo puntúa las ofertas según tu zona, idiomas y red de contactos. Sabrás con exactitud por qué encajas antes de gastar un solo minuto.
                </p>
              </div>

              <div className="feature-box">
                <div className="feature-icon-wrapper purple">
                  <Percent size={24} />
                </div>
                <h3>Comisiones Intocables y Directas</h3>
                <p>
                  Tus condiciones quedan congeladas en un snapshot contractual inmutable. Sellio cobra su 2% a la empresa por separado; tu comisión te pertenece 100% a ti.
                </p>
              </div>
            </div>
          ) : (
            <div className="dual-grid animate-fade">
              <div className="feature-box">
                <div className="feature-icon-wrapper orange">
                  <Users size={24} />
                </div>
                <h3>Fuerza de Ventas a Éxito Real</h3>
                <p>
                  Sin costes salariales fijos ni procesos de selección eternos. Publica tu oportunidad y recibe candidaturas de comerciales que ya visitan a tus clientes diana.
                </p>
              </div>

              <div className="feature-box">
                <div className="feature-icon-wrapper blue">
                  <Target size={24} />
                </div>
                <h3>CRM Ligero y Control Territorial</h3>
                <p>
                  Supervisa a todos tus agentes independientes desde un panel único: acuerdos vigentes, volumen de ventas generado por territorio y liquidaciones automáticas.
                </p>
              </div>

              <div className="feature-box">
                <div className="feature-icon-wrapper green">
                  <ShieldCheck size={24} />
                </div>
                <h3>Seguridad Jurídica y Auditoría</h3>
                <p>
                  Contratos con versiones fijas, verificación de CIF e historial inmutable en blockchain/ledger para prevenir cualquier disputa en el cálculo de comisiones.
                </p>
              </div>
            </div>
          )}

          <div className="dual-cta-center">
            <Link to="/register">
              <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                {activeRoleTab === 'sellers' ? 'Crear Perfil Comercial Gratis' : 'Registrar mi Empresa'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. THE ENGINE: HOW SELLIO MATCH WORKS */}
      <section className="engine-showcase-section">
        <div className="container">
          <div className="engine-grid">
            <div className="engine-copy">
              <span className="section-pill">TECNOLOGÍA DE EMPAREJAMIENTO</span>
              <h2>Un motor de matching explicable.<br /><em>Cero cajas negras.</em></h2>
              <p>
                A diferencia de los portales de empleo genéricos, Sellio calcula la afinidad comercial mediante 4 variables ponderadas objetivas.
              </p>

              <div className="engine-breakdown-list">
                <div className="engine-item">
                  <div className="engine-pct">+35%</div>
                  <div>
                    <strong>Afinidad Sectorial</strong>
                    <span>Coincidencia directa con tu sector de especialización (ej. Canal HORECA, Dermofarmacia).</span>
                  </div>
                </div>

                <div className="engine-item">
                  <div className="engine-pct">+30%</div>
                  <div>
                    <strong>Cobertura Territorial</strong>
                    <span>Presencia activa y rutas comerciales en la comunidad o provincia objetivo.</span>
                  </div>
                </div>

                <div className="engine-item">
                  <div className="engine-pct">+20%</div>
                  <div>
                    <strong>Años de Experiencia y Cartera</strong>
                    <span>Trayectoria demostrada en venta B2B y prospección en frío.</span>
                  </div>
                </div>

                <div className="engine-item">
                  <div className="engine-pct">+15%</div>
                  <div>
                    <strong>Idiomas y Certificaciones</strong>
                    <span>Competencias lingüísticas para mercados locales e internacionales.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Engine Mockup */}
            <div className="engine-mockup-card">
              <div className="mockup-header">
                <div className="mockup-score">95%</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#ffffff' }}>Compatibilidad Excelente</h4>
                  <span style={{ fontSize: '0.85rem', color: '#34d399' }}>✓ Alta probabilidad de éxito comercial</span>
                </div>
              </div>

              <div className="mockup-tags">
                <span className="mockup-tag">✓ Vendes en Alimentación B2B</span>
                <span className="mockup-tag">✓ Cubres Cataluña</span>
                <span className="mockup-tag">✓ +12 años de experiencia</span>
                <span className="mockup-tag">✓ Español, Catalán, Inglés</span>
              </div>

              <div className="mockup-footer-note">
                <Lock size={14} />
                <span>Cálculo ejecutado en backend bajo RPC inmutable.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED OPPORTUNITIES PREVIEW */}
      {featuredOpps.length > 0 && (
        <section className="featured-opps-section">
          <div className="container">
            <div className="featured-header">
              <div>
                <span className="section-pill">OPORTUNIDADES DESTACADAS</span>
                <h2>Últimas ofertas validadas en el mercado</h2>
              </div>
              <Link to="/products" className="view-all-link">
                <span>Ver todo el marketplace</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>

            <div className="featured-grid">
              {featuredOpps.map((opp) => (
                <div key={opp.id} className="home-opp-card">
                  <div className="opp-header">
                    <span className="opp-badge-ver"><ShieldCheck size={12} /> {opp.company_name}</span>
                    <span className="opp-match-tag">94% Match</span>
                  </div>

                  <h3 className="opp-title">{opp.product_name || opp.title}</h3>
                  <div className="opp-region">📍 {opp.target_region}</div>

                  <div className="opp-metrics-row">
                    <div>
                      <span className="metric-lbl">Comisión</span>
                      <strong className="metric-val text-green">{opp.commercial_commission_rate}%</strong>
                    </div>
                    <div>
                      <span className="metric-lbl">Precio base</span>
                      <strong className="metric-val">{opp.price} €</strong>
                    </div>
                  </div>

                  <Link to="/products" style={{ marginTop: 'auto' }}>
                    <Button variant="outline" size="sm" style={{ width: '100%', justifyContent: 'center' }} icon={ArrowUpRight}>
                      Ver Ficha
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. TRANSPARENCY & COMMISSION MANIFESTO */}
      <section className="transparency-section">
        <div className="container">
          <div className="transparency-card">
            <div className="transparency-header">
              <Percent size={28} className="text-primary" />
              <h2>Transparencia Económica Radical</h2>
              <p>
                Sin letra pequeña. En Sellio las cuentas son claras desde el primer clic.
              </p>
            </div>

            <div className="transparency-table">
              <div className="table-row head">
                <span>Concepto</span>
                <span className="text-right">Importe / Split</span>
              </div>
              <div className="table-row">
                <span>Venta Bruta Confirmada</span>
                <strong className="text-right">1.000,00 €</strong>
              </div>
              <div className="table-row highlight-seller">
                <span>Comisión Comercial Pactada (15%)</span>
                <strong className="text-right text-green">+150,00 € (100% íntegro)</strong>
              </div>
              <div className="table-row">
                <span>Tarifa de Plataforma Sellio (2% pagado por la empresa)</span>
                <strong className="text-right text-muted">20,00 €</strong>
              </div>
              <div className="table-row total-company">
                <span>Neto Recibido por la Empresa</span>
                <strong className="text-right">830,00 €</strong>
              </div>
            </div>

            <div className="transparency-callout">
              <Sparkles size={16} />
              <span>
                <strong>Garantía Sellio:</strong> La comisión pactada con el comercial nunca sufre retenciones por parte de la plataforma.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL LUXURY CTA BANNER */}
      <section className="final-luxury-cta">
        <div className="container">
          <div className="luxury-cta-box">
            <div className="cta-glow-circle" />
            <span className="eyebrow">ÚNETE A LA NUEVA RED COMERCIAL B2B</span>
            <h2>
              Tu producto tiene valor.<br />
              <em>Ponlo en manos de quien sabe venderlo.</em>
            </h2>
            <p>
              Crea tu cuenta en menos de 2 minutos y empieza a conectar con los mejores comerciales independientes o empresas verificadas de España.
            </p>

            <div className="cta-btn-group">
              <Link to="/products">
                <Button variant="primary" size="lg" icon={ArrowUpRight} iconPosition="right">
                  Explorar Oportunidades
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg">
                  Publicar como Empresa
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;