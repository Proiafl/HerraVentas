import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Carrito() {
  const { cart, removeFromCart, updateCartQuantity } = useStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const envio = subtotal > 0 ? 5000 : 0;
  const total = subtotal + envio;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-md shadow-sm p-12 text-center">
          <ShoppingBag size={64} className="text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-500 mb-6">
            ¿No sabés qué comprar? ¡Miles de productos te esperan!
          </p>
          <Link
            to="/catalogo"
            className="inline-block bg-[#1E5FA6] text-white font-semibold py-3 px-8 rounded-md hover:bg-[#15467A] transition-colors"
          >
            Descubrir productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="flex-grow">
          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h1 className="text-xl font-semibold text-gray-900">Productos</h1>
            </div>
            
            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6">
                  <div className="w-24 h-24 bg-white flex-shrink-0">
                    <img
                      src={item.imagenUrl}
                      alt={item.nombre}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between gap-4">
                      <Link to={`/producto/${item.id}`} className="font-semibold text-gray-900 hover:text-[#1E5FA6] line-clamp-2">
                        {item.nombre}
                      </Link>
                      <div className="text-xl font-normal text-gray-900 whitespace-nowrap">
                        $ {item.precio.toLocaleString('es-AR')}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-[#1E5FA6] font-medium hover:underline"
                      >
                        Eliminar
                      </button>

                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.cantidad - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-50"
                        >
                          -
                        </button>
                        <div className="px-3 py-1 text-sm font-semibold border-x border-gray-300">
                          {item.cantidad}
                        </div>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.cantidad + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-md shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen de compra</h2>
            
            <div className="space-y-3 text-sm text-gray-600 mb-4 border-b border-gray-100 pb-4">
              <div className="flex justify-between">
                <span>Productos ({cart.length})</span>
                <span>$ {subtotal.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>
                  $ {envio.toLocaleString('es-AR')}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-base font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-normal text-gray-900">$ {total.toLocaleString('es-AR')}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-[#1E5FA6] text-white font-semibold py-3 rounded-md hover:bg-[#15467A] transition-colors"
            >
              Continuar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
