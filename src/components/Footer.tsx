import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home size={24} className="text-amber-500" />
              <span className="text-xl font-bold">Imobiliária Elite</span>
            </div>
            <p className="text-gray-400 mb-4">
              Oferecendo as melhores soluções imobiliárias desde 2005. Nossa missão é ajudar você a encontrar o imóvel dos seus sonhos.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Início</Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Imóveis</Link>
              </li>
              <li>
                <Link to="/agents" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Corretores</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Sobre Nós</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Contato</Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tipos de Imóveis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?type=apartment" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Apartamentos</Link>
              </li>
              <li>
                <Link to="/properties?type=house" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Casas</Link>
              </li>
              <li>
                <Link to="/properties?type=commercial" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Comercial</Link>
              </li>
              <li>
                <Link to="/properties?type=land" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Terrenos</Link>
              </li>
              <li>
                <Link to="/properties?type=luxury" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Imóveis de Luxo</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-amber-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Av. Paulista, 1000, São Paulo - SP, 01310-100</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-amber-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400">(11) 5555-5555</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-amber-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400">contato@imobiliaria.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 Imobiliária Elite. Todos os direitos reservados.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-amber-500 transition-colors duration-300">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors duration-300">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors duration-300">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;