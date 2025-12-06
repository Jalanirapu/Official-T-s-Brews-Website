import React from 'react';
import { Coffee, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center space-x-2 text-white font-serif text-xl font-bold mb-4">
            <Coffee className="h-6 w-6 text-amber-500" />
            <span>T's Coffee & Brews</span>
          </div>
          <p className="text-sm leading-relaxed">
            Crafting the finest bulk beverages for homes, offices, and events. 
            Sip responsibly, live beautifully.
          </p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#/drinks" className="hover:text-amber-500">Shop Drinks</a></li>
            <li><a href="#/merch" className="hover:text-amber-500">Merchandise</a></li>
            <li><a href="#/about" className="hover:text-amber-500">Our Story</a></li>
            <li><a href="#/reviews" className="hover:text-amber-500">Reviews</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-4">Connect</h3>
          <div className="flex space-x-4 mb-4">
            <Instagram className="h-5 w-5 hover:text-amber-500 cursor-pointer" />
            <Facebook className="h-5 w-5 hover:text-amber-500 cursor-pointer" />
            <Twitter className="h-5 w-5 hover:text-amber-500 cursor-pointer" />
          </div>
          <p className="text-xs">
            © {new Date().getFullYear()} T's Coffee & Brews. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;