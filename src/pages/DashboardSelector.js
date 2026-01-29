import React from 'react';
import { useAuth } from '../App';
import CustomerDashboard from './CustomerDashboard'; 
import SupplierDashboard from './SupplierDashboard';
import AdminDashboard from './AdminDashboard';

const DashboardSelector = () => {
  const { user } = useAuth();
  
  // 1. If the user is a Super Admin (you), show the Admin Panel
  if (user?.is_admin) {
    return <AdminDashboard />;
  }

  // 2. If user is a Venture (Hotel/Cafe), show the Order Dashboard
  const isVenture = ['restaurant', 'hotel', 'cafe'].includes(user?.business_type);
  if (isVenture) {
    return <CustomerDashboard />;
  }
  
  // 3. Otherwise, show the Supplier Portal for manufacturers/water suppliers
  return <SupplierDashboard />;
};

export default DashboardSelector;
