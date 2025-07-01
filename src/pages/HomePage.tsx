import React from 'react';
import { ChevronRight, Home as HomeIcon, Building, Key, Map, Award, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchFilter from '../components/SearchFilter';
import PropertyCard from '../components/PropertyCard';
import TestimonialCard from '../components/TestimonialCard';
import AgentCard from '../components/AgentCard';
import Button from '../components/Button';
import { properties } from '../data/properties';
import { agents } from '../data/agents';
import { testimonials } from '../data/testimonials';
import { SearchFilters } from '../components/SearchFilter';

const HomePage: React.FC = () => {
  const featuredProperties = properties.filter(property => property.featured);
  const featuredAgents = agents.slice(0, 3);

  const handleSearch = (filters: SearchFilters) => {
    console.log('Search filters:', filters);
    // In a real app, this would navigate to the properties page with the filters
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Encontre o Imóvel Perfeito para o Seu Estilo de Vida
            </h1>
            <p className="text-xl text-white opacity-90 mb-8">
              Sua jornada para o lar dos sonhos começa aqui. Explore nossa seleção exclusiva de propriedades premium.
            </p>
            <div className="flex space-x-4">
              <Link to="/properties?type=sale">
                <Button variant="primary" size="lg">Comprar</Button>
              </Link>
              <Link to="/properties?type=rent">
                <Button variant="secondary" size="lg">Alugar</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 -mt-24 relative z-20 mb-12">
        <SearchFilter onSearch={handleSearch} />
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Imóveis em Destaque</h2>
              <p className="text-gray-600 mt-2">Explore nossa seleção de propriedades exclusivas</p>
            </div>
            <Link to="/properties" className="flex items-center text-blue-900 font-medium hover:text-blue-700 transition-colors duration-300">
              Ver Todos <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Por Que Escolher a Imobiliária Elite</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Somos especialistas no mercado imobiliário, oferecendo soluções personalizadas para cada cliente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Award className="text-blue-900" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Experiência Comprovada</h3>
              <p className="text-gray-600">
                Com mais de 15 anos no mercado, somos referência em soluções imobiliárias de alto padrão.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <HomeIcon className="text-blue-900" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Imóveis Exclusivos</h3>
              <p className="text-gray-600">
                Oferecemos um portfólio selecionado de propriedades em localizações privilegiadas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Lightbulb className="text-blue-900" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Consultoria Especializada</h3>
              <p className="text-gray-600">
                Nossa equipe de especialistas oferece orientação personalizada em cada etapa da negociação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Nossos Corretores</h2>
              <p className="text-gray-600 mt-2">Profissionais especializados prontos para atender você</p>
            </div>
            <Link to="/agents" className="flex items-center text-blue-900 font-medium hover:text-blue-700 transition-colors duration-300">
              Ver Todos <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blue-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">O Que Nossos Clientes Dizem</h2>
            <p className="text-blue-100 mt-2">A satisfação de nossos clientes é o nosso maior orgulho</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <TestimonialCard 
                key={testimonial.id}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                avatar={testimonial.avatar}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gray-50 rounded-xl p-8 md:p-12 shadow-md">
            <div className="md:flex items-center justify-between">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Pronto para encontrar seu imóvel ideal?
                </h2>
                <p className="text-gray-600 text-lg">
                  Entre em contato conosco agora e descubra como podemos ajudar.
                </p>
              </div>
              <div>
                <Link to="/contact">
                  <Button variant="primary" size="lg">
                    Fale Conosco
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;