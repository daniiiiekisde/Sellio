import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../components/navigation';
import './PublicLayout.css';

export const PublicLayout = () => {
  return (
    <div className="public-layout">
      <Navbar />
      <main className="public-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
