import React, { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Percent, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button, Modal } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';
import { useOpportunities } from '../../../hooks/useOpportunities';
import { SECTORS, REGIONS } from '../../../utils/constants';

export const CompanyOpportunities = () => {
  const { opportunities } = useOpportunities();
  const [modalOpen, setModalOpen] = useState(false);
  const [oppList, setOppList] = useState([
    {
      id: 'opp_1',
      title: 'Búsqueda de Comerciales HORECA para Distribución de Aceite Gourmet',
      sector: 'Alimentación y Bebidas (HORECA)',
      targetTerritory: 'Cataluña / Baleares',
      commissionRate: '15% sobre ventas netas',
      requirements: 'Cartera activa en canal HORECA / Restauración',
      applicationsCount: 4,
      status: 'Activa'
    },
    {
      id: 'opp_2',
      title: 'Agente Comercial para Apertura de Zona Centro en Grandes Cuentas Gourmet',
      sector: 'Alimentación y Bebidas (HORECA)',
      targetTerritory: 'Madrid / Centro',
      commissionRate: '18% + bonus por apertura',
      requirements: 'Experiencia en distribución gourmet de alta gama',
      applicationsCount: 3,
      status: 'Activa'
    }
  ]);

  const [newOpp, setNewOpp] = useState({
    title: '',
    sector: SECTORS[0],
    targetTerritory: REGIONS[0],
    commissionRate: '15%',
    requirements: ''
  });

  const handleAdd = (e) => {
    e.preventDefault();
    setOppList(prev => [
      ...prev,
      { ...newOpp, id: `opp_${Date.now()}`, applicationsCount: 0, status: 'Activa' }
    ]);
    setModalOpen(false);
    setNewOpp({
      title: '',
      sector: SECTORS[0],
      targetTerritory: REGIONS[0],
      commissionRate: '15%',
      requirements: ''
    });
  };

  return (
    <div className="company-opportunities-page">
      <DashboardHeader
        title="Oportunidades de Expansión"
        subtitle="Publica las ofertas de representación territorial para captar comerciales independientes."
        action={
          <Button variant="primary" icon={Plus} onClick={() => setModalOpen(true)}>
            Publicar Nueva Oportunidad
          </Button>
        }
      />

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Título de Oportunidad</th>
              <th>Sector</th>
              <th>Territorio Objetivo</th>
              <th>Comisión Pactada</th>
              <th>Candidaturas</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {oppList.map(o => (
              <tr key={o.id}>
                <td><strong>{o.title}</strong></td>
                <td>{o.sector}</td>
                <td><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />{o.targetTerritory}</td>
                <td><span className="badge badge-primary">{o.commissionRate}</span></td>
                <td><span className="badge badge-success">{o.applicationsCount} candidatos</span></td>
                <td><span className="badge badge-success">{o.status}</span></td>
                <td>
                  <div className="table-actions">
                    <Button variant="ghost" size="sm"><Edit size={16} /></Button>
                    <Button variant="ghost" size="sm"><Trash2 size={16} color="#ef4444" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Publicar Oportunidad de Expansión Comercial"
      >
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Título de la Oportunidad / Perfil buscado</label>
            <input
              type="text"
              className="form-input"
              required
              value={newOpp.title}
              onChange={(e) => setNewOpp({ ...newOpp, title: e.target.value })}
              placeholder="Ej. Comercial HORECA para distribución en Cataluña"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Sector</label>
            <select
              className="form-select"
              value={newOpp.sector}
              onChange={(e) => setNewOpp({ ...newOpp, sector: e.target.value })}
            >
              {SECTORS.map((s, i) => <option key={i} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Zona o Territorio Objetivo</label>
            <select
              className="form-select"
              value={newOpp.targetTerritory}
              onChange={(e) => setNewOpp({ ...newOpp, targetTerritory: e.target.value })}
            >
              {REGIONS.map((r, i) => <option key={i} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Comisión Ofrecida</label>
            <input
              type="text"
              className="form-input"
              required
              value={newOpp.commissionRate}
              onChange={(e) => setNewOpp({ ...newOpp, commissionRate: e.target.value })}
              placeholder="Ej. 15% sobre facturación neta"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Requisitos del Comercial / Cartera</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={newOpp.requirements}
              onChange={(e) => setNewOpp({ ...newOpp, requirements: e.target.value })}
              placeholder="Ej. Cartera consolidada de clientes en canal HORECA, mínimo 3 años de experiencia..."
            />
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Publicar en Marketplace</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CompanyOpportunities;
