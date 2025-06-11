
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock product data with real jewelry images
  const product = {
    id: id,
    name: 'Diamond Tennis Necklace',
    price: 12500,
    category: 'Necklaces',
    description: 'Elegant diamond tennis necklace crafted in 18k white gold. Features brilliant cut diamonds totaling 5 carats, each meticulously selected for exceptional clarity and fire.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&h=600&fit=crop'
    ],
    specifications: [
      { label: 'Material', value: '18k White Gold' },
      { label: 'Diamond Weight', value: '5.00 ct' },
      { label: 'Diamond Clarity', value: 'VS1-VS2' },
      { label: 'Diamond Color', value: 'F-G' },
      { label: 'Length', value: '16-18 inches (adjustable)' }
    ],
    inStock: true
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} x ${product.name} to cart`);
    // Add cart logic here
  };

  const handleBuyNow = () => {
    console.log(`Buy now: ${quantity} x ${product.name}`);
    // Add buy now logic here
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 overflow-hidden">
              <img 
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 overflow-hidden border-2 ${
                    selectedImage === index ? 'border-gray-800' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-4">{product.category}</p>
              <p className="text-3xl font-medium text-gray-900">
                AED {product.price.toLocaleString()}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Specifications</h3>
              <dl className="space-y-2">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-200">
                    <dt className="text-gray-600">{spec.label}</dt>
                    <dd className="text-gray-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="text-gray-700">Quantity:</label>
                <select 
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-300 rounded px-3 py-2"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4">
                <Button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3"
                  disabled={!product.inStock}
                >
                  BUY NOW
                </Button>
                <Button 
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white py-3"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  ADD TO CART
                </Button>
              </div>

              {!product.inStock && (
                <p className="text-red-600 text-center">Currently out of stock</p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Care Instructions</h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Store in a cool, dry place</li>
                <li>• Clean with a soft, lint-free cloth</li>
                <li>• Avoid contact with perfumes and chemicals</li>
                <li>• Professional cleaning recommended annually</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
