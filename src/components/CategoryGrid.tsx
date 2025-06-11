
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'necklaces',
    name: 'NECKLACES',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop'
  },
  {
    id: 'pendants',
    name: 'PENDANTS',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop'
  },
  {
    id: 'bracelets',
    name: 'BRACELETS',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
  },
  {
    id: 'rings',
    name: 'RINGS',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop'
  },
  {
    id: 'earrings',
    name: 'EARRINGS',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop'
  },
  {
    id: 'anklets',
    name: 'ANKLETS',
    image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=400&h=400&fit=crop'
  }
];

const CategoryGrid = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light tracking-wider text-gray-900 mb-4">
            SHOP BY CATEGORY
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative overflow-hidden bg-gray-100 aspect-square"
            >
              <img 
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl font-medium tracking-wider">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
