import React, { useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentStatus() {
  const { status } = useParams<{ status: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const paymentId = searchParams.get('payment_id');
  const externalReference = searchParams.get('external_reference');

  useEffect(() => {
    // Si necesitas lógica adicional al cargar, iría aquí.
    // El DB se actualiza vía webhook, por lo que acá sólo mostramos el estado visual.
  }, [paymentId]);

  let config = {
    icon: <CheckCircle size={64} className="text-green-500" />,
    bg: "bg-green-100",
    title: "¡Compra Exitosa!",
    message: "Tu pedido ha sido procesado y el pago fue aprobado correctamente.",
    buttonText: "Volver al Inicio"
  };

  if (status === 'error') {
    config = {
      icon: <XCircle size={64} className="text-red-500" />,
      bg: "bg-red-100",
      title: "Pago Rechazado",
      message: "Hubo un problema procesando tu pago. Por favor, intentá nuevamente.",
      buttonText: "Volver al Checkout"
    };
  } else if (status === 'pendiente') {
    config = {
      icon: <Clock size={64} className="text-yellow-500" />,
      bg: "bg-yellow-100",
      title: "Pago Pendiente",
      message: "Tu pago se está procesando. Te enviaremos un email cuando se confirme.",
      buttonText: "Volver al Inicio"
    };
  }

  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-2xl">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`w-32 h-32 ${config.bg} rounded-full flex items-center justify-center mx-auto mb-8`}
      >
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {config.icon}
        </motion.div>
      </motion.div>
      <h2 className="text-3xl md:text-5xl font-black text-[#1B2A4A] mb-4 tracking-tight">{config.title}</h2>
      <p className="text-lg text-[#5C6B7A] mb-8">
        {config.message}
        {paymentId && <span className="block mt-2 text-sm font-bold text-[#1B2A4A]">ID de pago: {paymentId}</span>}
        {externalReference && <span className="block text-sm">Pedido: {externalReference}</span>}
      </p>
      <button
        onClick={() => navigate(status === 'error' ? '/checkout' : '/')}
        className="inline-flex items-center gap-2 bg-[#1E5FA6] text-white font-bold py-4 px-8 rounded-full hover:bg-[#1B2A4A] transition-colors shadow-lg"
      >
        <ArrowLeft size={20} />
        {config.buttonText}
      </button>
    </div>
  );
}
