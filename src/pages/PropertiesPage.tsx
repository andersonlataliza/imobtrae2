import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchFilter from '../components/SearchFilter';
import PropertyCard from '../components/PropertyCard';
import { Property } from '../types';
import { properties } from '../data/properties';
import { SearchFilters } from '../components/SearchFilter';
import { GridIcon, List } from 'lucide-react';

const PropertiesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const initialType = searchParams.get('type') || 'all';
  
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      let filtered = [...properties];
      
      const type = searchParams.get('type');
      if (type === 'sale' || type === 'rent') {
        filtered = filtered.filter(property => property.type === type);
      }
      
      setFilteredProperties(filtered);
      setIsLoading(false);
    }, 500);
  }, [searchParams]);
  
  const handleSearch = (filters: SearchFilters) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filtered = [...properties];
      
      if (filters.type !== 'all') {
        filtered = filtered.filter(property => property.type === filters.type);
      }
      
      if (filters.location) {
        filtered = filtered.filter(property => 
          property.city.toLowerCase().includes(filters.location.toLowerCase()) ||
          property.address.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      
      if (filters.bedrooms !== 'any') {
        const minBedrooms = parseInt(filters.bedrooms);
        filtered = filtered.filter(property => property.bedrooms >= minBedrooms);
      }
      
      filtered = filtered.filter(property => property.price <= filters.priceRange[1]);
      
      setFilteredProperties(filtered);
      setIsLoading(false);
    }, 500);
  };
  
  return (
    <div className="pt-16">
      {/* Header with background */}
      <div 
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg)', backgroundSize: 'cover' }}
      >
        <div className="bg-black bg-opacity-60 absolute inset-0"></div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-4xl font-bold text-white mb-4">
            {initialType === 'rent' ? 'Imóveis para Alugar' : 
             initialType === 'sale' ? 'Imóveis à Venda' : 
             'Todos os Imóveis'}
          </h1>
          <p className="text-xl text-white opacity-90">
            Encontre o imóvel ideal para você e sua família
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Filters */}
        <div className="mb-8">
          <SearchFilter onSearch={handleSearch} />
        </div>
        
        {/* Results Count and View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-700">
            {isLoading ? 'Buscando imóveis...' : `${filteredProperties.length} imóveis encontrados`}
          </p>
          <div className="flex space-x-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-600'}`}
            >
              <GridIcon size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-600'}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
        
        {/* Properties Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhum imóvel encontrado</h3>
            <p className="text-gray-600">Tente ajustar seus filtros de busca.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "space-y-8"
          }>
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;