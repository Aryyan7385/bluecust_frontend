import React from 'react';
import { useAuth } from '../App';
import CustomerDashboard from './CustomerDashboard';
import SupplierDashboard from './SupplierDashboard';
import ManufacturerDashboard from './ManufacturerDashboard';

const DashboardSelector = () => {
  const { user } = useAuth();

  // Route to appropriate dashboard based on user role
  // Assuming user object has a 'role' field: 'venture', 'supplier', or 'manufacturer'
  // If no role field exists, you can check user.user_type or similar field
  
  const userRole = user?.role || user?.user_type || 'venture'; // Default to venture if no role specified

  switch(userRole.toLowerCase()) {
    case 'supplier':
    case 'water_supplier':
      return <SupplierDashboard />;
    
    case 'manufacturer':
    case 'bottle_manufacturer':
      return <ManufacturerDashboard />;
    
    case 'venture':
    case 'customer':
    case 'hotel':
    case 'cafe':
    case 'restaurant':
    default:
      return <CustomerDashboard />;
  }
};

export default DashboardSelector;
