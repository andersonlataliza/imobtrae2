import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Button from './Button';
import { motion } from 'framer-motion';

interface SearchFilterProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  type: string;
  location: string;
  priceRange: [number, number];
  bedrooms: string;
  propertyType: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    type: 'all',
    location: '',
    priceRange: [0, 2000000],
    bedrooms: 'any',
    propertyType: 'any'
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-6"
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <motion.div whileHover={{ scale: 1.02 }}>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <select
              id="type"
              name="type"
              value={filters.type}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">Comprar ou Alugar</option>
              <option value="sale">Comprar</option>
              <option value="rent">Alugar</option>
            </select>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Localização
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={filters.location}
              onChange={handleChange}
              placeholder="Cidade, bairro ou região"
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
              Preço Máximo
            </label>
            <select
              id="priceRange"
              name="priceRange"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [0, Number(e.target.value)] }))}
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="500000">Até R$ 500.000</option>
              <option value="1000000">Até R$ 1.000.000</option>
              <option value="2000000">Até R$ 2.000.000</option>
              <option value="5000000">Até R$ 5.000.000</option>
              <option value="10000000">Acima de R$ 5.000.000</option>
            </select>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
              Quartos
            </label>
            <select
              id="bedrooms"
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="any">Qualquer</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </motion.div>

          <div className="flex items-end">
            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              size="md"
            >
              <div className="flex items-center justify-center">
                <Search size={18} className="mr-2" />
                Buscar
              </div>
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchFilter;