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
  Gem
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading Admin Panel...</p>
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
          description: "Product added successfully",
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
          description: "Failed to add product",
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
        description: "Product deleted successfully",
      });
      
      await loadProducts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
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
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      textColor: 'text-white'
    },
    { 
      title: 'Total Orders', 
      value: '338', 
      change: '+30%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-gradient-to-br from-fuchsia-500 to-purple-600',
      textColor: 'text-white'
    },
    { 
      title: 'Total Products', 
      value: products.length.toString(), 
      change: '+25%',
      trend: 'up',
      icon: Gem,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      textColor: 'text-white'
    },
    { 
      title: 'Total Reviews', 
      value: '166', 
      change: '+45%',
      trend: 'up',
      icon: Star,
      color: 'bg-gradient-to-br from-amber-500 to-orange-500',
      textColor: 'text-white'
    },
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, expandable: false },
    { 
      id: 'authentication', 
      label: 'Authentication', 
      icon: 'lock',
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
      name: 'Emerald Necklace Premium',
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
      name: 'Sapphire Ring Classic',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white shadow-xl border-r border-slate-200 min-h-screen transition-all duration-300 relative`}>
          {/* Logo */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center rounded-xl font-bold">
                <Gem className="w-6 h-6" />
              </div>
              {!sidebarCollapsed && (
                <div className="ml-3">
                  <h1 className="text-lg font-bold text-gray-900">Gem Admin</h1>
                  <p className="text-xs text-gray-500">Jewelry Management</p>
                </div>
              )}
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
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-slate-100'
                    }`}
                  >
                    {typeof Icon === 'string' ? (
                      <div className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-500'}`}>🔒</div>
                    ) : (
                      <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    )}
                    {!sidebarCollapsed && (
                      <>
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge className={`ml-auto text-xs px-2 py-0.5 ${item.badgeColor} text-white border-0`}>
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
          <div className="bg-white shadow-sm border-b border-slate-200">
            <div className="px-6 py-4">
              {/* Breadcrumb */}
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>Home</span>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span>Dashboard</span>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-gray-900 font-medium">Ecommerce</span>
              </div>
              
              {/* Page Title */}
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Ecommerce</h1>
                <div className="text-sm text-gray-600">
                  Welcome, {user.email}
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {stats.slice(0, 3).map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className={`p-6 ${stat.color} ${stat.textColor} relative overflow-hidden`}>
                          <div className="flex items-center justify-between relative z-10">
                            <div>
                              <p className="text-sm opacity-90 mb-1">{stat.title}</p>
                              <p className="text-3xl font-bold mb-2">{stat.value}</p>
                              <div className="flex items-center text-sm">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                <span>{stat.change} Last Month</span>
                              </div>
                            </div>
                            <Icon className="w-12 h-12 opacity-20" />
                          </div>
                          {/* Decorative background pattern */}
                          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full"></div>
                          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full"></div>
                        </CardContent>
                      </Card>
                    );
                  })}
                  
                  {/* Total Sales - Large Card */}
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 xl:col-span-1">
                    <CardContent className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white relative overflow-hidden">
                      <div className="relative z-10">
                        <p className="text-sm opacity-90 mb-1">Total Sales</p>
                        <p className="text-4xl font-bold mb-2">$3,787,681.00</p>
                        <div className="flex items-center text-sm mb-4">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span>40.63% increase</span>
                        </div>
                        <p className="text-xs opacity-75">$3,578.90 in last month</p>
                      </div>
                      {/* Mini chart background */}
                      <div className="absolute bottom-0 right-0 w-32 h-16 opacity-20">
                        <svg viewBox="0 0 100 40" className="w-full h-full">
                          <polyline
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            points="0,30 20,25 40,15 60,20 80,10 100,5"
                          />
                        </svg>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Best Selling Products Section */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-bold">Best Selling Products</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="w-4 h-4 mr-2" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm">
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
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-semibold">UID</TableHead>
                            <TableHead className="font-semibold">Product</TableHead>
                            <TableHead className="font-semibold">Category</TableHead>
                            <TableHead className="font-semibold">Brand</TableHead>
                            <TableHead className="font-semibold">Price</TableHead>
                            <TableHead className="font-semibold">Stock</TableHead>
                            <TableHead className="font-semibold">Rating</TableHead>
                            <TableHead className="font-semibold">Orders</TableHead>
                            <TableHead className="font-semibold">Sales</TableHead>
                            <TableHead className="font-semibold">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sampleProducts.map((product, index) => (
                            <TableRow key={product.id} className="hover:bg-slate-50">
                              <TableCell className="font-medium">#{index + 1}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-12 h-12 rounded-lg object-cover"
                                  />
                                  <div>
                                    <p className="font-medium text-gray-900">{product.name}</p>
                                    <p className="text-sm text-gray-500">Gemstone jewelry</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="capitalize">
                                  {product.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-gray-600">{product.brand}</TableCell>
                              <TableCell>
                                <div>
                                  <span className="font-semibold text-gray-900">
                                    ${product.price.toLocaleString()}
                                  </span>
                                  <span className="text-sm text-gray-400 line-through ml-2">
                                    ${product.originalPrice.toLocaleString()}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>{product.stock}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                                  <span className="font-medium">{product.rating}</span>
                                  <span className="text-gray-500 ml-1">({product.reviews})</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{product.orders}</TableCell>
                              <TableCell className="font-semibold text-green-600">{product.sales}</TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                                    <Trash2 className="w-4 h-4" />
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
                  <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                  <Button 
                    onClick={() => setShowAddProduct(true)} 
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </div>

                {/* Add Product Form */}
                {showAddProduct && (
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Upload className="w-5 h-5 mr-2" />
                        Add New Gemstone Product
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name" className="text-sm font-medium">Product Name</Label>
                            <Input
                              id="name"
                              value={newProduct.name}
                              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                              placeholder="e.g., Emerald Necklace Premium"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="price" className="text-sm font-medium">Price (AED)</Label>
                            <Input
                              id="price"
                              type="number"
                              value={newProduct.price}
                              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                              placeholder="0"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                            <select
                              id="category"
                              value={newProduct.category}
                              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Select Category</option>
                              <option value="necklaces">Necklaces</option>
                              <option value="pendants">Pendants</option>
                              <option value="bracelets">Bracelets</option>
                              <option value="rings">Rings</option>
                              <option value="earrings">Earrings</option>
                              <option value="anklets">Anklets</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="image" className="text-sm font-medium">Image URL</Label>
                            <Input
                              id="image"
                              value={newProduct.image_url}
                              onChange={(e) => setNewProduct({...newProduct, image_url: e.target.value})}
                              placeholder="https://..."
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                            <textarea
                              id="description"
                              value={newProduct.description}
                              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Describe the gemstone product..."
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button 
                          onClick={handleAddProduct} 
                          disabled={loading}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          {loading ? 'Adding...' : 'Add Product'}
                        </Button>
                        <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Products Grid */}
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading products...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-6">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                          <h3 className="font-semibold text-lg mb-2 text-gray-900">{product.name}</h3>
                          <Badge variant="outline" className="mb-3 capitalize">
                            {product.category}
                          </Badge>
                          <p className="text-2xl font-bold text-gray-900 mb-4">
                            AED {product.price?.toLocaleString()}
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteProduct(product.id!)}
                              disabled={loading}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Other tabs content */}
            {['users', 'orders', 'messages', 'notifications', 'settings'].includes(activeTab) && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h2>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
                    </h3>
                    <p className="text-gray-600">
                      {activeTab} management features coming soon...
                    </p>
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
