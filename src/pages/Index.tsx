
import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import CategoryGrid from '../components/CategoryGrid';
import ProductCard from '../components/ProductCard';
import { Button } from '@/components/ui/button';
import { productService, Product } from '@/lib/supabase';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      // Show first 4 products as featured
      setFeaturedProducts((data || []).slice(0, 4));
    } catch (error) {
      console.error('Failed to load featured products:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen bg-gray-100 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&h=1080&fit=crop"
          alt="Noora Shawqi Jewelry Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-4">
              NOORA SHAWQI
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wide mb-8">
              Timeless Elegance, Crafted to Perfection
            </p>
            <Button 
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg tracking-wide"
              onClick={() => window.location.href = '/jewellery'}
            >
              EXPLORE COLLECTION
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light tracking-wider text-gray-900 mb-6">
                FEATURED PRODUCTS
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover our latest and most popular jewelry pieces
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {featuredProducts.map((product) => (
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
            
            <div className="text-center">
              <Button 
                variant="outline"
                className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3"
                onClick={() => window.location.href = '/jewellery'}
              >
                VIEW ALL PRODUCTS
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Collections Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-wider text-gray-900 mb-6">
              EXPLORE OUR COLLECTIONS
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose your destination & travel through jewellery
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-96 bg-gray-100 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop"
                alt="Love in Tokyo Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
              <div className="absolute bottom-8 right-8">
                <h3 className="text-white text-3xl font-light tracking-wider">
                  LOVE IN TOKYO
                </h3>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-light tracking-wide text-gray-900">
                Inspired by Japanese Aesthetics
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our Love in Tokyo collection captures the essence of Japanese minimalism and elegance. 
                Each piece reflects the delicate balance between tradition and modernity, 
                featuring clean lines and precious materials that speak to the soul.
              </p>
              <Button 
                variant="outline"
                className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-6 py-3"
              >
                DISCOVER COLLECTION
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <CategoryGrid />

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light tracking-wider text-gray-900 mb-8">
            CRAFTSMANSHIP & HERITAGE
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Every piece in our collection is meticulously handcrafted by master artisans, 
            using only the finest materials and time-honored techniques passed down through generations.
          </p>
          <Button 
            variant="outline"
            className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3"
            onClick={() => window.location.href = '/about'}
          >
            LEARN MORE
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-white text-gray-900 flex items-center justify-center text-xl font-serif mx-auto">
                  NS
                </div>
                <div className="text-xs tracking-[0.2em] text-gray-300 mt-2">
                  NOORA SHAWQI
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Collections</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Necklaces</li>
                <li>Bracelets</li>
                <li>Rings</li>
                <li>Earrings</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Customer Care</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Contact Us</li>
                <li>Size Guide</li>
                <li>Care Instructions</li>
                <li>Returns & Exchanges</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">About</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Our Story</li>
                <li>Craftsmanship</li>
                <li>Sustainability</li>
                <li>Press</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Noora Shawqi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
