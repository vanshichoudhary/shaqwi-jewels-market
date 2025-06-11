
import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, category }) => {
  return (
    <Link to={`/product/${id}`} className="group">
      <div className="bg-gray-100 aspect-square overflow-hidden mb-4 group-hover:bg-gray-200 transition-colors duration-300">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="text-center">
        <h3 className="text-gray-900 font-medium mb-1 tracking-wide">{name}</h3>
        <p className="text-gray-600 text-sm mb-2">{category}</p>
        <p className="text-gray-900 font-medium">AED {price.toLocaleString()}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
