import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Truck, Award, ShieldCheck } from 'lucide-react';

const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Coffee Shop Background" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            T's Coffee <br/> <span className="text-amber-500">&</span> Brews
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 mb-8 max-w-2xl mx-auto">
            From farm-fresh coffee grounds to gallons of sweet tea. 
            We supply the soul of your gathering.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/drinks" 
              className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full transition-all text-lg"
            >
              Shop Drinks
            </Link>
            <Link 
              to="/merch" 
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white font-bold rounded-full transition-all text-lg"
            >
              Merchandise
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-serif">Bulk Delivery</h3>
              <p className="text-stone-600">Gallons of tea and pounds of coffee delivered straight to your event or door.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-serif">Premium Quality</h3>
              <p className="text-stone-600">Sourced from the best farms and prepared with patience and care.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-serif">Satisfaction Guaranteed</h3>
              <p className="text-stone-600">If you don't love the first sip, we'll make it right.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-2">Customer Favorites</h2>
            <p className="text-stone-600">Our best-selling bulk beverages.</p>
          </div>
          <Link to="/drinks" className="hidden md:flex items-center text-amber-700 font-bold hover:text-amber-900">
            View All <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 text-center md:hidden">
          <Link to="/drinks" className="inline-flex items-center text-amber-700 font-bold hover:text-amber-900">
            View All <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;