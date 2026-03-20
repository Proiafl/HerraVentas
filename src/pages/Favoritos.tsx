import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';

export default function Favoritos() {
  const { wishlist, removeFromCart, addToCart, toggleWishlist } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-2xl">
        <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <Heart size={64} className="text-red-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-[#1B2A4A] mb-4 tracking-tight">Tu lista de deseos está vacía</h2>
        <p className="text-lg text-[#5C6B7A] mb-8">
          Guardá los productos que más te gustan para comprarlos más tarde.
        </p>
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 bg-[#1E5FA6] text-white font-bold py-4 px-8 rounded-full hover:bg-[#1B2A4A] transition-colors shadow-lg"
        >
          Explorar catálogo <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Heart size={32} className="text-red-500 fill-red-500" />
        <h1 className="text-3xl md:text-4xl font-black text-[#1B2A4A] tracking-tight">Mis Favoritos</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {wishlist.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
