import React from 'react';
import { PRODUCTS } from '../constants';
import { ProductCategory } from '../types';
import ProductCard from '../components/ProductCard';

const Merchandise: React.FC = () => {
  const merch = PRODUCTS.filter(p => p.category === ProductCategory.MERCHANDISE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif font-bold text-stone-900 mb-6">Merchandise</h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto">
          Elevate your brewing experience with our high-quality accessories and gear.
        </p>
      </div>

      {merch.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {merch.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-stone-100 rounded-lg">
          <p className="text-stone-500 text-lg">New merchandise coming soon!</p>
        </div>
      )}
    </div>
  );
};

export default Merchandise;