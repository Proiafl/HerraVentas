import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { productos } from '../data/productos';

const banners = [
  { 
    id: 1, 
    image: '/banner-1.png',
    title: '',
    subtitle: ''
  },
  { 
    id: 2, 
    image: '/banner-2.png',
    title: '',
    subtitle: ''
  },
  { 
    id: 3, 
    image: '/banner-3.jpg',
    title: '',
    subtitle: ''
  },
];

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pb-16">
      {/* Hero Carousel */}
      <section className="relative h-[400px] md:h-[600px] bg-[#1B2A4A] overflow-hidden group">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBanner ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
            {(banner.title || banner.subtitle) && (
              <div className="absolute inset-0 flex items-center justify-center md:justify-start md:pl-24">
                <div className="text-center md:text-left px-4 max-w-2xl">
                  <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg mb-4 tracking-tight">
                    {banner.title.includes('HERRA') ? (
                      <>HERRA<span className="text-[#4A9FD4]">VENTAS</span></>
                    ) : (
                      banner.title
                    )}
                  </h2>
                  <p className="text-lg md:text-2xl text-gray-200 drop-shadow-md font-medium">
                    {banner.subtitle}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Gradient fade to match background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#ebebeb] to-transparent pointer-events-none" />
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBanner(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentBanner ? 'bg-[#4A9FD4] w-8' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-12 relative z-10">
        {/* Benefits Strip */}
        <div className="bg-white rounded-md shadow-sm p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#1E5FA6]">
              <CreditCard size={24} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Pagá con tarjeta o en efectivo</h3>
              <p className="text-sm text-gray-500">Con Mercado Pago</p>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200" />
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Envío gratis desde $50.000</h3>
              <p className="text-sm text-gray-500">Solo por estar registrado</p>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200" />
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#1E5FA6]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Seguridad, de principio a fin</h3>
              <p className="text-sm text-gray-500">¿No te gusta? Devolvelo</p>
            </div>
          </div>
        </div>

        {/* AI Banner */}
        <Link to="/agente" className="block bg-gradient-to-r from-[#1B2A4A] to-[#1E5FA6] rounded-md shadow-sm p-6 mb-8 text-white hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-1">¿No sabés qué herramienta comprar?</h2>
                <p className="text-blue-100">Consultá con nuestro Agente IA experto en ferretería.</p>
              </div>
            </div>
            <div className="hidden md:block bg-white text-[#1B2A4A] px-6 py-2 rounded-full font-semibold group-hover:bg-gray-100 transition-colors">
              Probar ahora
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent transform skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
        </Link>

        {/* Ofertas */}
        <div className="mb-8">
          <div className="flex items-end gap-4 mb-4">
            <h2 className="text-2xl font-normal text-gray-600">Ofertas de la semana</h2>
            <Link to="/catalogo" className="text-sm text-[#1E5FA6] hover:text-[#1B2A4A] font-medium mb-1">Ver todas</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {productos.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Basado en tu última visita */}
        <div className="mb-8">
          <div className="flex items-end gap-4 mb-4">
            <h2 className="text-2xl font-normal text-gray-600">Basado en tu última visita</h2>
            <Link to="/catalogo" className="text-sm text-[#1E5FA6] hover:text-[#1B2A4A] font-medium mb-1">Ver historial</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {productos.slice(5, 10).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        {/* Categorías */}
        <div className="mb-8">
          <h2 className="text-2xl font-normal text-gray-600 mb-4">Categorías destacadas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Taladros', 'Amoladoras', 'Sierras', 'Lijadoras'].map((cat, idx) => (
              <Link key={idx} to={`/catalogo?categoria=${cat}`} className="bg-white rounded-md shadow-sm p-6 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <img src={`https://picsum.photos/seed/${cat}/100/100`} alt={cat} className="w-12 h-12 object-contain mix-blend-multiply rounded-full" />
                </div>
                <span className="font-medium text-gray-700">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
