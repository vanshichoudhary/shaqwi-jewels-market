import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Package, Users, ShoppingCart, BarChart3 } from 'lucide-react';
import { productService, Product } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
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
        
        // Reset form and reload products
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
    { title: 'Total Products', value: products.length, icon: Package },
    { title: 'Total Orders', value: '156', icon: ShoppingCart },
    { title: 'Total Users', value: '89', icon: Users },
    { title: 'Revenue', value: 'AED 45,320', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-800 text-white flex items-center justify-center text-sm font-serif mr-3">
                NS
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            </div>
            <div className="text-sm text-gray-600">
              Welcome, {user.email}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'products', label: 'Products', icon: Package },
                { id: 'orders', label: 'Orders', icon: ShoppingCart },
                { id: 'users', label: 'Users', icon: Users },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <Icon className="w-8 h-8 text-gray-400" />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                  <Button onClick={() => setShowAddProduct(true)} disabled={loading}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </div>

                {/* Add Product Form */}
                {showAddProduct && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Add New Product</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Product Name</Label>
                          <Input
                            id="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                            placeholder="Enter product name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="price">Price (AED)</Label>
                          <Input
                            id="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <select
                            id="category"
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                            className="w-full border border-gray-300 rounded px-3 py-2"
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
                        <div>
                          <Label htmlFor="image">Image URL</Label>
                          <Input
                            id="image"
                            value={newProduct.image_url}
                            onChange={(e) => setNewProduct({...newProduct, image_url: e.target.value})}
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <textarea
                          id="description"
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                          className="w-full border border-gray-300 rounded px-3 py-2 h-24"
                          placeholder="Product description"
                        />
                      </div>
                      <div className="flex gap-4">
                        <Button onClick={handleAddProduct} disabled={loading}>
                          {loading ? 'Adding...' : 'Add Product'}
                        </Button>
                        <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Products List */}
                {loading ? (
                  <div className="text-center py-8">Loading products...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <Card key={product.id}>
                        <CardContent className="p-4">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded mb-4"
                          />
                          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                          <p className="text-gray-600 mb-2">{product.category}</p>
                          <p className="text-xl font-bold text-gray-900 mb-4">
                            AED {product.price?.toLocaleString()}
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteProduct(product.id!)}
                              disabled={loading}
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

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-600">Order management coming soon...</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Users</h2>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-600">User management coming soon...</p>
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
