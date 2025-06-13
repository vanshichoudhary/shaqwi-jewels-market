
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import CategoryGrid from '@/components/CategoryGrid';
import GemstonesSection from '@/components/GemstonesSection';
import LoginPopup from '@/components/LoginPopup';
import { useAutoLogout } from '@/hooks/useAutoLogout';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { user } = useAuth();

  useAutoLogout({
    timeoutMinutes: 1,
    onShowLoginPrompt: () => setShowLoginPopup(true)
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section with Background Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://screenapp.io/app/#/shared/1f2pELL-WI"
            className="w-full h-full object-cover"
            style={{ border: 'none' }}
            allow="autoplay; fullscreen"
            title="Background Video"
          />
        </div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-6">
            NOORA SHAWQI
          </h1>
          <p className="text-lg md:text-xl mb-8 tracking-wide">
            Exquisite Jewelry Collections
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 text-sm tracking-widest hover:bg-gray-100 transition-colors">
            EXPLORE COLLECTION
          </button>
        </div>
      </section>

      {/* Gemstones Sections */}
      <GemstonesSection />

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider text-gray-900 mb-4">
              OUR COLLECTIONS
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated jewelry collections, each piece crafted with attention to detail and timeless elegance.
            </p>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-light tracking-wider text-gray-900 mb-6">
                CRAFTED WITH PASSION
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Each piece in our collection is meticulously handcrafted by skilled artisans, 
                combining traditional techniques with contemporary design. We believe in creating 
                jewelry that tells a story and becomes part of your personal journey.
              </p>
              <button className="text-gray-900 border-b-2 border-gray-900 pb-1 text-sm tracking-widest hover:border-gray-600 transition-colors">
                LEARN MORE ABOUT OUR CRAFT
              </button>
            </div>
            <div className="bg-gray-200 h-96 flex items-center justify-center">
              <span className="text-gray-500">Artisan at Work Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-light tracking-wider text-gray-900 mb-4">
            STAY CONNECTED
          </h3>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for exclusive updates on new collections and special events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900"
            />
            <button className="bg-gray-900 text-white px-6 py-3 text-sm tracking-widest hover:bg-gray-800 transition-colors">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="w-12 h-12 bg-white text-gray-900 flex items-center justify-center text-xl font-serif mb-4">
                NS
              </div>
              <p className="text-gray-400 text-sm">
                Exquisite jewelry crafted with passion and precision.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wider mb-4">COLLECTIONS</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Necklaces</li>
                <li>Bracelets</li>
                <li>Rings</li>
                <li>Earrings</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wider mb-4">SUPPORT</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Contact Us</li>
                <li>Shipping Info</li>
                <li>Returns</li>
                <li>Size Guide</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wider mb-4">CONNECT</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Pinterest</li>
                <li>Newsletter</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Noora Shawqi. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <LoginPopup 
        isOpen={showLoginPopup} 
        onClose={() => setShowLoginPopup(false)} 
      />
    </div>
  );
};

export default Index;
