import React from 'react';
import { PRODUCTS } from '../constants';
import { ProductCategory } from '../types';
import ProductCard from '../components/ProductCard';

const Drinks: React.FC = () => {
  // Filter products by category
  const coffee = PRODUCTS.filter(p => p.category === ProductCategory.COFFEE_BULK);
  const subs = PRODUCTS.filter(p => p.category === ProductCategory.COFFEE_SUB);
  const cocoa = PRODUCTS.filter(p => p.category === ProductCategory.HOT_CHOCOLATE);
  const cold = PRODUCTS.filter(p => p.category === ProductCategory.COLD_DRINK);

  const Section = ({ title, description, items, id }: { title: string, description: string, items: any[], id: string }) => (
    <div id={id} className="py-16 border-b border-stone-200 last:border-0">
      <div className="mb-10">
        <h2 className="text-3xl font-serif font-bold text-stone-800 mb-3">{title}</h2>
        <p className="text-lg text-stone-600 max-w-2xl">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif font-bold text-stone-900 mb-6">Our Drinks Menu</h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto">
          Explore our wide selection of bulk beverages. From hot morning brews to refreshing cold gallons.
        </p>
        
        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="#coffee" className="px-4 py-2 bg-stone-200 hover:bg-stone-300 rounded-full text-stone-800 text-sm font-bold transition-colors">Coffee Grounds</a>
            <a href="#subs" className="px-4 py-2 bg-stone-200 hover:bg-stone-300 rounded-full text-stone-800 text-sm font-bold transition-colors">Subscriptions</a>
            <a href="#cocoa" className="px-4 py-2 bg-stone-200 hover:bg-stone-300 rounded-full text-stone-800 text-sm font-bold transition-colors">Hot Chocolate</a>
            <a href="#cold" className="px-4 py-2 bg-stone-200 hover:bg-stone-300 rounded-full text-stone-800 text-sm font-bold transition-colors">Lemonades & Teas</a>
        </div>
      </div>

      <Section 
        id="coffee"
        title="Bulk Coffee Grounds" 
        description="Premium beans roasted to perfection and ground for your convenience. Perfect for offices, events, or serious coffee lovers."
        items={coffee}
      />

      <Section 
        id="subs"
        title="Subscription Boxes" 
        description="Never run out again. Curated selections delivered to your door on a monthly basis."
        items={subs}
      />

      <Section 
        id="cocoa"
        title="Hot Chocolate Bulk" 
        description="Rich, creamy, and decadent. Sold in large quantities for catering and large families."
        items={cocoa}
      />

      <Section 
        id="cold"
        title="Gallons to Go" 
        description="Refreshing Lemonades and Sweet Teas, sold by the gallon. The hit of every summer party."
        items={cold}
      />
    </div>
  );
};

export default Drinks;