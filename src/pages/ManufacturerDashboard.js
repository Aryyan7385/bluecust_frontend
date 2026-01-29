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
import { Droplet, LogOut, Package, CheckCircle, Clock, AlertCircle, Factory, BarChart3, PackageCheck, PackageX, Filter, Eye } from 'lucide-react';
import { useAuth, API } from '../App';
import { toast } from 'sonner';

const ManufacturerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [productionRequests, setProductionRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [stats, setStats] = useState({
    pending: 0,
    inProduction: 0,
    completed: 0,
    totalBottles: 0
  });

  const fetchProductionRequests = async () => {
    try {
      setLoading(true);
      // This endpoint would need to be created in your backend to fetch production requests for this manufacturer
      const response = await axios.get(`${API}/production/manufacturer/${user.email}`);
      setProductionRequests(response.data);
      
      // Calculate stats
      const pending = response.data.filter(r => r.status === 'pending').length;
      const inProduction = response.data.filter(r => r.status === 'in_production').length;
      const completed = response.data.filter(r => r.status === 'completed').length;
      const totalBottles = response.data.reduce((sum, r) => sum + (r.quantity || 0), 0);
      
      setStats({
        pending,
        inProduction,
        completed,
        totalBottles
      });
    } catch (error) {
      toast.error('Failed to fetch production requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductionRequests();
  }, []);

  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      await axios.patch(`${API}/production/${requestId}/status`, { status: newStatus });
      toast.success('Production status updated successfully!');
      fetchProductionRequests();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to update status');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const filteredRequests = filterStatus === 'all' 
    ? productionRequests 
    : productionRequests.filter(request => request.status === filterStatus);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'in_production': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'completed': return 'bg-green-100 text-green-700 border-green-300';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in_production': return <Factory className="w-4 h-4" />;
      case 'completed': return <PackageCheck className="w-4 h-4" />;
      case 'rejected': return <PackageX className="w-4 h-4" />;
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
              <p className="text-xs text-slate-500 font-medium">Manufacturer Portal</p>
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
            <h1 className="text-4xl font-syne font-bold text-primary-900 mb-2">Manufacturer Dashboard</h1>
            <p className="text-slate-600">Track production requests and manage bottle manufacturing</p>
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
                    <p className="text-sm text-slate-600 mb-1">Pending Requests</p>
                    <h3 className="text-3xl font-bold text-primary-900">{stats.pending}</h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-200/50 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">In Production</p>
                    <h3 className="text-3xl font-bold text-primary-900">{stats.inProduction}</h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg">
                    <Factory className="w-7 h-7 text-white" />
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
                    <PackageCheck className="w-7 h-7 text-white" />
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
                    <Package className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="requests" className="space-y-6">
            <TabsList className="bg-white/60 backdrop-blur-sm border border-slate-200 shadow-sm">
              <TabsTrigger 
                data-testid="requests-tab" 
                value="requests" 
                className="data-[state=active]:bg-primary-500 data-[state=active]:text-white"
              >
                <Package className="w-4 h-4 mr-2" /> Production Requests
              </TabsTrigger>
              <TabsTrigger 
                data-testid="analytics-tab" 
                value="analytics" 
                className="data-[state=active]:bg-primary-500 data-[state=active]:text-white"
              >
                <BarChart3 className="w-4 h-4 mr-2" /> Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="requests">
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
                            <SelectItem value="all">All Requests</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_production">In Production</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Production Requests List */}
              <div className="grid gap-6">
                {loading ? (
                  <Card className="backdrop-blur-xl bg-white/60 border border-white/50">
                    <CardContent className="py-12 text-center">
                      <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-slate-500">Loading production requests...</p>
                    </CardContent>
                  </Card>
                ) : filteredRequests.length === 0 ? (
                  <Card className="backdrop-blur-xl bg-white/60 border border-white/50">
                    <CardContent className="py-12 text-center">
                      <Factory className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">No production requests found matching your filter</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredRequests.map((request) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="backdrop-blur-xl bg-white/60 border border-white/50 hover:shadow-xl transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <CardTitle className="text-xl font-syne text-primary-900">
                                  Request #{request.id.slice(0, 8)}
                                </CardTitle>
                                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(request.status || 'pending')}`}>
                                  {getStatusIcon(request.status || 'pending')}
                                  <span className="capitalize">{request.status?.replace('_', ' ') || 'pending'}</span>
                                </span>
                              </div>
                              <CardDescription className="text-sm">
                                Requested on {new Date(request.created_at).toLocaleDateString('en-IN', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-slate-500">Venture</p>
                              <p className="font-semibold text-primary-900">{request.venture_name}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Quantity Required</p>
                              <p className="text-2xl font-bold text-primary-900">{request.quantity}</p>
                              <p className="text-sm text-slate-600">bottles</p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Brand Name</p>
                              <p className="text-lg font-bold text-primary-900">{request.sticker_text}</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Deadline</p>
                              <p className="text-lg font-bold text-primary-900">
                                {request.deadline ? new Date(request.deadline).toLocaleDateString('en-IN') : 'No deadline'}
                              </p>
                            </div>
                          </div>

                          {request.sticker_design_notes && (
                            <div className="mb-6">
                              <p className="text-sm text-slate-500 mb-2 font-medium">Design Specifications</p>
                              <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
                                <p className="text-slate-700">{request.sticker_design_notes}</p>
                              </div>
                            </div>
                          )}

                          {/* Production Details */}
                          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-4 border border-primary-100 mb-6">
                            <h4 className="font-semibold text-primary-900 mb-3 flex items-center">
                              <Factory className="w-4 h-4 mr-2" />
                              Production Specifications
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-slate-500">Bottle Type</p>
                                <p className="font-semibold text-primary-900">{request.bottle_type || '500ml PET'}</p>
                              </div>
                              <div>
                                <p className="text-slate-500">Label Type</p>
                                <p className="font-semibold text-primary-900">{request.label_type || 'Adhesive Sticker'}</p>
                              </div>
                              <div>
                                <p className="text-slate-500">Cap Color</p>
                                <p className="font-semibold text-primary-900">{request.cap_color || 'Standard Blue'}</p>
                              </div>
                              <div>
                                <p className="text-slate-500">Special Requirements</p>
                                <p className="font-semibold text-primary-900">{request.special_requirements || 'None'}</p>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                            <Button
                              onClick={() => handleUpdateStatus(request.id, 'in_production')}
                              disabled={request.status === 'in_production' || request.status === 'completed'}
                              className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Factory className="w-4 h-4 mr-2" /> Start Production
                            </Button>
                            <Button
                              onClick={() => handleUpdateStatus(request.id, 'completed')}
                              disabled={request.status === 'completed' || request.status === 'pending'}
                              className="rounded-full bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <PackageCheck className="w-4 h-4 mr-2" /> Mark Completed
                            </Button>
                            <Button
                              onClick={() => setSelectedRequest(request)}
                              variant="outline"
                              className="rounded-full border-2 border-primary-500 text-primary-700 hover:bg-primary-50 transition-all"
                            >
                              <Eye className="w-4 h-4 mr-2" /> View Details
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
                className="space-y-6"
              >
                {/* Performance Overview */}
                <Card className="backdrop-blur-xl bg-white/60 border border-white/50">
                  <CardHeader>
                    <CardTitle className="text-2xl font-syne text-primary-900">Production Analytics</CardTitle>
                    <CardDescription>Track your manufacturing performance and efficiency</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-100">
                        <h4 className="font-semibold text-primary-900 mb-4">Completion Rate</h4>
                        <div className="flex items-end space-x-4">
                          <p className="text-5xl font-bold text-primary-500">
                            {productionRequests.length > 0 ? Math.round((stats.completed / productionRequests.length) * 100) : 0}%
                          </p>
                          <div className="flex-1">
                            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary-500 to-cyan-400 rounded-full transition-all duration-1000"
                                style={{ width: `${productionRequests.length > 0 ? (stats.completed / productionRequests.length) * 100 : 0}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                        <h4 className="font-semibold text-primary-900 mb-4">Average Production Volume</h4>
                        <p className="text-5xl font-bold text-green-600">
                          {productionRequests.length > 0 ? Math.round(stats.totalBottles / productionRequests.length).toLocaleString() : 0}
                        </p>
                        <p className="text-sm text-slate-600 mt-2">bottles per request</p>
                      </div>
                    </div>

                    {/* Status Distribution */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                      <h4 className="font-semibold text-primary-900 mb-4">Request Status Distribution</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-white/50 rounded-lg border border-purple-200">
                          <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                          <p className="text-sm text-slate-600 mt-1">Pending</p>
                        </div>
                        <div className="text-center p-4 bg-white/50 rounded-lg border border-purple-200">
                          <Factory className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                          <p className="text-3xl font-bold text-blue-600">{stats.inProduction}</p>
                          <p className="text-sm text-slate-600 mt-1">In Production</p>
                        </div>
                        <div className="text-center p-4 bg-white/50 rounded-lg border border-purple-200">
                          <PackageCheck className="w-8 h-8 text-green-500 mx-auto mb-2" />
                          <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                          <p className="text-sm text-slate-600 mt-1">Completed</p>
                        </div>
                        <div className="text-center p-4 bg-white/50 rounded-lg border border-purple-200">
                          <Package className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                          <p className="text-3xl font-bold text-purple-600">{stats.totalBottles.toLocaleString()}</p>
                          <p className="text-sm text-slate-600 mt-1">Total Bottles</p>
                        </div>
                      </div>
                    </div>

                    {/* Production Capacity */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                      <h4 className="font-semibold text-primary-900 mb-4">Current Production Load</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-slate-600">Pending + In Production</span>
                            <span className="text-sm font-semibold text-primary-900">{stats.pending + stats.inProduction} requests</span>
                          </div>
                          <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000"
                              style={{ width: `${productionRequests.length > 0 ? ((stats.pending + stats.inProduction) / productionRequests.length) * 100 : 0}%` }}
                            />
                          </div>
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

export default ManufacturerDashboard;
