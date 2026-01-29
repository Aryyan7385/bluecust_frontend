import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Droplet, LogOut, Package, CheckCircle, Clock, AlertCircle, TrendingUp, DollarSign, Users, Filter } from 'lucide-react';
import { useAuth, API } from '../App';
import { toast } from 'sonner';

const SupplierDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [stats, setStats] = useState({
    pending: 0,
    completed: 0,
    revenue: 0,
    totalOrders: 0
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // This endpoint would need to be created in your backend to fetch orders assigned to this supplier
      const response = await axios.get(`${API}/orders/supplier/${user.email}`);
      setOrders(response.data);
      
      // Calculate stats
      const pending = response.data.filter(o => o.status === 'pending').length;
      const completed = response.data.filter(o => o.status === 'completed').length;
      const revenue = response.data.reduce((sum, o) => sum + (o.total_amount || 0), 0);
      
      setStats({
        pending,
        completed,
        revenue,
        totalOrders: response.data.length
      });
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`${API}/orders/${orderId}/status`, { status: newStatus });
      toast.success('Order status updated successfully!');
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to update order status');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'in_progress': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'completed': return 'bg-green-100 text-green-700 border-green-300';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <Package className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Droplet className="w-9 h-9 text-primary-500" />
              <div className="absolute inset-0 blur-lg bg-primary-500/30 animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-syne font-bold text-primary-900">BlueCust</span>
              <p className="text-xs text-slate-500 font-medium">Supplier Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-xs text-slate-500">Welcome back</p>
              <p className="font-semibold text-primary-900">{user?.business_name}</p>
            </div>
            <Button
              data-testid="logout-btn"
              onClick={handleLogout}
              variant="ghost"
              className="text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-syne font-bold text-primary-900 mb-2">Supplier Dashboard</h1>
            <p className="text-slate-600">Manage order fulfillment and track your supply operations</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <Card className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-200/50 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Pending Orders</p>
                    <h3 className="text-3xl font-bold text-primary-900">{stats.pending}</h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-200/50 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Completed</p>
                    <h3 className="text-3xl font-bold text-primary-900">{stats.completed}</h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-200/50 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
                    <h3 className="text-3xl font-bold text-primary-900">₹{stats.revenue.toLocaleString()}</h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg">
                    <DollarSign className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-200/50 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Total Orders</p>
                    <h3 className="text-3xl font-bold text-primary-900">{stats.totalOrders}</h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filter and Orders Section */}
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="bg-white/60 backdrop-blur-sm border border-slate-200 shadow-sm">
              <TabsTrigger 
                data-testid="orders-tab" 
                value="orders" 
                className="data-[state=active]:bg-primary-500 data-[state=active]:text-white"
              >
                <Package className="w-4 h-4 mr-2" /> Order Management
              </TabsTrigger>
              <TabsTrigger 
                data-testid="analytics-tab" 
                value="analytics" 
                className="data-[state=active]:bg-primary-500 data-[state=active]:text-white"
              >
                <TrendingUp className="w-4 h-4 mr-2" /> Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              {/* Filter Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Card className="backdrop-blur-xl bg-white/60 border border-white/50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <Filter className="w-5 h-5 text-slate-500" />
                      <div className="flex-1">
                        <Label className="text-sm text-slate-600 mb-2 block">Filter by Status</Label>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                          <SelectTrigger className="bg-white/50 border-slate-200 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Orders</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Orders List */}
              <div className="grid gap-6">
                {loading ? (
                  <Card className="backdrop-blur-xl bg-white/60 border border-white/50">
                    <CardContent className="py-12 text-center">
                      <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-slate-500">Loading orders...</p>
                    </CardContent>
                  </Card>
                ) : filteredOrders.length === 0 ? (
                  <Card className="backdrop-blur-xl bg-white/60 border border-white/50">
                    <CardContent className="py-12 text-center">
                      <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">No orders found matching your filter</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredOrders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="backdrop-blur-xl bg-white/60 border border-white/50 hover:shadow-xl transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <CardTitle className="text-xl font-syne text-primary-900">
                                  Order #{order.id.slice(0, 8)}
                                </CardTitle>
                                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status || 'pending')}`}>
                                  {getStatusIcon(order.status || 'pending')}
                                  <span className="capitalize">{order.status || 'pending'}</span>
                                </span>
                              </div>
                              <CardDescription className="text-sm">
                                Ordered on {new Date(order.order_date).toLocaleDateString('en-IN', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-slate-500">Customer</p>
                              <p className="font-semibold text-primary-900">{order.user_email}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Quantity</p>
                              <p className="text-2xl font-bold text-primary-900">{order.quantity}</p>
                              <p className="text-sm text-slate-600">bottles</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Total Amount</p>
                              <p className="text-2xl font-bold text-primary-900">₹{order.total_amount}</p>
                              <p className="text-sm text-slate-600">@ ₹16/bottle</p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Payment Mode</p>
                              <p className="text-lg font-bold text-primary-900 capitalize">{order.payment_mode}</p>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div>
                              <p className="text-sm text-slate-500 mb-2 font-medium">Sticker Text</p>
                              <p className="text-primary-900 font-semibold bg-slate-50 rounded-lg px-4 py-2 border border-slate-200">
                                {order.sticker_text}
                              </p>
                            </div>
                            {order.sticker_design_notes && (
                              <div>
                                <p className="text-sm text-slate-500 mb-2 font-medium">Design Notes</p>
                                <p className="text-slate-700 bg-slate-50 rounded-lg px-4 py-2 border border-slate-200">
                                  {order.sticker_design_notes}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                            <Button
                              onClick={() => handleUpdateOrderStatus(order.id, 'in_progress')}
                              disabled={order.status === 'in_progress' || order.status === 'completed'}
                              className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Package className="w-4 h-4 mr-2" /> Mark In Progress
                            </Button>
                            <Button
                              onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                              disabled={order.status === 'completed'}
                              className="rounded-full bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" /> Mark Completed
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="backdrop-blur-xl bg-white/60 border border-white/50">
                  <CardHeader>
                    <CardTitle className="text-2xl font-syne text-primary-900">Performance Analytics</CardTitle>
                    <CardDescription>Track your supply performance and revenue trends</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-100">
                        <h4 className="font-semibold text-primary-900 mb-4">Order Completion Rate</h4>
                        <div className="flex items-end space-x-4">
                          <p className="text-5xl font-bold text-primary-500">
                            {stats.totalOrders > 0 ? Math.round((stats.completed / stats.totalOrders) * 100) : 0}%
                          </p>
                          <div className="flex-1">
                            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary-500 to-cyan-400 rounded-full transition-all duration-1000"
                                style={{ width: `${stats.totalOrders > 0 ? (stats.completed / stats.totalOrders) * 100 : 0}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                        <h4 className="font-semibold text-primary-900 mb-4">Average Order Value</h4>
                        <p className="text-5xl font-bold text-green-600">
                          ₹{stats.totalOrders > 0 ? Math.round(stats.revenue / stats.totalOrders) : 0}
                        </p>
                        <p className="text-sm text-slate-600 mt-2">Per order</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                      <h4 className="font-semibold text-primary-900 mb-4">Quick Stats</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-purple-600">{stats.totalOrders}</p>
                          <p className="text-sm text-slate-600 mt-1">Total Orders</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-blue-600">{stats.pending}</p>
                          <p className="text-sm text-slate-600 mt-1">Pending</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                          <p className="text-sm text-slate-600 mt-1">Completed</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-primary-600">₹{stats.revenue.toLocaleString()}</p>
                          <p className="text-sm text-slate-600 mt-1">Revenue</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
