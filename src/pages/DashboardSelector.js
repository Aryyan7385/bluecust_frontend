import React from 'react';
import { useAuth } from '../App';
import CustomerDashboard from './CustomerDashboard'; // For Hotels/Cafes
import SupplierDashboard from './SupplierDashboard'; // For Water/Bottle Partners
import AdminDashboard from './AdminDashboard'; // For your Admin control

const DashboardSelector = () => {
  const { user } = useAuth();
  
  // 1. Check for Admin
  if (user?.is_admin) return <AdminDashboard />;

  // 2. Separate Ventures (Hotels/Cafes) from Suppliers
  const isVenture = ['restaurant', 'hotel', 'cafe'].includes(user?.business_type);
  
  return isVenture ? <CustomerDashboard /> : <SupplierDashboard />;
};

export default DashboardSelector;
