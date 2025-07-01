import React from 'react';
import { Home, MapPin, Bath, BedDouble, Ruler } from 'lucide-react';
import { Property } from '../types';
import { formatCurrency, formatArea } from '../utils/formatters';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <div className="h-56 overflow-hidden">
          <motion.img 
            src={property.images[0]} 
            alt={property.title} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="absolute top-4 right-4">
          <motion.span 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`px-3 py-1 rounded-full text-xs font-semibold ${property.type === 'sale' ? 'bg-blue-900 text-white' : 'bg-amber-500 text-white'}`}
          >
            {property.type === 'sale' ? 'Venda' : 'Aluguel'}
          </motion.span>
          {property.featured && (
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="ml-2 px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold"
            >
              Destaque
            </motion.span>
          )}
        </div>
      </div>
      
      <div className="p-5">
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-semibold mb-2 text-gray-800"
        >
          {property.title}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-blue-900 mb-4"
        >
          {formatCurrency(property.price)}
          {property.type === 'rent' && <span className="text-sm text-gray-600 font-normal"> /mês</span>}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center text-gray-600 mb-4"
        >
          <MapPin size={18} className="mr-1" />
          <p className="text-sm">{property.address}, {property.city}</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-between py-3 border-t border-gray-100"
        >
          <div className="flex items-center text-gray-700">
            <BedDouble size={18} className="mr-1" />
            <span>{property.bedrooms} {property.bedrooms > 1 ? 'quartos' : 'quarto'}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Bath size={18} className="mr-1" />
            <span>{property.bathrooms} {property.bathrooms > 1 ? 'banheiros' : 'banheiro'}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Ruler size={18} className="mr-1" />
            <span>{formatArea(property.area)}</span>
          </div>
        </motion.div>
        
        <Link to={`/properties/${property.id}`} className="mt-4 block">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors duration-300"
          >
            Ver Detalhes
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default PropertyCard;