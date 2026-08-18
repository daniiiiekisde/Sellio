import React from 'react';
import { FileText, CheckCircle2, Clock } from 'lucide-react';

export const CompanyOrders = () => {
  const agreements = [
    { id: 'AC-001', agent: 'Carlos Méndez', territory: 'Cataluña', productLine: 'Aceites & Conservas Gourmet', commission: '15%', startDate: '15 Ene 2026', status: 'Activo' },
    { id: 'AC-002', agent: 'David Serrano', territory: 'Comunidad Valenciana', productLine: 'Aceites Selección', commission: '14%', startDate: '01 Feb 2026', status: 'Activo' }
  ];

  return (
    <div className="company-orders-page">
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Pedidos y Acuerdos Comerciales</h1>
          <p className="dash-subtitle">Seguimiento de acuerdos de representación y contratos de comisión activos.</p>
        </div>
      </div>

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Ref. Acuerdo</th>
              <th>Comercial / Agente</th>
              <th>Territorio Asignado</th>
              <th>Línea de Productos</th>
              <th>Comisión</th>
              <th>Fecha Inicio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {agreements.map(a => (
              <tr key={a.id}>
                <td><strong>{a.id}</strong></td>
                <td>{a.agent}</td>
                <td>{a.territory}</td>
                <td>{a.productLine}</td>
                <td><span className="badge badge-primary">{a.commission}</span></td>
                <td>{a.startDate}</td>
                <td><span className="badge badge-success">{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyOrders;
