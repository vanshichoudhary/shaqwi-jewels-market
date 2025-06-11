
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ProductCard from '../components/ProductCard';
import { Button } from '@/components/ui/button';
import { productService, Product } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const CategoryPage = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      let data;
      
      if (category && category !== 'jewellery') {
        // Load products for specific category
        data = await productService.getProductsByCategory(category);
      } else {
        // Load all products for general jewellery page
        data = await productService.getAllProducts();
      }
      
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

  const categoryName = category?.replace('-', ' ').toUpperCase() || 'JEWELLERY';

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    if (priceRange === 'all') return true;
    const price = product.price || 0;
    
    switch (priceRange) {
      case '0-1000':
        return price < 1000;
      case '1000-5000':
        return price >= 1000 && price <= 5000;
      case '5000-10000':
        return price >= 5000 && price <= 10000;
      case '10000+':
        return price > 10000;
      default:
        return true;
    }
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.price || 0) - (b.price || 0);
      case 'price-high':
        return (b.price || 0) - (a.price || 0);
      case 'newest':
        return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light tracking-wider text-gray-900 mb-4">
            {categoryName}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our exquisite collection of handcrafted jewelry, each piece telling its own unique story
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="text-gray-700 font-medium">Sort by:</label>
              <select 
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 bg-white"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <label htmlFor="price" className="text-gray-700 font-medium">Price:</label>
              <select 
                id="price"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 bg-white"
              >
                <option value="all">All Prices</option>
                <option value="0-1000">Under AED 1,000</option>
                <option value="1000-5000">AED 1,000 - 5,000</option>
                <option value="5000-10000">AED 5,000 - 10,000</option>
                <option value="10000+">Above AED 10,000</option>
              </select>
            </div>
          </div>

          <div className="text-gray-600">
            {filteredProducts.length} products
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found in this category.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  id={product.id!}
                  name={product.name}
                  price={product.price || 0}
                  image={product.image_url}
                  category={product.category}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button 
                variant="outline" 
                className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3"
              >
                LOAD MORE
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
