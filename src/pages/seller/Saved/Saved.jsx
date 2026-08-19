import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Folder, Tag, ArrowRight, ShoppingBag } from 'lucide-react';
import { DashboardHeader } from '../../../components/dashboard';
import { OpportunityCard, OpportunityDetailModal } from '../../../components/opportunities';
import { opportunitiesService } from '../../../services/opportunities';
import { useSavedOpportunities } from '../../../hooks/useSavedOpportunities';
import { Button } from '../../../components/common';

export const SellerSaved = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [selectedOppForDetail, setSelectedOppForDetail] = useState(null);

  const { savedIds, toggleSave, isSaved, savedCount } = useSavedOpportunities();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await opportunitiesService.getAll();
        setOpportunities(data.filter(o => savedIds.includes(o.id)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [savedIds]);

  const folders = [
    { id: 'all', label: 'Todas las Guardadas', count: savedIds.length },
    { id: 'priority', label: '⭐ Prioridad Inmediata', count: 1 },
    { id: 'high_comm', label: '🔥 Alta Comisión (>15%)', count: opportunities.filter(o => (o.commercial_commission_rate || 0) >= 15).length },
    { id: 'territory', label: '📍 Territorio Cataluña', count: opportunities.filter(o => (o.target_region || '').includes('Cataluña')).length }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <DashboardHeader
        title="Oportunidades Guardadas e Inteligentes"
        subtitle="Organiza tus productos y oportunidades favoritas en carpetas de seguimiento."
        action={
          <Link to="/seller/marketplace">
            <Button variant="primary" icon={ShoppingBag}>Explorar Más en Marketplace</Button>
          </Link>
        }
      />

      {/* Folders Bar */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {folders.map(f => (
          <button
            key={f.id}
            type="button"
            onClick={() => setSelectedFolder(f.id)}
            style={{
              padding: '0.6rem 1.1rem',
              borderRadius: 'var(--radius-lg)',
              border: selectedFolder === f.id ? '2px solid var(--primary)' : '1px solid #cbd5e1',
              background: selectedFolder === f.id ? '#eff6ff' : '#ffffff',
              color: selectedFolder === f.id ? 'var(--primary)' : 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Folder size={15} color={selectedFolder === f.id ? 'var(--primary)' : '#64748b'} />
            <span>{f.label} ({f.count})</span>
          </button>
        ))}
      </div>

      {/* Saved Opportunities List */}
      {loading ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Cargando guardados...
        </div>
      ) : opportunities.length === 0 ? (
        <div style={{ background: '#ffffff', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: '3.5rem', textAlign: 'center' }}>
          <Heart size={40} color="#cbd5e1" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 800 }}>No tienes oportunidades guardadas en esta carpeta</h3>
          <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Pulsa el icono de corazón en cualquier tarjeta del marketplace para guardarla aquí.
          </p>
          <Link to="/seller/marketplace">
            <Button variant="primary">Ir al Marketplace</Button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {opportunities.map(opp => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              isSaved={isSaved(opp.id)}
              onToggleSave={toggleSave}
              onViewDetail={(o) => setSelectedOppForDetail(o)}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <OpportunityDetailModal
        isOpen={!!selectedOppForDetail}
        opportunity={selectedOppForDetail}
        onClose={() => setSelectedOppForDetail(null)}
      />
    </div>
  );
};

export default SellerSaved;
