import React, { useState, useEffect } from 'react';
import { Sparkles, Layers, Calculator, ShoppingBag, Package, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { DashboardHeader, StatsCard } from '../../../components/dashboard';
import { opportunitiesService } from '../../../services/opportunities';
import { requestsService } from '../../../services/requests';
import { OpportunityCard, OpportunityFilters, OpportunityCompare } from '../../../components/opportunities';
import { CommissionSimulator } from '../../../components/commissions';
import { Modal, Button } from '../../../components/common';
import Products from '../../marketplace/Products';

export const SellerMarketplace = () => {
  const [activeTab, setActiveTab] = useState('opportunities'); // 'opportunities' | 'products' | 'simulator'
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sector: '',
    region: '',
    minCommission: '',
    onlyVerified: false,
    sortBy: 'relevant'
  });

  // Comparador de oportunidades
  const [comparingOpps, setComparingOpps] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Modal Postulación / Interés
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

  const handleSendInterest = async (e) => {
    e.preventDefault();
    if (!selectedOppForInterest) return;

    try {
      await requestsService.create({
        opportunity_id: selectedOppForInterest.id,
        opportunity_title: selectedOppForInterest.product_name || selectedOppForInterest.title,
        company_id: selectedOppForInterest.company_id,
        company_name: selectedOppForInterest.company_name,
        seller_id: 'usr_seller_1',
        seller_name: 'Carlos Mendoza',
        message: interestMessage || 'Me interesa comercializar este producto en mi territorio.',
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

  return (
    <div className="seller-marketplace-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <DashboardHeader
          title="Marketplace de Oportunidades Comerciales"
          subtitle="Encuentra productos contrastados, negocia acuerdos y cobra comisiones 100% íntegras."
        />

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
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
            onClick={() => setActiveTab(activeTab === 'simulator' ? 'opportunities' : 'simulator')}
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
            <span>{activeTab === 'simulator' ? 'Volver a Ofertas' : 'Simulador de Ganancias'}</span>
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
        paddingBottom: '0.5rem'
      }}>
        <button
          type="button"
          onClick={() => setActiveTab('opportunities')}
          style={{
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontSize: '0.9rem',
            background: activeTab === 'opportunities' ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
            color: activeTab === 'opportunities' ? 'var(--primary)' : 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          Oportunidades de Venta ({opportunities.length})
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
            cursor: 'pointer'
          }}
        >
          Catálogo Completo de Productos
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
            onReset={() => setFilters({ search: '', category: '', sector: '', region: '', minCommission: '', onlyVerified: false, sortBy: 'relevant' })}
          />

          {/* Grid de Oportunidades */}
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Buscando oportunidades compatibles...
            </div>
          ) : opportunities.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', background: '#fff', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-card)' }}>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                No se encontraron oportunidades con los filtros seleccionados.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
              {opportunities.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  isComparing={comparingOpps.some(o => o.id === opp.id)}
                  onCompareToggle={handleToggleCompare}
                  onInterestClick={(o) => setSelectedOppForInterest(o)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal Comparador */}
      {isCompareModalOpen && (
        <OpportunityCompare
          opportunities={comparingOpps}
          onClose={() => setIsCompareModalOpen(false)}
          onSelectOpportunity={(o) => {
            setIsCompareModalOpen(false);
            setSelectedOppForInterest(o);
          }}
        />
      )}

      {/* Modal Me Interesa / Postular */}
      <Modal
        isOpen={!!selectedOppForInterest}
        onClose={() => setSelectedOppForInterest(null)}
        title="Mostrar Interés y Postular a la Oportunidad"
      >
        {selectedOppForInterest && (
          <form onSubmit={handleSendInterest} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                  Tu identidad permanecerá protegida como Comercial Anónimo hasta que la empresa acepte el contacto formal.
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
