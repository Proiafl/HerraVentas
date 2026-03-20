import { Link } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img 
                src="/logo-herraventas.png" 
                alt="HERRAVENTAS" 
                className="h-12 w-auto"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-gray-600 max-w-sm mb-6">
              Compartimos tu pasión. Especialistas en herramientas de hogar y trabajo con la mejor variedad y calidad para cada proyecto.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-900">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/" className="hover:text-[#1B2A4A] transition-colors">Inicio</Link></li>
              <li><Link to="/catalogo" className="hover:text-[#1B2A4A] transition-colors">Catálogo</Link></li>
              <li><Link to="/agente" className="hover:text-[#1B2A4A] transition-colors">Agente IA</Link></li>
              <li><Link to="/contacto" className="hover:text-[#1B2A4A] transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-900">Atención al Cliente</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-[#1B2A4A] transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-[#1B2A4A] transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-[#1B2A4A] transition-colors">Política de Devoluciones</a></li>
              <li><a href="#" className="hover:text-[#1B2A4A] transition-colors">Envíos</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Herraventas. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Mercado Pago</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
