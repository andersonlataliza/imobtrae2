import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Header */}
      <div 
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/5797899/pexels-photo-5797899.jpeg)', backgroundSize: 'cover' }}
      >
        <div className="bg-black bg-opacity-60 absolute inset-0"></div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-4xl font-bold text-white mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-white opacity-90">
            Estamos prontos para atender você
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Informações de Contato
            </h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                  <MapPin className="text-blue-900" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg text-gray-800">Endereço</h3>
                  <p className="text-gray-600">Av. Paulista, 1000, São Paulo - SP, 01310-100</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                  <Phone className="text-blue-900" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg text-gray-800">Telefone</h3>
                  <p className="text-gray-600">(11) 5555-5555</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                  <Mail className="text-blue-900" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg text-gray-800">Email</h3>
                  <p className="text-gray-600">contato@imobiliaria.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                  <Clock className="text-blue-900" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg text-gray-800">Horário de Atendimento</h3>
                  <p className="text-gray-600">Segunda a Sexta: 9h às 18h</p>
                  <p className="text-gray-600">Sábado: 9h às 13h</p>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="bg-gray-200 h-80 rounded-lg">
              {/* In a real app, this would be a map component */}
              <div className="w-full h-full flex items-center justify-center">
                <MapPin size={40} className="text-blue-900" />
                <p className="ml-2 text-gray-700">Mapa indisponível na versão demo</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Envie uma Mensagem
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;