import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Layers,
  Calculator,
  ShoppingBag,
  Package,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Flame,
  Heart,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { DashboardHeader, StatsCard } from '../../../components/dashboard';
import { opportunitiesService } from '../../../services/opportunities';
import { requestsService } from '../../../services/requests';
import {
  OpportunityCard,
  OpportunityFilters,
  OpportunityCompare,
  OpportunityDetailModal
} from '../../../components/opportunities';
import { CommissionSimulator } from '../../../components/commissions';
import { SellerOnboardingModal } from '../../../components/onboarding';
import { Modal, Button } from '../../../components/common';
import { useSavedOpportunities } from '../../../hooks/useSavedOpportunities';
import { calculateSellioMatch, DEFAULT_COMMERCIAL_PROFILE } from '../../../utils/sellioMatch';
import Products from '../../marketplace/Products';

export const SellerMarketplace = () => {
  const [activeTab, setActiveTab] = useState('for_you'); // 'for_you' | 'radar' | 'all' | 'saved' | 'products' | 'simulator'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Perfil del comercial para matching reactivo
  const [commercialProfile, setCommercialProfile] = useState(DEFAULT_COMMERCIAL_PROFILE);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Hook de guardados inteligentes
  const { savedIds, toggleSave, isSaved, savedCount } = useSavedOpportunities();

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sector: '',
    region: '',
    minCommission: '',
    onlyVerified: false,
    onlyTopMatch: false,
    onlySaved: false,
    sortBy: 'relevant'
  });

  // Comparador de oportunidades
  const [comparingOpps, setComparingOpps] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Ficha Detallada de Oportunidad
  const [selectedOppForDetail, setSelectedOppForDetail] = useState(null);

  // Modal Postulación / Interés Rápido
  const [selectedOppForInterest, setSelectedOppForInterest] = useState(null);
  const [interestMessage, setInterestMessage] = useState('');
  const [interestSubmitted, setInterestSubmitted] = useState(false);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const data = await opportunitiesService.getAll(filters);
      setOpportunities(data);
    } catch (err) {
      console.error('Error al cargar oportunidades:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [filters]);

  const handleToggleCompare = (opp) => {
    if (comparingOpps.some(o => o.id === opp.id)) {
      setComparingOpps(prev => prev.filter(o => o.id !== opp.id));
    } else {
      if (comparingOpps.length >= 3) {
        alert('Puedes comparar un máximo de 3 oportunidades a la vez.');
        return;
      }
      setComparingOpps(prev => [...prev, opp]);
    }
  };

  const handleSendInterest = async (opp, customMsg) => {
    const targetOpp = opp || selectedOppForInterest;
    if (!targetOpp) return;

    try {
      await requestsService.create({
        opportunity_id: targetOpp.id,
        opportunity_title: targetOpp.product_name || targetOpp.title,
        company_id: targetOpp.company_id,
        company_name: targetOpp.company_name,
        seller_id: commercialProfile.id || 'usr_seller_1',
        seller_name: commercialProfile.name || 'Carlos Mendoza',
        message: customMsg || interestMessage || 'Me interesa comercializar este producto en mi territorio.',
        status: 'pending'
      });
      setInterestSubmitted(true);
      setTimeout(() => {
        setInterestSubmitted(false);
        setSelectedOppForInterest(null);
        setInterestMessage('');
      }, 1500);
    } catch (err) {
      console.error('Error al enviar candidatura:', err);
    }
  };

  const handleOnboardingComplete = (preferences) => {
    setCommercialProfile(prev => ({
      ...prev,
      ...preferences
    }));
    setActiveTab('for_you');
  };

  // Filtrado reactivo según la pestaña activa
  const displayedOpportunities = useMemo(() => {
    let list = [...opportunities];

    // Sellio Match dinámico adjunto a cada oportunidad
    list = list.map(opp => ({
      ...opp,
      matchData: calculateSellioMatch(opp, commercialProfile)
    }));

    if (activeTab === 'for_you') {
      list = list.filter(o => o.matchData.score >= 80);
      list.sort((a, b) => b.matchData.score - a.matchData.score);
    } else if (activeTab === 'radar') {
      list = list.filter(o => o.badge_type === 'NUEVA' || o.badge_type === 'ALTA COMISIÓN' || o.commercial_commission_rate >= 15);
    } else if (activeTab === 'saved') {
      list = list.filter(o => isSaved(o.id));
    }

    if (filters.onlyTopMatch) {
      list = list.filter(o => o.matchData.score >= 90);
    }

    if (filters.onlySaved) {
      list = list.filter(o => isSaved(o.id));
    }

    return list;
  }, [opportunities, activeTab, commercialProfile, savedIds, filters.onlyTopMatch, filters.onlySaved]);

  return (
    <div className="seller-marketplace-page">
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <DashboardHeader
          title="Marketplace B2B de Oportunidades Comerciales"
          subtitle="Encuentra productos contrastados, compatibilidad inteligente calculada y comisiones 100% íntegras."
        />

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setIsOnboardingOpen(true)}
            style={{
              padding: '0.6rem 1rem',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <SlidersHorizontal size={15} color="var(--primary)" />
            <span>Ajustar mi Sellio Match</span>
          </button>

          {comparingOpps.length > 0 && (
            <button
              type="button"
              onClick={() => setIsCompareModalOpen(true)}
              style={{
                padding: '0.6rem 1rem',
                background: '#eff6ff',
                border: '1px solid #3b82f6',
                color: '#1d4ed8',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <Layers size={16} />
              <span>Comparar ({comparingOpps.length})</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveTab(activeTab === 'simulator' ? 'for_you' : 'simulator')}
            style={{
              padding: '0.6rem 1rem',
              background: activeTab === 'simulator' ? 'var(--primary)' : '#ffffff',
              border: '1px solid var(--border-card)',
              color: activeTab === 'simulator' ? '#ffffff' : 'var(--text-primary)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Calculator size={16} />
            <span>{activeTab === 'simulator' ? 'Volver al Marketplace' : 'Simulador de Ganancias'}</span>
          </button>
        </div>
      </div>

      {/* Tabs Selector */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginTop: '1.25rem',
        marginBottom: '1.5rem',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '0.5rem',
        overflowX: 'auto'
      }}>
        <button
          type="button"
          onClick={() => setActiveTab('for_you')}
          style={{
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 800,
            fontSize: '0.9rem',
            background: activeTab === 'for_you' ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(59, 130, 246, 0.05) 100%)' : 'transparent',
            color: activeTab === 'for_you' ? 'var(--primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            border: activeTab === 'for_you' ? '1px solid rgba(37, 99, 235, 0.25)' : '1px solid transparent'
          }}
        >
          <Sparkles size={16} color={activeTab === 'for_you' ? 'var(--primary)' : '#64748b'} />
          <span>🧠 Para ti (Sellio Match)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('radar')}
          style={{
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontSize: '0.9rem',
            background: activeTab === 'radar' ? '#fff7ed' : 'transparent',
            color: activeTab === 'radar' ? '#ea580c' : 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            border: activeTab === 'radar' ? '1px solid #fed7aa' : '1px solid transparent'
          }}
        >
          <Flame size={16} color={activeTab === 'radar' ? '#ea580c' : '#64748b'} />
          <span>🔥 Radar de Oportunidades</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('all')}
          style={{
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontSize: '0.9rem',
            background: activeTab === 'all' ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
            color: activeTab === 'all' ? 'var(--primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            border: activeTab === 'all' ? '1px solid rgba(37, 99, 235, 0.2)' : '1px solid transparent'
          }}
        >
          <span>Todas ({opportunities.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('saved')}
          style={{
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontSize: '0.9rem',
            background: activeTab === 'saved' ? '#fff1f2' : 'transparent',
            color: activeTab === 'saved' ? '#e11d48' : 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            border: activeTab === 'saved' ? '1px solid #fecdd3' : '1px solid transparent'
          }}
        >
          <Heart size={15} color={activeTab === 'saved' ? '#e11d48' : '#64748b'} fill={activeTab === 'saved' ? '#e11d48' : 'none'} />
          <span>Guardadas ({savedCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('products')}
          style={{
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontSize: '0.9rem',
            background: activeTab === 'products' ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
            color: activeTab === 'products' ? 'var(--primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            border: activeTab === 'products' ? '1px solid rgba(37, 99, 235, 0.2)' : '1px solid transparent'
          }}
        >
          <Package size={15} />
          <span>Catálogo de Productos</span>
        </button>
      </div>

      {/* Dynamic Content */}
      {activeTab === 'simulator' ? (
        <div style={{ marginTop: '1rem' }}>
          <CommissionSimulator />
        </div>
      ) : activeTab === 'products' ? (
        <Products />
      ) : (
        <div>
          {/* Opportunity Filters */}
          <OpportunityFilters
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters({ search: '', category: '', sector: '', region: '', minCommission: '', onlyVerified: false, onlyTopMatch: false, onlySaved: false, sortBy: 'relevant' })}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            totalResults={displayedOpportunities.length}
            savedCount={savedCount}
          />

          {/* Opportunities View (Grid or List) */}
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Calculando Sellio Match y cargando oportunidades...
            </div>
          ) : displayedOpportunities.length === 0 ? (
            <div style={{ padding: '3.5rem', textAlign: 'center', background: '#fff', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-card)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 800 }}>No hay oportunidades que coincidan con estos filtros</h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Prueba a restablecer los filtros o ajustar tu perfil comercial en Sellio Match.
              </p>
            </div>
          ) : viewMode === 'list' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {displayedOpportunities.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  viewMode="list"
                  isComparing={comparingOpps.some(o => o.id === opp.id)}
                  onCompareToggle={handleToggleCompare}
                  onViewDetail={(o) => setSelectedOppForDetail(o)}
                  onInterestClick={(o) => setSelectedOppForInterest(o)}
                  isSaved={isSaved(opp.id)}
                  onToggleSave={toggleSave}
                />
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
              {displayedOpportunities.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  viewMode="grid"
                  isComparing={comparingOpps.some(o => o.id === opp.id)}
                  onCompareToggle={handleToggleCompare}
                  onViewDetail={(o) => setSelectedOppForDetail(o)}
                  onInterestClick={(o) => setSelectedOppForInterest(o)}
                  isSaved={isSaved(opp.id)}
                  onToggleSave={toggleSave}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Ficha Detallada de Oportunidad Modal */}
      <OpportunityDetailModal
        isOpen={!!selectedOppForDetail}
        opportunity={selectedOppForDetail}
        onClose={() => setSelectedOppForDetail(null)}
        onApply={(opp, msg) => handleSendInterest(opp, msg)}
      />

      {/* Modal Comparador */}
      {isCompareModalOpen && (
        <OpportunityCompare
          opportunities={comparingOpps}
          onClose={() => setIsCompareModalOpen(false)}
          onSelectOpportunity={(o) => {
            setIsCompareModalOpen(false);
            setSelectedOppForDetail(o);
          }}
        />
      )}

      {/* Modal Onboarding Inteligente */}
      <SellerOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
      />

      {/* Modal Me Interesa / Postular Rápido */}
      <Modal
        isOpen={!!selectedOppForInterest}
        onClose={() => setSelectedOppForInterest(null)}
        title="Mostrar Interés y Postular a la Oportunidad"
      >
        {selectedOppForInterest && (
          <form onSubmit={(e) => { e.preventDefault(); handleSendInterest(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: 800 }}>
                {selectedOppForInterest.product_name || selectedOppForInterest.title}
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Empresa: <strong>{selectedOppForInterest.company_name}</strong> | Comisión pactada: <strong style={{ color: '#059669' }}>{selectedOppForInterest.commercial_commission_rate}%</strong>
              </p>
            </div>

            {interestSubmitted ? (
              <div style={{ background: '#ecfdf5', color: '#047857', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', fontWeight: 700 }}>
                <CheckCircle2 size={24} style={{ margin: '0 auto 6px auto' }} />
                ¡Candidatura enviada con éxito! La empresa revisará tu perfil profesional.
              </div>
            ) : (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Mensaje de Presentación o Propuesta Comercial
                  </label>
                  <textarea
                    rows={4}
                    value={interestMessage}
                    onChange={(e) => setInterestMessage(e.target.value)}
                    placeholder="Explica brevemente tu experiencia en el sector, tu cartera de clientes o el territorio que cubres..."
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  🔒 Tu identidad permanece protegida como <strong>Comercial Anónimo ({commercialProfile.code || '#A482'})</strong>.
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <Button variant="secondary" type="button" onClick={() => setSelectedOppForInterest(null)}>
                    Cancelar
                  </Button>
                  <Button variant="primary" type="submit">
                    Enviar Candidatura
                  </Button>
                </div>
              </>
            )}
          </form>
        )}
      </Modal>
    </div>
  );
};

export default SellerMarketplace;
