import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Wrench, User, Sparkles } from 'lucide-react';
import { FUNCTIONS_URL } from '../supabase';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { usePageSEO } from '../hooks/usePageSEO';

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  recommendedProducts?: Product[];
}

export default function Agente() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      content: '¡Hola! Soy el Agente IA de Herraventas. Contame, ¿qué proyecto tenés en mente o qué herramienta estás buscando?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  usePageSEO({
    title: 'Agente IA de Herramientas | ¿Qué herramienta comprar? | HerraVentas',
    description: 'Nuestro Agente IA experto en herramientas te ayuda a elegir la herramienta ideal para tu proyecto. Describí lo que necesitás y obtenet recomendaciones personalizadas.',
    canonical: '/agente',
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Construir historial (excluye el mensaje inicial del agente)
      const history = messages.slice(1).map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        content: m.content,
      }));

      const res = await fetch(`${FUNCTIONS_URL}/agente-ia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content, history }),
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);

      const data = await res.json();

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: data.response || 'Lo siento, no pude procesar tu solicitud.',
        recommendedProducts: data.recommendedProducts?.length > 0 ? data.recommendedProducts : undefined,
      };

      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      console.error('Error llamando al agente:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'agent',
          content: 'Hubo un error de conexión. Por favor, intentá nuevamente más tarde.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl h-[calc(100vh-120px)] flex flex-col">
      <div className="bg-white rounded-t-3xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 z-10">
        <div className="w-12 h-12 bg-gradient-to-br from-[#1B2A4A] to-[#1E5FA6] rounded-full flex items-center justify-center text-white shadow-lg">
          <Sparkles size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-[#1B2A4A] tracking-tight">Agente IA Herraventas</h1>
          <p className="text-[#5C6B7A] text-sm">Especialista en herramientas y proyectos</p>
        </div>
      </div>

      <div className="flex-grow bg-gray-50 border-x border-gray-100 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                  msg.role === 'user' ? 'bg-[#4A9FD4] text-white' : 'bg-[#1B2A4A] text-white'
                }`}
              >
                {msg.role === 'user' ? <User size={20} /> : <Wrench size={20} />}
              </div>

              <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                <div
                  className={`p-4 rounded-2xl shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-[#1E5FA6] text-white rounded-tr-none'
                      : 'bg-white text-[#1B2A4A] border border-gray-100 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>

                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 w-full">
                    {msg.recommendedProducts.map((product) => {
                      // Mapear campos Supabase (snake_case) a los del tipo Product
                      const p: Product = {
                        id: product.id,
                        nombre: product.nombre,
                        marca: product.marca,
                        categoria: product.categoria,
                        precio: product.precio,
                        descripcion: product.descripcion,
                        especificaciones: product.especificaciones ?? {},
                        imagenUrl: product.imagen_url ?? product.imagenUrl ?? '',
                        rating: product.rating ?? 4.5,
                        stock: product.stock ?? 0,
                      };
                      return (
                        <div key={p.id} className="w-full max-w-[250px]">
                          <ProductCard product={p} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Wrench size={20} />
            </div>
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
              {[0, 0.2, 0.4].map((delay, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay }}
                  className="w-2 h-2 bg-[#4A9FD4] rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white rounded-b-3xl shadow-sm border border-gray-100 p-4 z-10">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ej: Quiero lijar una puerta de madera..."
            className="flex-grow border border-gray-200 rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#4A9FD4] transition-shadow text-[#1B2A4A]"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all shadow-lg ${
              !input.trim() || isLoading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#1E5FA6] text-white hover:bg-[#1B2A4A] shadow-[#1E5FA6]/30'
            }`}
          >
            <Send size={24} className={input.trim() && !isLoading ? 'ml-1' : ''} />
          </button>
        </form>
      </div>
    </div>
  );
}
