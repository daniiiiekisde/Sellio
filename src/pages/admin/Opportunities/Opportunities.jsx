import React from 'react';
import { Sparkles, MapPin, Building2, CheckCircle2, ShieldCheck, Trash2 } from 'lucide-react';
import { Button } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';
import { useOpportunities } from '../../../hooks/useOpportunities';

export const AdminOpportunities = () => {
  const { opportunities } = useOpportunities();

  return (
    <div className="admin-opportunities-page">
      <DashboardHeader
        title="Moderación de Oportunidades Comerciales"
        subtitle="Supervisa las ofertas de representación publicadas por las empresas fabricantes."
      />

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Oportunidad</th>
              <th>Empresa</th>
              <th>Sector</th>
              <th>Territorio</th>
              <th>Comisión</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map(o => (
              <tr key={o.id}>
                <td><strong>{o.title}</strong></td>
                <td>{o.company}</td>
                <td>{o.sector}</td>
                <td><MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} />{o.targetTerritory}</td>
                <td><span className="badge badge-primary">{o.commissionRate}</span></td>
                <td><span className="badge badge-success">{o.status || 'Publicada'}</span></td>
                <td>
                  <div className="table-actions">
                    <Button variant="ghost" size="sm"><Trash2 size={16} color="#ef4444" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOpportunities;
