import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';
import { useAppContext } from '../App';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useAppContext();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-stone-900/80 text-white text-xs px-2 py-1 rounded">
          {product.category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-stone-800 font-serif mb-2">{product.name}</h3>
        <p className="text-stone-600 text-sm mb-4 flex-grow">{product.description}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
          <div>
            <span className="text-lg font-bold text-amber-700">${product.price.toFixed(2)}</span>
            <span className="text-xs text-stone-500 block">/ {product.unit}</span>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center space-x-1 bg-stone-800 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;