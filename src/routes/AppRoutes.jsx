import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Public Pages
import { Home, Login, Register } from '../pages/public';

// Marketplace Pages
import {
  Products,
  Product,
  Companies,
  Company,
  Sellers,
  Seller
} from '../pages/marketplace';

// Role-specific Pages: Company
import {
  CompanyDashboard,
  CompanyProducts,
  CompanyOpportunities,
  CompanyRequests,
  CompanyContacts,
  CompanyMessages,
  CompanyProfile
} from '../pages/company';

// Role-specific Pages: Seller
import {
  SellerDashboard,
  SellerMarketplace,
  SellerCompanies,
  SellerProducts,
  SellerRequests,
  SellerContacts,
  SellerMessages,
  SellerCommissions,
  SellerProfile
} from '../pages/seller';

// Role-specific Pages: Admin
import {
  AdminDashboard,
  AdminUsers,
  AdminCompanies,
  AdminSellers,
  AdminProducts,
  AdminOpportunities,
  AdminTransactions,
  AdminSettings
} from '../pages/admin';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages with PublicLayout (Navbar & Footer) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        
        {/* Marketplace Explorer */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:id" element={<Company />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/sellers/:id" element={<Seller />} />
      </Route>

      {/* Auth Pages with AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Dashboard Pages with DashboardLayout (Sidebar & Topbar) */}
      <Route element={<DashboardLayout />}>
        {/* Company Routes */}
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/company/products" element={<CompanyProducts />} />
        <Route path="/company/opportunities" element={<CompanyOpportunities />} />
        <Route path="/company/requests" element={<CompanyRequests />} />
        <Route path="/company/contacts" element={<CompanyContacts />} />
        <Route path="/company/messages" element={<CompanyMessages />} />
        <Route path="/company/profile" element={<CompanyProfile />} />

        {/* Seller Routes */}
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/marketplace" element={<SellerMarketplace />} />
        <Route path="/seller/companies" element={<SellerCompanies />} />
        <Route path="/seller/products" element={<SellerProducts />} />
        <Route path="/seller/requests" element={<SellerRequests />} />
        <Route path="/seller/contacts" element={<SellerContacts />} />
        <Route path="/seller/messages" element={<SellerMessages />} />
        <Route path="/seller/commissions" element={<SellerCommissions />} />
        <Route path="/seller/profile" element={<SellerProfile />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/companies" element={<AdminCompanies />} />
        <Route path="/admin/sellers" element={<AdminSellers />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/opportunities" element={<AdminOpportunities />} />
        <Route path="/admin/transactions" element={<AdminTransactions />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
