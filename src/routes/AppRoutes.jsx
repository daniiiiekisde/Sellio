import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Public & General Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Products from '../pages/Products';
import Product from '../pages/Product';
import Companies from '../pages/Companies';
import Company from '../pages/Company';
import Sellers from '../pages/Sellers';
import Seller from '../pages/Seller';
import Messages from '../pages/Messages';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Dashboard from '../pages/Dashboard';

// Role-specific Pages: Company
import CompanyDashboard from '../pages/company/Dashboard';
import CompanyProducts from '../pages/company/Products';
import CompanyRequests from '../pages/company/Requests';
import CompanyOrders from '../pages/company/Orders';
import CompanyProfile from '../pages/company/Profile';

// Role-specific Pages: Seller
import SellerDashboard from '../pages/seller/Dashboard';
import SellerMarketplace from '../pages/seller/Marketplace';
import SellerCompanies from '../pages/seller/Companies';
import SellerContacts from '../pages/seller/Contacts';
import SellerCommissions from '../pages/seller/Commissions';
import SellerProfile from '../pages/seller/Profile';

// Role-specific Pages: Admin
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminCompanies from '../pages/admin/Companies';
import AdminSellers from '../pages/admin/Sellers';
import AdminProducts from '../pages/admin/Products';
import AdminTransactions from '../pages/admin/Transactions';
import AdminSettings from '../pages/admin/Settings';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages with PublicLayout (Navbar & Footer) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:id" element={<Company />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/sellers/:id" element={<Seller />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
        <Route path="/company/requests" element={<CompanyRequests />} />
        <Route path="/company/orders" element={<CompanyOrders />} />
        <Route path="/company/profile" element={<CompanyProfile />} />

        {/* Seller Routes */}
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/marketplace" element={<SellerMarketplace />} />
        <Route path="/seller/companies" element={<SellerCompanies />} />
        <Route path="/seller/contacts" element={<SellerContacts />} />
        <Route path="/seller/commissions" element={<SellerCommissions />} />
        <Route path="/seller/profile" element={<SellerProfile />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/companies" element={<AdminCompanies />} />
        <Route path="/admin/sellers" element={<AdminSellers />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/transactions" element={<AdminTransactions />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
