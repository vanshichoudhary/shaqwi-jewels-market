import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  Users, 
  ShoppingCart, 
  BarChart3,
  Settings,
  FileText,
  MessageSquare,
  Bell,
  ChevronRight,
  Star,
  TrendingUp,
  Eye,
  Search,
  Filter,
  Upload,
  Gem,
  Menu,
  Home,
  Lock
} from 'lucide-react';
import { productService, Product } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image_url: '',
    in_stock: true
  });

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading Gemstone Admin...</p>
        </div>
      </div>
    );
  }

  // Redirect if not logged in or not admin
  if (!user || !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  // Load products from Supabase
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      try {
        setLoading(true);
        const productData = {
          ...newProduct,
          price: Number(newProduct.price)
        };
        
        await productService.addProduct(productData);
        
        toast({
          title: "Success",
          description: "Gemstone product added successfully",
        });
        
        setNewProduct({
          name: '',
          price: '',
          category: '',
          description: '',
          image_url: '',
          in_stock: true
        });
        setShowAddProduct(false);
        await loadProducts();
        
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add gemstone product",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      setLoading(true);
      await productService.deleteProduct(id);
      
      toast({
        title: "Success",
        description: "Gemstone product deleted successfully",
      });
      
      await loadProducts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete gemstone product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { 
      title: 'Total Users', 
      value: '277', 
      change: '+95%',
      trend: 'up',
      icon: Users,
      gradient: 'from-emerald-500 to-emerald-600',
      bgPattern: 'emerald'
    },
    { 
      title: 'Total Orders', 
      value: '338', 
      change: '+30%',
      trend: 'up',
      icon: ShoppingCart,
      gradient: 'from-fuchsia-500 to-purple-600',
      bgPattern: 'fuchsia'
    },
    { 
      title: 'Total Products', 
      value: products.length.toString(), 
      change: '+25%',
      trend: 'up',
      icon: Gem,
      gradient: 'from-blue-500 to-blue-600',
      bgPattern: 'blue'
    },
    { 
      title: 'Total Reviews', 
      value: '166', 
      change: '+45%',
      trend: 'up',
      icon: Star,
      gradient: 'from-amber-500 to-orange-500',
      bgPattern: 'amber'
    },
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, expandable: false },
    { 
      id: 'authentication', 
      label: 'Authentication', 
      icon: Lock,
      expandable: true,
      subItems: [
        { id: 'login', label: 'Login' },
        { id: 'registration', label: 'Registration' },
        { id: 'reset-password', label: 'Reset Password' }
      ]
    },
    { id: 'users', label: 'Users', icon: Users, badge: 'HOT', badgeColor: 'bg-red-500', expandable: false },
    { id: 'products', label: 'Products', icon: Gem, badge: 'NEW', badgeColor: 'bg-purple-500', expandable: false },
    { id: 'invoices', label: 'Invoices', icon: FileText, expandable: false },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: '5', badgeColor: 'bg-blue-500', expandable: false },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '3', badgeColor: 'bg-blue-500', expandable: false },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: '9', badgeColor: 'bg-blue-500', expandable: false },
    { id: 'settings', label: 'Settings', icon: Settings, expandable: false },
    { id: 'blank', label: 'Blank Page', icon: FileText, expandable: false },
  ];

  const sampleProducts = [
    {
      id: '1',
      name: 'Emerald Sapphire Necklace Premium',
      category: 'necklaces',
      brand: 'Gemstone Co',
      price: 1250,
      originalPrice: 1500,
      stock: 30,
      rating: 4.9,
      reviews: 16,
      orders: 380,
      sales: '$38k',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100'
    },
    {
      id: '2',
      name: 'Royal Sapphire Ring Classic',
      category: 'rings',
      brand: 'Royal Gems',
      price: 890,
      originalPrice: 1100,
      stock: 23,
      rating: 4.5,
      reviews: 38,
      orders: 189,
      sales: '$9k',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white/95 backdrop-blur-md shadow-2xl border-r border-purple-200/50 min-h-screen transition-all duration-300 relative z-10`}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-purple-200/50 bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-600 text-white flex items-center justify-center rounded-xl font-bold shadow-lg">
                  <Gem className="w-6 h-6" />
                </div>
                {!sidebarCollapsed && (
                  <div className="ml-3">
                    <h1 className="text-lg font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">Gemstone Admin</h1>
                    <p className="text-xs text-purple-600">Luxury Management</p>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="lg:hidden"
              >
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-3">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <div key={item.id} className="mb-1">
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-3 py-3 text-left rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-purple-600'}`} />
                    {!sidebarCollapsed && (
                      <>
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge className={`ml-auto text-xs px-2 py-0.5 ${item.badgeColor} text-white border-0 shadow-md`}>
                            {item.badge}
                          </Badge>
                        )}
                        {item.expandable && (
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-white/95 backdrop-blur-md shadow-lg border-b border-purple-200/50">
            <div className="px-6 py-4">
              {/* Breadcrumb */}
              <div className="flex items-center text-sm text-purple-600 mb-2">
                <Home className="w-4 h-4 mr-1" />
                <span>Home</span>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span>Dashboard</span>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-purple-900 font-medium">Ecommerce</span>
              </div>
              
              {/* Page Title */}
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 via-blue-700 to-emerald-700 bg-clip-text text-transparent">
                  Gemstone Ecommerce
                </h1>
                <div className="text-sm text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                  Welcome, {user.email}
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* KPI Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                        <CardContent className={`p-6 bg-gradient-to-br ${stat.gradient} text-white relative`}>
                          <div className="flex items-center justify-between relative z-10">
                            <div>
                              <p className="text-sm opacity-90 mb-1">{stat.title}</p>
                              <p className="text-3xl font-bold mb-2">{stat.value}</p>
                              <div className="flex items-center text-sm">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                <span>{stat.change} Last Month</span>
                              </div>
                            </div>
                            <Icon className="w-12 h-12 opacity-30" />
                          </div>
                          {/* Gemstone-inspired pattern */}
                          <div className="absolute -right-6 -top-6 w-20 h-20 bg-white/10 rounded-full"></div>
                          <div className="absolute -right-12 -bottom-12 w-24 h-24 bg-white/5 rounded-full"></div>
                          <div className="absolute right-4 bottom-4 w-8 h-8 bg-white/10 transform rotate-45"></div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Total Sales - Large Featured Card */}
                <Card className="border-0 shadow-2xl overflow-hidden">
                  <CardContent className="p-8 bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 text-white relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                      <div>
                        <p className="text-lg opacity-90 mb-2">Total Gemstone Sales</p>
                        <p className="text-5xl font-bold mb-4">$3,787,681.00</p>
                        <div className="flex items-center text-lg mb-4">
                          <TrendingUp className="w-6 h-6 mr-2" />
                          <span>40.63% increase</span>
                        </div>
                        <p className="text-sm opacity-75">$3,578.90 in last month from premium gemstones</p>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                          <Gem className="w-16 h-16 text-white/80" />
                        </div>
                      </div>
                    </div>
                    {/* Background pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
                  </CardContent>
                </Card>

                {/* Best Selling Products Section */}
                <Card className="border-0 shadow-xl">
                  <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-blue-50">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-2xl font-bold text-purple-900 flex items-center">
                        <Gem className="w-6 h-6 mr-2" />
                        Best Selling Gemstone Products
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                          <Filter className="w-4 h-4 mr-2" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                          <Search className="w-4 h-4 mr-2" />
                          Search
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gradient-to-r from-purple-50 to-blue-50">
                            <TableHead className="font-semibold text-purple-900">UID</TableHead>
                            <TableHead className="font-semibold text-purple-900">Product</TableHead>
                            <TableHead className="font-semibold text-purple-900">Category</TableHead>
                            <TableHead className="font-semibold text-purple-900">Brand</TableHead>
                            <TableHead className="font-semibold text-purple-900">Price</TableHead>
                            <TableHead className="font-semibold text-purple-900">Stock</TableHead>
                            <TableHead className="font-semibold text-purple-900">Rating</TableHead>
                            <TableHead className="font-semibold text-purple-900">Orders</TableHead>
                            <TableHead className="font-semibold text-purple-900">Sales</TableHead>
                            <TableHead className="font-semibold text-purple-900">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sampleProducts.map((product, index) => (
                            <TableRow key={product.id} className="hover:bg-purple-50/50 transition-colors">
                              <TableCell className="font-medium text-purple-700">#{index + 1}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-12 h-12 rounded-lg object-cover border-2 border-purple-200"
                                  />
                                  <div>
                                    <p className="font-medium text-gray-900">{product.name}</p>
                                    <p className="text-sm text-purple-600">Premium gemstone jewelry</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="capitalize border-purple-200 text-purple-700">
                                  {product.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-gray-600">{product.brand}</TableCell>
                              <TableCell>
                                <div>
                                  <span className="font-semibold text-emerald-600">
                                    ${product.price.toLocaleString()}
                                  </span>
                                  <span className="text-sm text-gray-400 line-through ml-2">
                                    ${product.originalPrice.toLocaleString()}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-blue-600 font-medium">{product.stock}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                                  <span className="font-medium">{product.rating}</span>
                                  <span className="text-gray-500 ml-1">({product.reviews})</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium text-blue-600">{product.orders}</TableCell>
                              <TableCell className="font-semibold text-emerald-600">{product.sales}</TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-purple-200 hover:bg-purple-50">
                                    <Eye className="w-4 h-4 text-purple-600" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-blue-200 hover:bg-blue-50">
                                    <Edit className="w-4 h-4 text-blue-600" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-red-200 hover:bg-red-50">
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent flex items-center">
                    <Gem className="w-8 h-8 mr-3 text-purple-600" />
                    Gemstone Products
                  </h2>
                  <Button 
                    onClick={() => setShowAddProduct(true)} 
                    disabled={loading}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Gemstone Product
                  </Button>
                </div>

                {/* Add Product Form */}
                {showAddProduct && (
                  <Card className="border-0 shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                      <CardTitle className="flex items-center text-purple-900">
                        <Upload className="w-5 h-5 mr-2" />
                        Add New Premium Gemstone Product
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name" className="text-sm font-medium text-purple-900">Product Name</Label>
                            <Input
                              id="name"
                              value={newProduct.name}
                              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                              placeholder="e.g., Emerald Sapphire Necklace Premium"
                              className="mt-1 border-purple-200 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <Label htmlFor="price" className="text-sm font-medium text-purple-900">Price (AED)</Label>
                            <Input
                              id="price"
                              type="number"
                              value={newProduct.price}
                              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                              placeholder="0"
                              className="mt-1 border-purple-200 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <Label htmlFor="category" className="text-sm font-medium text-purple-900">Gemstone Category</Label>
                            <select
                              id="category"
                              value={newProduct.category}
                              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                              className="w-full mt-1 border border-purple-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                              <option value="">Select Gemstone Category</option>
                              <option value="necklaces">Gemstone Necklaces</option>
                              <option value="pendants">Gemstone Pendants</option>
                              <option value="bracelets">Gemstone Bracelets</option>
                              <option value="rings">Gemstone Rings</option>
                              <option value="earrings">Gemstone Earrings</option>
                              <option value="anklets">Gemstone Anklets</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="image" className="text-sm font-medium text-purple-900">Image URL</Label>
                            <Input
                              id="image"
                              value={newProduct.image_url}
                              onChange={(e) => setNewProduct({...newProduct, image_url: e.target.value})}
                              placeholder="https://..."
                              className="mt-1 border-purple-200 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <Label htmlFor="description" className="text-sm font-medium text-purple-900">Gemstone Description</Label>
                            <textarea
                              id="description"
                              value={newProduct.description}
                              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                              className="w-full mt-1 border border-purple-200 rounded-md px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder="Describe the premium gemstone product, its properties, and craftsmanship..."
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button 
                          onClick={handleAddProduct} 
                          disabled={loading}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          {loading ? 'Adding...' : 'Add Gemstone Product'}
                        </Button>
                        <Button variant="outline" onClick={() => setShowAddProduct(false)} className="border-purple-200 text-purple-700 hover:bg-purple-50">
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Products Grid */}
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto"></div>
                    <p className="mt-4 text-purple-600">Loading gemstone products...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <Card key={product.id} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                        <CardContent className="p-0">
                          <div className="relative">
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                                Premium
                              </Badge>
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="font-semibold text-lg mb-2 text-gray-900">{product.name}</h3>
                            <Badge variant="outline" className="mb-3 capitalize border-purple-200 text-purple-700">
                              {product.category}
                            </Badge>
                            <p className="text-2xl font-bold text-emerald-600 mb-4">
                              AED {product.price?.toLocaleString()}
                            </p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDeleteProduct(product.id!)}
                                disabled={loading}
                                className="border-red-200 text-red-500 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Other tabs content */}
            {['users', 'orders', 'messages', 'notifications', 'settings', 'invoices', 'authentication', 'blank'].includes(activeTab) && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent capitalize flex items-center">
                  <Gem className="w-8 h-8 mr-3 text-purple-600" />
                  {activeTab.replace('-', ' ')} Management
                </h2>
                <Card className="border-0 shadow-xl overflow-hidden">
                  <CardContent className="p-12 text-center bg-gradient-to-br from-purple-50 to-blue-50">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <Package className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-purple-900 mb-4">
                      {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')} Management
                    </h3>
                    <p className="text-purple-700 text-lg">
                      Advanced {activeTab} management features for your gemstone business coming soon...
                    </p>
                    <div className="mt-6 inline-flex items-center text-purple-600">
                      <Gem className="w-5 h-5 mr-2" />
                      <span className="text-sm">Premium gemstone business tools</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
