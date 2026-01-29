import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Droplet, LogOut, Package, Users, Plus, Truck, ShoppingCart } from 'lucide-react';
import { useAuth, API } from '../App';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [suppliers, setSuppliers] = useState([]);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(`${API}/admin/suppliers`);
      setSuppliers(response.data);
    } catch (error) { toast.error('Failed to fetch suppliers'); }
  };

  useEffect(() => { fetchSuppliers(); }, []);

  const handleInventoryOrder = (supplierName, type) => {
    toast.success(`Inventory order triggered for ${supplierName} (${type.replace('_', ' ')})`);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <nav className="fixed top-0 w-full z-50 bg-primary-900 text-white px-8 py-4 flex justify-between items-center shadow-2xl">
        <div className="flex items-center space-x-2">
          <Droplet className="w-8 h-8 text-primary" />
          <span className="text-2xl font-syne font-bold">BlueCust <span className="text-primary">Admin</span></span>
        </div>
        <Button onClick={() => { logout(); navigate('/'); }} variant="ghost" className="hover:bg-white/10"><LogOut className="mr-2 h-4 w-4"/> Logout</Button>
      </nav>

      <div className="pt-28 pb-12 px-8 max-w-7xl mx-auto">
        <Tabs defaultValue="suppliers" className="space-y-8">
          <TabsList className="bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
            <TabsTrigger value="suppliers" className="rounded-xl px-8 data-[state=active]:bg-primary data-[state=active]:text-white"><Truck className="mr-2 h-4 w-4"/> Supplier Connect</TabsTrigger>
            <TabsTrigger value="orders" className="rounded-xl px-8 data-[state=active]:bg-primary data-[state=active]:text-white"><Package className="mr-2 h-4 w-4"/> Customer Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="suppliers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliers.map((s) => (
                <Card key={s.id} className="border-none shadow-xl rounded-[2rem] overflow-hidden hover:scale-[1.02] transition-transform">
                  <div className={`h-3 ${s.supplier_type === 'bottle_manufacturer' ? 'bg-orange-500' : 'bg-primary'}`} />
                  <CardHeader>
                    <CardTitle className="font-syne text-xl text-primary-900">{s.name}</CardTitle>
                    <CardDescription className="uppercase font-bold text-xs tracking-widest text-slate-400">{s.supplier_type.replace('_', ' ')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-2xl italic">"{s.address}"</div>
                    <Button onClick={() => handleInventoryOrder(s.name, s.supplier_type)} className="w-full h-12 rounded-xl bg-primary-900 text-white font-bold">
                       <ShoppingCart className="mr-2 h-4 w-4"/> Order Inventory
                    </Button>
                  </CardContent>
                </Card>
              ))}
              <Card className="border-2 border-dashed border-slate-300 rounded-[2rem] flex flex-col items-center justify-center p-12 text-slate-400 hover:border-primary hover:text-primary transition-all cursor-pointer">
                 <Plus className="h-12 w-12 mb-4" />
                 <p className="font-bold text-lg">Add New Platform Partner</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
