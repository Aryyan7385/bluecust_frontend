import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Droplet, LogOut, Package, Download, Plus, CheckCircle2, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { useAuth, API } from '../App';
import { toast } from 'sonner';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderForm, setOrderForm] = useState({
    quantity: '',
    sticker_text: '',
    sticker_design_notes: '',
    payment_mode: ''
  });
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalBottles: 0,
    totalSpent: 0
  });

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API}/orders/user/${user.email}`);
      setOrders(response.data);
      
      // Calculate stats
      const totalBottles = response.data.reduce((sum, order) => sum + (order.quantity || 0), 0);
      const totalSpent = response.data.reduce((sum, order) => sum + (order.total_amount || 0), 0);
      
      setStats({
        totalOrders: response.data.length,
        totalBottles,
        totalSpent
      });
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/orders?user_email=${user.email}`, orderForm);
      toast.success('Order created successfully!');
      setOrderForm({ quantity: '', sticker_text: '', sticker_design_notes: '', payment_mode: '' });
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async (orderId) => {
    try {
      const response = await axios.get(`${API}/orders/${orderId}/pdf`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `BlueCust_Order_${orderId.slice(0, 8)}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Bill downloaded!');
    } catch (error) {
      toast.error('Failed to download bill');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
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
              <p className="text-xs text-slate-500 font-medium">Venture Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-xs text-slate-500">Welcome</p>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-syne font-bold text-primary-900 mb-2">Venture Dashboard</h1>
            <p className="text-slate-600">Manage your custom branded bottle orders</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-200/50 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Total Orders</p>
                    <h3 className="text-3xl font-bold text-primary-900">{stats.totalOrders}</h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg">
                    <Package className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-200/50 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Total Bottles</p>
                    <h3 className="text-3xl font-bold text-primary-900">{stats.totalBottles.toLocaleString()}</h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-200/50 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Total Spent</p>
                    <h3 className="text-3xl font-bold text-primary-900">₹{stats.totalSpent.toLocaleString()}</h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                    <DollarSign className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="bg-white/60 backdrop-blur-sm border border-slate-200 shadow-sm">
              <TabsTrigger data-testid="orders-tab" value="orders" className="data-[state=active]:bg-primary-500 data-[state=active]:text-white">
                <Package className="w-4 h-4 mr-2" /> My Orders
              </TabsTrigger>
              <TabsTrigger data-testid="new-order-tab" value="new-order" className="data-[state=active]:bg-primary-500 data-[state=active]:text-white">
                <Plus className="w-4 h-4 mr-2" /> Place New Order
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <div className="grid gap-6">
                {orders.length === 0 ? (
                  <Card className="backdrop-blur-xl bg-white/60 border border-white/50">
                    <CardContent className="py-16 text-center">
                      <Package className="w-20 h-20 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-slate-700 mb-2">No orders yet</h3>
                      <p className="text-slate-500 mb-6">Start building your brand with custom bottles</p>
                      <Button 
                        onClick={() => document.querySelector('[value="new-order"]').click()}
                        className="rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 text-white shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
                      >
                        <Plus className="w-4 h-4 mr-2" /> Place Your First Order
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  orders.map((order) => (
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
                                <CardTitle className="text-xl font-syne text-primary-900">Order #{order.id.slice(0, 8)}</CardTitle>
                                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-300">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Confirmed</span>
                                </span>
                              </div>
                              <CardDescription className="flex items-center space-x-2 text-sm">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(order.order_date).toLocaleDateString('en-IN', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}</span>
                              </CardDescription>
                            </div>
                            <Button
                              data-testid={`download-btn-${order.id}`}
                              onClick={() => handleDownloadPDF(order.id)}
                              className="rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 text-white shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
                            >
                              <Download className="w-4 h-4 mr-2" /> Download Bill
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-3 gap-4 mb-6">
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
                              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Payment</p>
                              <p className="text-lg font-bold text-primary-900 capitalize">{order.payment_mode}</p>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-slate-500 mb-2 font-medium">Brand Name on Sticker</p>
                              <p className="font-semibold text-primary-900 bg-slate-50 rounded-lg px-4 py-2 border border-slate-200">
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
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="new-order">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="backdrop-blur-xl bg-white/60 border border-white/50">
                  <CardHeader>
                    <CardTitle className="text-2xl font-syne text-primary-900">Place New Order</CardTitle>
                    <CardDescription>Fill in the details for your custom branded bottle order</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreateOrder} className="space-y-6">
                      <div>
                        <Label htmlFor="quantity" className="text-slate-700 font-medium mb-2 block">
                          Quantity (Number of Bottles) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="quantity"
                          data-testid="quantity-input"
                          type="number"
                          min="1"
                          required
                          value={orderForm.quantity}
                          onChange={(e) => setOrderForm({ ...orderForm, quantity: e.target.value })}
                          className="bg-white/50 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3 text-lg"
                          placeholder="e.g., 100"
                        />
                        {orderForm.quantity && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
                          >
                            <p className="text-sm text-slate-600 mb-1">Order Summary</p>
                            <p className="text-2xl font-bold text-green-700">
                              ₹{(orderForm.quantity * 16).toLocaleString()} <span className="text-sm font-normal text-slate-600">Total</span>
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {orderForm.quantity} bottles × ₹16 per bottle
                            </p>
                          </motion.div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="sticker_text" className="text-slate-700 font-medium mb-2 block">
                          Brand Name for Sticker <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="sticker_text"
                          data-testid="sticker-text-input"
                          type="text"
                          required
                          value={orderForm.sticker_text}
                          onChange={(e) => setOrderForm({ ...orderForm, sticker_text: e.target.value })}
                          className="bg-white/50 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3 text-lg"
                          placeholder="e.g., The Grand Hotel"
                        />
                        <p className="text-xs text-slate-500 mt-2">This will be printed on your bottle labels</p>
                      </div>

                      <div>
                        <Label htmlFor="sticker_design_notes" className="text-slate-700 font-medium mb-2 block">
                          Design Notes (Optional)
                        </Label>
                        <Textarea
                          id="sticker_design_notes"
                          data-testid="design-notes-input"
                          value={orderForm.sticker_design_notes}
                          onChange={(e) => setOrderForm({ ...orderForm, sticker_design_notes: e.target.value })}
                          className="bg-white/50 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3"
                          placeholder="Any specific design requirements, colors, logos, fonts, etc."
                          rows={4}
                        />
                        <p className="text-xs text-slate-500 mt-2">Include details about colors, logos, or special design elements</p>
                      </div>

                      <div>
                        <Label htmlFor="payment_mode" className="text-slate-700 font-medium mb-2 block">
                          Payment Mode <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={orderForm.payment_mode}
                          onValueChange={(value) => setOrderForm({ ...orderForm, payment_mode: value })}
                          required
                        >
                          <SelectTrigger data-testid="payment-mode-select" className="bg-white/50 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3 text-lg">
                            <SelectValue placeholder="Select payment mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="online">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span>Online Payment (UPI: 7385751471@ybl)</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="cash">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <span>Cash on Delivery</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="pt-4 border-t border-slate-200">
                        <Button
                          data-testid="submit-order-btn"
                          type="submit"
                          disabled={loading}
                          className="w-full rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 text-white shadow-xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 font-bold tracking-wide px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Placing Order...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-5 h-5 mr-2" />
                              Place Order
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
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

export default CustomerDashboard;
