
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ProductCard from '../components/ProductCard';
import { Button } from '@/components/ui/button';

const CategoryPage = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');

  // Mock products data with real jewelry images
  const products = [
    {
      id: '1',
      name: 'Diamond Tennis Necklace',
      price: 12500,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
      category: 'Necklaces'
    },
    {
      id: '2',
      name: 'Pearl Statement Necklace',
      price: 3200,
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop',
      category: 'Necklaces'
    },
    {
      id: '3',
      name: 'Gold Chain Necklace',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
      category: 'Necklaces'
    },
    {
      id: '4',
      name: 'Emerald Pendant Necklace',
      price: 8900,
      image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=400&h=400&fit=crop',
      category: 'Necklaces'
    },
    {
      id: '5',
      name: 'Silver Layered Necklace',
      price: 950,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
      category: 'Necklaces'
    },
    {
      id: '6',
      name: 'Rose Gold Choker',
      price: 2100,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
      category: 'Necklaces'
    }
  ];

  const categoryName = category?.replace('-', ' ').toUpperCase() || 'JEWELLERY';

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
            {products.length} products
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
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
      </div>
    </div>
  );
};

export default CategoryPage;
