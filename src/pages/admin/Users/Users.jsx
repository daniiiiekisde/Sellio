import React from 'react';
import { Users, Shield, Check, X } from 'lucide-react';
import { Button } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';

export const AdminUsers = () => {
  const users = [
    { id: 'U-1', name: 'Laura Sánchez', email: 'laura@iberiagourmet.com', role: 'Empresa', date: '10 Ene 2026', status: 'Activo' },
    { id: 'U-2', name: 'Carlos Méndez', email: 'carlos.mendez@example.com', role: 'Comercial', date: '12 Ene 2026', status: 'Activo' },
    { id: 'U-3', name: 'Marcos Riera', email: 'marcos@solartech.com', role: 'Empresa', date: '18 Ene 2026', status: 'Activo' }
  ];

  return (
    <div className="admin-users-page">
      <DashboardHeader
        title="Gestión de Usuarios"
        subtitle="Listado y administración de cuentas registradas en Sellio."
      />

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        <table className="dash-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Registro</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td><strong>{u.id}</strong></td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><span className="badge badge-primary">{u.role}</span></td>
                <td>{u.date}</td>
                <td><span className="badge badge-success">{u.status}</span></td>
                <td>
                  <div className="table-actions">
                    <Button variant="ghost" size="sm">Editar</Button>
                    <Button variant="ghost" size="sm" style={{ color: 'var(--danger)' }}>Bloquear</Button>
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

export default AdminUsers;
