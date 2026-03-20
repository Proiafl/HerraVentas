import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

export default function ProductCard({ product }: { product: Product; key?: React.Key }) {
  const { toggleWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full group border border-gray-100">
      <div className="relative aspect-square p-4 border-b border-gray-100">
        <Link to={`/producto/${product.id}`} className="block w-full h-full">
          <img
            src={product.imagenUrl}
            alt={product.nombre}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-gray-100 text-gray-400 hover:text-[#1E5FA6] transition-colors"
        >
          <Heart size={20} className={clsx(isWishlisted && "fill-[#1E5FA6] text-[#1E5FA6]")} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/producto/${product.id}`} className="flex-grow">
          <h3 className="text-sm text-gray-700 font-normal leading-tight mb-2 line-clamp-2 group-hover:text-[#1E5FA6] transition-colors">
            {product.nombre}
          </h3>
        </Link>
        
        <div className="mt-auto pt-2">
          <div className="text-2xl font-normal text-gray-900 mb-1">
            $ {product.precio.toLocaleString('es-AR')}
          </div>
          <div className="text-xs text-green-600 font-semibold">
            Llega gratis mañana
          </div>
        </div>
      </div>
    </div>
  );
}
