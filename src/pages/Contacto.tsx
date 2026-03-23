import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, MessageCircle } from 'lucide-react';
import clsx from 'clsx';
import { usePageSEO } from '../hooks/usePageSEO';

export default function Contacto() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  usePageSEO({
    title: 'Contacto | HerraVentas — Herramientas Online Argentina',
    description: 'Contactá a HerraVentas para consultas, pedidos y asistencia. Estamos en CABA, Argentina. Tel: +54 11 1234-5678. Respondemos a la brevedad.',
    canonical: '/contacto',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://www.herraventas.com.ar/#localbusiness',
      name: 'HerraVentas',
      description: 'Especialistas en herramientas eléctricas y manuales en Argentina',
      url: 'https://www.herraventas.com.ar',
      telephone: '+54-11-1234-5678',
      email: 'contacto@herraventas.com.ar',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Corrientes 1234',
        addressLocality: 'Ciudad Autónoma de Buenos Aires',
        addressRegion: 'Buenos Aires',
        postalCode: 'C1043',
        addressCountry: 'AR',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      priceRange: '$$',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-[#1B2A4A] tracking-tight mb-4">Contactanos</h1>
        <p className="text-lg text-[#5C6B7A]">
          Estamos para ayudarte. Escribinos por cualquier consulta, duda o sugerencia y te responderemos a la brevedad.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100"
        >
          <h2 className="text-2xl font-black text-[#1B2A4A] mb-8">Envianos un mensaje</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#5C6B7A] mb-1">Nombre completo</label>
                <input required type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4A9FD4] transition-shadow" placeholder="Juan Pérez" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5C6B7A] mb-1">Teléfono</label>
                <input required type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4A9FD4] transition-shadow" placeholder="11 1234-5678" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#5C6B7A] mb-1">Email</label>
              <input required type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4A9FD4] transition-shadow" placeholder="ejemplo@correo.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5C6B7A] mb-1">Mensaje</label>
              <textarea required rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4A9FD4] transition-shadow resize-none" placeholder="¿En qué podemos ayudarte?"></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className={clsx(
                "w-full font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2",
                isSubmitting ? "bg-gray-400 text-white cursor-not-allowed" : 
                isSuccess ? "bg-green-500 text-white shadow-green-500/30" : 
                "bg-[#1E5FA6] text-white hover:bg-[#1B2A4A] shadow-[#1E5FA6]/30"
              )}
            >
              {isSubmitting ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full" />
              ) : isSuccess ? (
                "¡Mensaje Enviado!"
              ) : (
                <><Send size={20} /> Enviar Mensaje</>
              )}
            </button>
          </form>
        </motion.div>

        {/* Info y Mapa */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="bg-[#1B2A4A] text-white p-8 md:p-12 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-black mb-8">Información de Contacto</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-[#4A9FD4]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Dirección</h3>
                  <p className="text-gray-300">Av. Corrientes 1234, CABA<br />Argentina</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-[#4A9FD4]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Teléfono</h3>
                  <p className="text-gray-300">+54 11 1234-5678<br />Lunes a Viernes de 9 a 18hs</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-[#4A9FD4]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-gray-300">contacto@herraventas.com.ar</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full bg-[#25D366] text-white font-bold py-4 rounded-xl hover:bg-[#128C7E] transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle size={24} /> Contactar por WhatsApp
            </a>
          </div>

          {/* Mapa Placeholder */}
          <div className="h-64 bg-gray-200 rounded-3xl overflow-hidden relative">
            <iframe
              title="Mapa de Herraventas"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016713276848!2d-58.38375908477038!3d-34.60373888045943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf2a3e0b5d%3A0x63321597d8c6082!2sObelisco!5e0!3m2!1ses-419!2sar!4v1625680000000!5m2!1ses-419!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
