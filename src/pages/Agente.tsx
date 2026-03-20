import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Wrench, User, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { productos } from '../data/productos';
import ProductCard from '../components/ProductCard';

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  recommendedProducts?: any[];
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
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = `Sos un experto en herramientas de construcción y hogar. Trabajás para Herraventas, una ferretería online argentina. Cuando el usuario describa un trabajo o tarea, recomendá la herramienta más adecuada, mencionando marca (preferentemente Bosch, DeWalt, Total o SKIL), tipo de herramienta, y un precio estimado en pesos argentinos. Sé amigable, directo y conciso. Si el usuario pregunta algo fuera de herramientas, redirigilo amablemente al tema.

Aquí tienes nuestro catálogo actual para recomendar:
${JSON.stringify(productos.map(p => ({ id: p.id, nombre: p.nombre, marca: p.marca, precio: p.precio, categoria: p.categoria }))) }

Si recomiendas un producto específico de nuestro catálogo, incluye su ID en tu respuesta en el formato [PRODUCT_ID:id] para que podamos mostrar la tarjeta del producto.`;

      const chat = ai.chats.create({
        model: 'gemini-3.1-pro-preview',
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      // Reconstruct history for context
      for (const msg of messages.slice(1)) {
        await chat.sendMessage({ message: msg.content });
      }

      const response = await chat.sendMessage({ message: userMessage.content });
      let responseText = response.text || 'Lo siento, no pude procesar tu solicitud.';
      
      // Extract product IDs
      const productIds: string[] = [];
      const regex = /\[PRODUCT_ID:(\d+)\]/g;
      let match;
      while ((match = regex.exec(responseText)) !== null) {
        productIds.push(match[1]);
      }
      
      // Remove tags from text
      responseText = responseText.replace(/\[PRODUCT_ID:\d+\]/g, '').trim();

      const recommendedProducts = productos.filter(p => productIds.includes(p.id));

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: responseText,
        recommendedProducts: recommendedProducts.length > 0 ? recommendedProducts : undefined,
      };

      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      console.error('Error calling Gemini:', error);
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
                    {msg.recommendedProducts.map(product => (
                      <div key={product.id} className="w-full max-w-[250px]">
                        <ProductCard product={product} />
                      </div>
                    ))}
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
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 bg-[#4A9FD4] rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 bg-[#4A9FD4] rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 bg-[#4A9FD4] rounded-full"
              />
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
