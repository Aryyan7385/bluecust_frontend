import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Droplet, Package, Truck, LogOut } from 'lucide-react';
import { useAuth, API } from '../App';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const SupplierDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Droplet className="w-8 h-8 text-primary-500" />
          <span className="text-2xl font-syne font-bold text-primary-900">Partner Portal</span>
        </div>
        <Button onClick={() => { logout(); navigate('/'); }} variant="ghost" className="text-red-600"><LogOut className="mr-2 h-4 w-4"/> Logout</Button>
      </nav>

      <div className="pt-28 px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-primary-900 mb-8">Welcome, {user?.business_name}</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="rounded-3xl border-none shadow-lg">
            <CardHeader><CardTitle className="flex items-center"><Package className="mr-2 text-primary-500"/> Batch Requests</CardTitle></CardHeader>
            <CardContent><p className="text-4xl font-bold">0</p><p className="text-slate-500">Active production orders</p></CardContent>
          </Card>
          <Card className="rounded-3xl border-none shadow-lg">
            <CardHeader><CardTitle className="flex items-center"><Truck className="mr-2 text-primary-500"/> Logistics</CardTitle></CardHeader>
            <CardContent><p className="text-lg font-bold">All deliveries completed</p></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
