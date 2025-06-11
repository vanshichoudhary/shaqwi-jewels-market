
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'necklaces',
    name: 'NECKLACES',
    image: '/api/placeholder/400/400'
  },
  {
    id: 'pendants',
    name: 'PENDANTS',
    image: '/api/placeholder/400/400'
  },
  {
    id: 'bracelets',
    name: 'BRACELETS',
    image: '/api/placeholder/400/400'
  },
  {
    id: 'rings',
    name: 'RINGS',
    image: '/api/placeholder/400/400'
  },
  {
    id: 'earrings',
    name: 'EARRINGS',
    image: '/api/placeholder/400/400'
  },
  {
    id: 'anklets',
    name: 'ANKLETS',
    image: '/api/placeholder/400/400'
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
