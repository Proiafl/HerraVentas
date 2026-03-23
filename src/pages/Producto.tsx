import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, ShieldCheck } from 'lucide-react';
import { productos } from '../data/productos';
import { useStore } from '../store/useStore';
import { usePageSEO } from '../hooks/usePageSEO';
import clsx from 'clsx';

export default function Producto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [cantidad, setCantidad] = useState(1);

  const product = productos.find((p) => p.id === id);
  const isWishlisted = product ? wishlist.some((item) => item.id === product.id) : false;

  const productSchema = product ? {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: product.nombre,
        image: `https://www.herraventas.com.ar${product.imagenUrl}`,
        description: product.descripcion,
        brand: {
          '@type': 'Brand',
          name: product.marca,
        },
        offers: {
          '@type': 'Offer',
          url: `https://www.herraventas.com.ar/producto/${product.id}`,
          priceCurrency: 'ARS',
          price: product.precio,
          availability: product.stock > 0
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'Organization',
            name: 'HerraVentas',
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          bestRating: '5',
          worstRating: '1',
          ratingCount: '42',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.herraventas.com.ar/' },
          { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://www.herraventas.com.ar/catalogo' },
          { '@type': 'ListItem', position: 3, name: product.categoria, item: `https://www.herraventas.com.ar/catalogo?categoria=${encodeURIComponent(product.categoria)}` },
          { '@type': 'ListItem', position: 4, name: product.nombre, item: `https://www.herraventas.com.ar/producto/${product.id}` },
        ],
      },
    ],
  } : undefined;

  usePageSEO(
    product
      ? {
          title: `${product.nombre} | ${product.marca} | HerraVentas`,
          description: `${product.descripcion} Comprar ${product.nombre} al mejor precio en Argentina. Envíos a todo el país.`,
          canonical: `/producto/${product.id}`,
          ogType: 'product',
          schema: productSchema,
        }
      : {
          title: 'Producto no encontrado | HerraVentas',
          description: 'El producto que buscas no existe. Explore nuestro catálogo de herramientas.',
          noIndex: true,
        }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-normal text-gray-800 mb-4">Producto no encontrado</h2>
        <button onClick={() => navigate('/catalogo')} className="text-[#1E5FA6] font-medium hover:underline">
          Volver al catálogo
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, cantidad);
    navigate('/carrito');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <Link to="/" className="hover:text-[#1E5FA6]">Inicio</Link>
        <span>›</span>
        <Link to="/catalogo" className="hover:text-[#1E5FA6]">Herramientas</Link>
        <span>›</span>
        <Link to={`/catalogo?categoria=${product.categoria}`} className="hover:text-[#1E5FA6]">{product.categoria}</Link>
        <span>›</span>
        <span className="text-gray-800">{product.marca}</span>
      </div>

      <div className="bg-white rounded-md shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Image Gallery */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-square mb-4 p-4 border border-gray-100 rounded-md flex items-center justify-center">
              <img
                src={product.imagenUrl}
                alt={`${product.nombre} - ${product.marca} - ${product.categoria} | HerraVentas`}
                width={400}
                height={400}
                className="max-w-full max-h-full object-contain"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 text-gray-400 hover:text-[#1E5FA6]"
              >
                <Heart size={28} className={clsx(isWishlisted && "fill-[#1E5FA6] text-[#1E5FA6]")} />
              </button>
            </div>
          </div>

          {/* Center: Product Details */}
          <div className="md:col-span-4 flex flex-col">
            <div className="text-sm text-gray-500 mb-1">Nuevo | +100 vendidos</div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 leading-tight mb-2">
              {product.nombre}
            </h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-[#1E5FA6] text-sm">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-sm text-gray-500">({product.rating})</span>
            </div>

            <div className="mb-6">
              <div className="text-4xl font-light text-gray-900 mb-1">
                $ {product.precio.toLocaleString('es-AR')}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Características principales</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><span className="font-semibold">Marca:</span> {product.marca}</li>
                {Object.entries(product.especificaciones).slice(0, 4).map(([key, value], idx) => (
                  <li key={idx}><span className="font-semibold">{key}:</span> {value}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Descripción</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.descripcion}
              </p>
            </div>
          </div>

          {/* Right: Buy Box */}
          <div className="md:col-span-3">
            <div className="border border-gray-200 rounded-lg p-6 flex flex-col gap-4">

              <div className="mt-4">
                <div className="font-semibold text-gray-900 mb-2">Stock disponible</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Cantidad:</span>
                  <select
                    value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm font-medium outline-none focus:border-[#1E5FA6]"
                  >
                    {[...Array(Math.min(6, product.stock))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} unidad{i > 0 ? 'es' : ''}</option>
                    ))}
                  </select>
                  <span className="text-xs text-gray-500">({product.stock} disponibles)</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-[#1E5FA6] text-white font-semibold py-3 rounded-md hover:bg-[#15467A] transition-colors"
                >
                  Comprar ahora
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-50 text-[#1E5FA6] font-semibold py-3 rounded-md hover:bg-blue-100 transition-colors"
                >
                  Agregar al carrito
                </button>
              </div>

              <div className="mt-4 space-y-3 text-sm text-gray-500">
                <div className="flex items-start gap-2">
                  <ShieldCheck size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <p><span className="text-[#1E5FA6]">Compra Protegida</span>, recibí el producto que esperabas o te devolvemos tu dinero.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Full Specs Table */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h2 className="text-xl font-normal text-gray-900 mb-6">Características técnicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <table className="w-full text-sm text-left">
              <tbody>
                {Object.entries(product.especificaciones).map(([key, value], idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <th className="py-3 px-4 font-semibold text-gray-900 w-1/2">{key}</th>
                    <td className="py-3 px-4 text-gray-700">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
