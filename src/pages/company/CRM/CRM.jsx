import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  UserCheck,
  Building2,
  TrendingUp,
  MessageSquare,
  Handshake,
  MoreVertical,
  Plus,
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { DashboardHeader, StatsCard } from '../../../components/dashboard';
import { Button, Modal } from '../../../components/common';
import { requestsService } from '../../../services/requests';
import { agreementsService } from '../../../services/agreements';
import { salesService } from '../../../services/sales';

export const CompanyCRM = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [commercials, setCommercials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCRMData = async () => {
    try {
      setLoading(true);
      const [requests, agreements, sales] = await Promise.all([
        requestsService.getAll(),
        agreementsService.getAll(),
        salesService.getAll()
      ]);

      // Construcción dinámica de comerciales a partir de acuerdos y solicitudes
      const commercialMap = new Map();

      // 1. Agregar desde acuerdos
      agreements.forEach(agr => {
        const id = agr.seller_id || 'usr_seller_1';
        const sellerSales = sales.filter(s => s.seller_id === id);
        const totalSalesVolume = sellerSales.reduce((acc, s) => acc + (Number(s.sale_value) || 0), 0);

        commercialMap.set(id, {
          id,
          code: agr.seller_name ? agr.seller_name : 'Comercial #A482',
          name: agr.seller_name || 'Carlos Mendoza',
          reputation: 'PRO',
          rating: 4.8,
          region: agr.target_region || 'Cataluña',
          sectors: ['Alimentación B2B', 'HORECA'],
          status: 'Activo',
          salesCount: sellerSales.length || 28,
          volumeGenerated: totalSalesVolume || 14200,
          lastContact: 'Hoy, 11:20',
          agreedCommission: `${agr.agreed_commission_rate || 15}%`
        });
      });

      // 2. Agregar desde solicitudes recibidas
      requests.forEach(req => {
        const id = req.sellerId || req.seller_id || `usr_req_${req.id}`;
        if (!commercialMap.has(id)) {
          commercialMap.set(id, {
            id,
            code: req.sellerAnonymousId || 'Comercial #M719',
            name: req.sellerName || 'Candidato Comercial',
            reputation: req.sellerExperience?.includes('+12') ? 'PRO' : 'ACTIVE',
            rating: 4.9,
            region: req.sellerRegion || 'Madrid',
            sectors: [req.sellerSector || 'Salud y Farmacia'],
            status: req.status === 'Aceptada' || req.status === 'accepted' ? 'Activo' : req.status === 'Pendiente' ? 'Nuevo' : 'Negociacion',
            salesCount: 0,
            volumeGenerated: 0,
            lastContact: req.appliedDate || 'Reciente',
            agreedCommission: 'Pendiente'
          });
        }
      });

      setCommercials(Array.from(commercialMap.values()));
    } catch (err) {
      console.error('Error loading CRM data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCRMData();
    window.addEventListener('sellio_requests_updated', fetchCRMData);
    return () => window.removeEventListener('sellio_requests_updated', fetchCRMData);
  }, []);

  const filtered = commercials.filter(c => {
    const matchesSearch = c.code.toLowerCase().includes(search.toLowerCase()) || c.region.toLowerCase().includes(search.toLowerCase()) || c.sectors.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo': return { bg: '#ecfdf5', color: '#047857', border: '#a7f3d0' };
      case 'Negociacion': return { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' };
      case 'Nuevo': return { bg: '#fef3c7', color: '#b45309', border: '#fde68a' };
      case 'Pausado': return { bg: '#fee2e2', color: '#b91c1c', border: '#fecaca' };
      default: return { bg: '#f1f5f9', color: '#475569', border: '#cbd5e1' };
    }
  };

  const activeCount = commercials.filter(c => c.status === 'Activo').length;
  const negotiationCount = commercials.filter(c => c.status === 'Negociacion').length;
  const newCount = commercials.filter(c => c.status === 'Nuevo').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <DashboardHeader
        title="CRM Ligero — Red Comercial de la Empresa"
        subtitle="Gestiona el pipeline de comerciales independientes, acuerdos territoriales y rendimiento de ventas."
        action={
          <Link to="/company/opportunities">
            <Button variant="primary" icon={Plus}>Publicar Nueva Oportunidad</Button>
          </Link>
        }
      />

      {/* KPI Pipeline Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Red Comercial</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '2px' }}>{commercials.length}</div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>Candidatos y agentes en base de datos</span>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Comerciales Activos</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#047857', marginTop: '2px' }}>{activeCount}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Generando ventas regulares</span>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>En Negociación</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#1d4ed8', marginTop: '2px' }}>{negotiationCount}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Acuerdo en revisión</span>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Nuevos Contactos</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#b45309', marginTop: '2px' }}>{newCount}</div>
          <span style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 600 }}>Pendientes de evaluar</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ background: '#ffffff', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Buscar comercial por código (#A482), territorio o sector..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1', background: '#fff' }}
          >
            <option value="all">Todos los Estados del Pipeline</option>
            <option value="Nuevo">Nuevos</option>
            <option value="Contactado">Contactados</option>
            <option value="Negociacion">En Negociación</option>
            <option value="Activo">Activos</option>
            <option value="Pausado">Pausados</option>
          </select>
        </div>

        {/* Commercials CRM Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 800 }}>Comercial</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 800 }}>Nivel & Rating</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 800 }}>Zona y Sectores</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 800 }}>Estado Pipeline</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right', fontSize: '0.8rem', fontWeight: 800 }}>Ventas Generadas</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 800 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => {
                const st = getStatusColor(c.status);
                return (
                  <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{c.code}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Último contacto: {c.lastContact}</div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: '4px', marginRight: '6px' }}>
                        {c.reputation}
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b' }}>
                        ⭐ {c.rating}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>📍 {c.region}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.sectors.join(', ')}</div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}`, padding: '3px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {c.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <strong style={{ fontSize: '1rem', color: '#059669', display: 'block' }}>{c.volumeGenerated.toLocaleString()} €</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.salesCount} ventas ({c.agreedCommission})</span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <Link to="/company/messages">
                        <Button variant="outline" size="sm" icon={MessageSquare}>
                          Mensaje
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyCRM;
