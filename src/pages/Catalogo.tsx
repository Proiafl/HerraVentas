import React, { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { productos } from '../data/productos';

export default function Catalogo() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevancia');

  const brands = ['Bosch', 'DeWalt', 'Total', 'SKIL'];
  const categories = ['Taladros', 'Amoladoras', 'Sierras', 'Lijadoras', 'Herramientas manuales', 'Accesorios'];

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...productos];
    
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.marca));
    }
    
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.categoria));
    }

    switch (sortBy) {
      case 'precio-asc':
        result.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        result.sort((a, b) => b.precio - a.precio);
        break;
      case 'novedades':
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        break;
    }

    return result;
  }, [selectedBrands, selectedCategories, sortBy]);

  const SidebarContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Marcas</h3>
        <div className="space-y-2">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-[#1E5FA6]">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#1E5FA6] focus:ring-[#1E5FA6]"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Categorías</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-[#1E5FA6]">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#1E5FA6] focus:ring-[#1E5FA6]"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Herramientas</h1>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
            <span>Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none font-semibold text-gray-900 outline-none cursor-pointer"
            >
              <option value="relevancia">Más relevantes</option>
              <option value="precio-asc">Menor precio</option>
              <option value="precio-desc">Mayor precio</option>
            </select>
          </div>

          <button
            className="md:hidden flex items-center gap-2 text-[#1E5FA6] font-medium"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <Filter size={20} /> Filtrar
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <SidebarContent />
        </aside>

        {/* Mobile Filters Modal */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileFiltersOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white p-6 overflow-y-auto shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Filtrar por</h2>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="text-gray-500">
                  <X size={24} />
                </button>
              </div>
              <SidebarContent />
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full mt-8 bg-[#1E5FA6] text-white font-semibold py-3 rounded-md"
              >
                Aplicar filtros
              </button>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-grow">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-md p-12 text-center shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No hay publicaciones que coincidan con tu búsqueda.</h3>
              <ul className="text-gray-500 text-sm list-disc list-inside">
                <li>Revisá la ortografía de la palabra.</li>
                <li>Utilizá palabras más genéricas o menos palabras.</li>
              </ul>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
