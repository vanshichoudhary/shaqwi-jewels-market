
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User } from 'lucide-react';

const Navigation = () => {
  const [cartCount] = useState(0);
  
  // Mock admin check - in real app, this would come from Supabase auth
  const isAdmin = true; // This should be replaced with actual admin verification

  return (
    <>
      {/* Top bar */}
      <div className="bg-gray-100 text-gray-600 text-sm py-2 px-4 flex justify-between items-center">
        <div className="flex space-x-6">
          <span>CONTACT US</span>
          <span>FAQ</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>AED</span>
          {isAdmin && (
            <Link to="/admin" className="text-gray-800 font-medium">
              ADMIN PANEL
            </Link>
          )}
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left navigation */}
            <div className="flex items-center space-x-8">
              <Link to="/jewellery" className="text-gray-700 hover:text-gray-900 font-medium tracking-wide">
                JEWELLERY
              </Link>
              <Link to="/campaigns" className="text-gray-700 hover:text-gray-900 font-medium tracking-wide">
                CAMPAIGNS
              </Link>
              <Link to="/press" className="text-gray-700 hover:text-gray-900 font-medium tracking-wide">
                PRESS
              </Link>
            </div>

            {/* Center logo */}
            <div className="flex-1 flex justify-center">
              <Link to="/" className="text-center">
                <div className="w-12 h-12 bg-gray-800 text-white flex items-center justify-center text-xl font-serif">
                  NS
                </div>
                <div className="text-xs tracking-[0.2em] text-gray-600 mt-1">
                  NOORA SHAWQI
                </div>
              </Link>
            </div>

            {/* Right navigation */}
            <div className="flex items-center space-x-8">
              <Link to="/about" className="text-gray-700 hover:text-gray-900 font-medium tracking-wide">
                ABOUT US
              </Link>
              <Link to="/private-viewing" className="text-gray-700 hover:text-gray-900 font-medium tracking-wide">
                PRIVATE VIEWING
              </Link>
              <Link to="/story" className="text-gray-700 hover:text-gray-900 font-medium tracking-wide">
                OUR STORY
              </Link>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-4 ml-8">
              <button className="text-gray-600 hover:text-gray-900">
                <Search size={20} />
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <User size={20} />
              </button>
              <Link to="/cart" className="text-gray-600 hover:text-gray-900 relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
