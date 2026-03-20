import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, Search, MapPin, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, user } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white text-gray-800 sticky top-0 z-50 shadow-sm border-b border-gray-100">
      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4 md:gap-8">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img 
            src="/logo-herraventas.png" 
            alt="HERRAVENTAS" 
            className="h-10 w-auto"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Search Bar (Desktop) */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-grow max-w-3xl relative">
          <input
            type="text"
            placeholder="Buscar herramientas, marcas y más..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2.5 px-4 pr-12 rounded-sm text-gray-900 outline-none border border-gray-200 focus:border-[#4A9FD4] focus:ring-1 focus:ring-[#4A9FD4] bg-gray-50"
          />
          <button type="submit" className="absolute right-0 top-0 bottom-0 px-4 bg-gray-50 text-gray-500 hover:text-[#1B2A4A] rounded-r-sm flex items-center justify-center border-l border-gray-200">
            <Search size={20} />
          </button>
        </form>

        {/* Right Icons */}
        <div className="flex items-center gap-5 flex-shrink-0">
          <Link to="/agente" className="hidden lg:flex items-center gap-2 hover:text-[#1B2A4A] transition-colors">
            <Sparkles size={20} className="text-[#4A9FD4]" />
            <span className="text-sm font-medium">Agente IA</span>
          </Link>
          
          <Link to={user ? "/perfil" : "/login"} className="hidden sm:flex items-center gap-2 hover:text-[#1B2A4A] transition-colors">
            <User size={24} className="text-gray-600" />
            <div className="text-xs flex flex-col">
              <span className="text-gray-500">Bienvenido</span>
              <span className="font-bold leading-none text-gray-800">{user ? user.displayName?.split(' ')[0] : 'Ingresa'}</span>
            </div>
          </Link>

          <Link to="/favoritos" className="hidden sm:flex flex-col items-center hover:text-[#1B2A4A] transition-colors">
            <Heart size={22} className="text-gray-600" />
            <span className="text-[10px] mt-1 font-medium text-gray-600">Favoritos</span>
          </Link>

          <Link to="/carrito" className="relative flex items-center gap-1 hover:text-[#1B2A4A] transition-colors">
            <div className="relative">
              <ShoppingCart size={28} className="text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#4A9FD4] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="relative shadow-sm border border-gray-200 rounded-sm">
          <input
            type="text"
            placeholder="Estoy buscando..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 px-4 pr-10 rounded-sm text-gray-900 outline-none bg-gray-50"
          />
          <button type="submit" className="absolute right-0 top-0 bottom-0 px-3 text-gray-500">
            <Search size={20} />
          </button>
        </form>
      </div>

      {/* Secondary Header / Categories */}
      <div className="bg-[#1E5FA6] text-sm hidden md:block border-t border-white/10">
        <div className="container mx-auto px-4 py-2 flex items-center gap-6">
          <div className="flex items-center gap-1 text-white hover:text-gray-200 cursor-pointer">
            <MapPin size={16} />
            <span>Enviar a Capital Federal</span>
          </div>
          <nav className="flex items-center gap-5 text-gray-100 font-medium">
            <Link to="/catalogo" className="hover:text-white">Categorías</Link>
            <Link to="/catalogo" className="hover:text-white">Ofertas</Link>
            <Link to="/catalogo" className="hover:text-white">Historial</Link>
            <Link to="/contacto" className="hover:text-white">Contacto</Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1E5FA6] border-t border-white/10 px-4 py-2 flex flex-col gap-3 text-sm font-medium">
          <Link to="/catalogo" onClick={() => setIsMobileMenuOpen(false)}>Categorías</Link>
          <Link to="/agente" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-[#4A9FD4]">
            <Sparkles size={16} /> Agente IA
          </Link>
          <Link to={user ? "/perfil" : "/login"} onClick={() => setIsMobileMenuOpen(false)}>
            {user ? 'Mi Perfil' : 'Ingresar'}
          </Link>
          <Link to="/favoritos" onClick={() => setIsMobileMenuOpen(false)}>Favoritos</Link>
          <Link to="/contacto" onClick={() => setIsMobileMenuOpen(false)}>Contacto</Link>
        </div>
      )}
    </header>
  );
}
