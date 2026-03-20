import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, CreditCard, Wallet, Building2, ArrowLeft } from 'lucide-react';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

export default function Checkout() {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('tarjeta');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const envio = subtotal > 50000 ? 0 : 5000;
  const total = subtotal + envio;

  if (cart.length === 0 && !isSuccess) {
    navigate('/carrito');
    return null;
  }

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-2xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CheckCircle size={64} className="text-green-500" />
          </motion.div>
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-black text-[#1B2A4A] mb-4 tracking-tight">¡Compra Exitosa!</h2>
        <p className="text-lg text-[#5C6B7A] mb-8">
          Tu pedido ha sido procesado correctamente. Recibirás un email con los detalles de tu compra y el seguimiento del envío.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 bg-[#1E5FA6] text-white font-bold py-4 px-8 rounded-full hover:bg-[#1B2A4A] transition-colors shadow-lg"
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#5C6B7A] hover:text-[#1B2A4A] mb-8 transition-colors font-medium">
        <ArrowLeft size={20} /> Volver al carrito
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form */}
        <div className="flex-grow">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-[#1B2A4A] mb-8">Finalizar Compra</h2>
            
            <form id="checkout-form" onSubmit={handleConfirm} className="space-y-8">
              {/* Datos Personales */}
              <div>
                <h3 className="text-lg font-bold text-[#1B2A4A] mb-4 border-b border-gray-100 pb-2">1. Datos Personales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#5C6B7A] mb-1">Nombre completo</label>
                    <input required type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4A9FD4] transition-shadow" placeholder="Ej: Juan Pérez" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5C6B7A] mb-1">Email</label>
                    <input required type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4A9FD4] transition-shadow" placeholder="ejemplo@correo.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5C6B7A] mb-1">Teléfono</label>
                    <input required type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4A9FD4] transition-shadow" placeholder="11 1234-5678" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5C6B7A] mb-1">DNI / CUIT</label>
                    <input required type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4A9FD4] transition-shadow" placeholder="Sin puntos ni guiones" />
                  </div>
                </div>
              </div>

              {/* Dirección */}
              <div>
                <h3 className="text-lg font-bold text-[#1B2A4A] mb-4 border-b border-gray-100 pb-2">2. Dirección de Envío</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#5C6B7A] mb-1">Calle y número</label>
                    <input required type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4A9FD4] transition-shadow" placeholder="Ej: Av. Corrientes 1234" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5C6B7A] mb-1">Ciudad</label>
                    <input required type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4A9FD4] transition-shadow" placeholder="Ej: CABA" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5C6B7A] mb-1">Código Postal</label>
                    <input required type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4A9FD4] transition-shadow" placeholder="Ej: 1043" />
                  </div>
                </div>
              </div>

              {/* Método de Pago */}
              <div>
                <h3 className="text-lg font-bold text-[#1B2A4A] mb-4 border-b border-gray-100 pb-2">3. Método de Pago</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className={clsx(
                    "border-2 rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all",
                    paymentMethod === 'tarjeta' ? "border-[#1E5FA6] bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  )}>
                    <input type="radio" name="payment" value="tarjeta" className="sr-only" checked={paymentMethod === 'tarjeta'} onChange={() => setPaymentMethod('tarjeta')} />
                    <CreditCard size={24} className={paymentMethod === 'tarjeta' ? "text-[#1E5FA6]" : "text-gray-400"} />
                    <span className="font-bold text-sm text-center">Tarjeta de Crédito/Débito</span>
                  </label>
                  
                  <label className={clsx(
                    "border-2 rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all",
                    paymentMethod === 'mercadopago' ? "border-[#009EE3] bg-[#009EE3]/10" : "border-gray-200 hover:border-gray-300"
                  )}>
                    <input type="radio" name="payment" value="mercadopago" className="sr-only" checked={paymentMethod === 'mercadopago'} onChange={() => setPaymentMethod('mercadopago')} />
                    <Wallet size={24} className={paymentMethod === 'mercadopago' ? "text-[#009EE3]" : "text-gray-400"} />
                    <span className="font-bold text-sm text-center">Mercado Pago</span>
                  </label>

                  <label className={clsx(
                    "border-2 rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all",
                    paymentMethod === 'transferencia' ? "border-[#1B2A4A] bg-gray-100" : "border-gray-200 hover:border-gray-300"
                  )}>
                    <input type="radio" name="payment" value="transferencia" className="sr-only" checked={paymentMethod === 'transferencia'} onChange={() => setPaymentMethod('transferencia')} />
                    <Building2 size={24} className={paymentMethod === 'transferencia' ? "text-[#1B2A4A]" : "text-gray-400"} />
                    <span className="font-bold text-sm text-center">Transferencia Bancaria</span>
                  </label>
                </div>

                <AnimatePresence>
                  {paymentMethod === 'tarjeta' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
                    >
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[#5C6B7A] mb-1">Número de Tarjeta</label>
                        <input required type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4A9FD4] transition-shadow" placeholder="0000 0000 0000 0000" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#5C6B7A] mb-1">Vencimiento</label>
                        <input required type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4A9FD4] transition-shadow" placeholder="MM/AA" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#5C6B7A] mb-1">Cód. Seguridad</label>
                        <input required type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4A9FD4] transition-shadow" placeholder="123" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-28">
            <h2 className="text-2xl font-black text-[#1B2A4A] mb-6">Resumen del Pedido</h2>
            
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg p-1 flex-shrink-0">
                    <img src={item.imagenUrl} alt={item.nombre} className="w-full h-full object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow">
                    <div className="font-bold text-[#1B2A4A] text-sm line-clamp-1">{item.nombre}</div>
                    <div className="text-xs text-[#5C6B7A]">{item.cantidad} x ${item.precio.toLocaleString('es-AR')}</div>
                  </div>
                  <div className="font-bold text-[#1B2A4A]">${(item.precio * item.cantidad).toLocaleString('es-AR')}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-6 text-[#5C6B7A] border-t border-gray-100 pt-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#1B2A4A]">${subtotal.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="font-bold text-[#1B2A4A]">
                  {envio === 0 ? <span className="text-green-500">Gratis</span> : `$${envio.toLocaleString('es-AR')}`}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold text-[#1B2A4A]">Total</span>
                <span className="text-3xl font-black text-[#1E5FA6]">${total.toLocaleString('es-AR')}</span>
              </div>
            </div>

            <button
              form="checkout-form"
              type="submit"
              disabled={isProcessing}
              className={clsx(
                "w-full font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2",
                isProcessing ? "bg-gray-400 text-white cursor-not-allowed" : "bg-[#1E5FA6] text-white hover:bg-[#1B2A4A] shadow-[#1E5FA6]/30"
              )}
            >
              {isProcessing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full"
                />
              ) : (
                "Confirmar Compra"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
