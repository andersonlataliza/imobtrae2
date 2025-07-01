import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bath, BedDouble, Ruler, Heart, Share, Check } from 'lucide-react';
import { properties } from '../data/properties';
import { Property } from '../types';
import PropertyGallery from '../components/PropertyGallery';
import ContactForm from '../components/ContactForm';
import Button from '../components/Button';
import { formatCurrency, formatArea } from '../utils/formatters';

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProperty = properties.find(p => p.id === id) || null;
      setProperty(foundProperty);
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }
  
  if (!property) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Imóvel não encontrado</h2>
          <p className="text-gray-600 mb-6">O imóvel que você está procurando não existe ou foi removido.</p>
          <Link to="/properties">
            <Button variant="primary">Ver Todos os Imóveis</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  return (
    <div className="pt-16">
      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-900">Início</Link>
            <span className="mx-2">/</span>
            <Link to="/properties" className="hover:text-blue-900">Imóveis</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{property.title}</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Title and Actions */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
            <div className="flex items-center mt-2">
              <MapPin size={18} className="text-gray-600 mr-1" />
              <p className="text-gray-600">{property.address}, {property.city}</p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-3xl font-bold text-blue-900">
              {formatCurrency(property.price)}
              {property.type === 'rent' && <span className="text-sm text-gray-600 font-normal"> /mês</span>}
            </p>
          </div>
        </div>
        
        {/* Property Gallery */}
        <PropertyGallery images={property.images} title={property.title} />
        
        {/* Action Buttons */}
        <div className="flex gap-4 my-6">
          <Button 
            variant="outline" 
            onClick={toggleFavorite}
          >
            <div className="flex items-center">
              <Heart 
                size={18} 
                className={`mr-2 ${isFavorite ? 'fill-blue-900 text-blue-900' : 'text-blue-900'}`} 
              />
              {isFavorite ? 'Salvo nos Favoritos' : 'Adicionar aos Favoritos'}
            </div>
          </Button>
          <Button variant="outline">
            <div className="flex items-center">
              <Share size={18} className="mr-2 text-blue-900" />
              Compartilhar
            </div>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Detalhes do Imóvel</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <BedDouble size={20} className="mr-2 text-blue-900" />
                  <div>
                    <p className="font-medium">{property.bedrooms}</p>
                    <p className="text-sm text-gray-600">Quartos</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <Bath size={20} className="mr-2 text-blue-900" />
                  <div>
                    <p className="font-medium">{property.bathrooms}</p>
                    <p className="text-sm text-gray-600">Banheiros</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <Ruler size={20} className="mr-2 text-blue-900" />
                  <div>
                    <p className="font-medium">{formatArea(property.area)}</p>
                    <p className="text-sm text-gray-600">Área</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Descrição</h3>
              <p className="text-gray-700 mb-6">{property.description}</p>
              
              <h3 className="text-xl font-semibold mb-3">Características</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <Check size={18} className="mr-2 text-green-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Location */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Localização</h2>
              
              <div className="bg-gray-200 h-80 rounded-lg mb-4">
                {/* In a real app, this would be a map component */}
                <div className="w-full h-full flex items-center justify-center">
                  <MapPin size={40} className="text-blue-900" />
                  <p className="ml-2 text-gray-700">Mapa indisponível na versão demo</p>
                </div>
              </div>
              
              <p className="text-gray-700">
                {property.address}, {property.city}
              </p>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Contact Form */}
            <ContactForm propertyId={property.id} propertyTitle={property.title} />
            
            {/* Similar Properties would go here in a real app */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;