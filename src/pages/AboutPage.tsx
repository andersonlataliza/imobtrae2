import React from 'react';
import { Award, Users, Home, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { agents } from '../data/agents';
import AgentCard from '../components/AgentCard';
import Button from '../components/Button';

const AboutPage: React.FC = () => {
  const featuredAgents = agents.slice(0, 3);
  
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div 
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/7579402/pexels-photo-7579402.jpeg)', backgroundSize: 'cover' }}
      >
        <div className="bg-black bg-opacity-60 absolute inset-0"></div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-4xl font-bold text-white mb-4">
            Sobre Nós
          </h1>
          <p className="text-xl text-white opacity-90 max-w-xl">
            Somos uma imobiliária comprometida com excelência e dedicada a encontrar as melhores 
            soluções para nossos clientes desde 2005.
          </p>
        </div>
      </div>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Nossa História</h2>
              <p className="text-gray-600 mb-4">
                Fundada em 2005, a Imobiliária Elite nasceu com uma visão clara: 
                transformar a experiência de compra, venda e locação de imóveis, tornando-a 
                mais transparente, ágil e satisfatória para todos os envolvidos.
              </p>
              <p className="text-gray-600 mb-4">
                Ao longo dos anos, construímos uma reputação sólida baseada em confiança, 
                profissionalismo e resultados comprovados. Nossa equipe cresceu, incorporando 
                especialistas em diferentes áreas do mercado imobiliário, sempre mantendo nosso 
                compromisso com a excelência.
              </p>
              <p className="text-gray-600">
                Hoje, somos uma das imobiliárias mais respeitadas do mercado, com uma carteira 
                diversificada de imóveis residenciais e comerciais em localizações privilegiadas, 
                atendendo tanto investidores quanto famílias em busca do lar ideal.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-64 overflow-hidden rounded-lg">
                <img 
                  src="https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg" 
                  alt="Nosso escritório" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 overflow-hidden rounded-lg">
                <img 
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg" 
                  alt="Nossa equipe" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 overflow-hidden rounded-lg">
                <img 
                  src="https://images.pexels.com/photos/3182777/pexels-photo-3182777.jpeg" 
                  alt="Reunião de negócios" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 overflow-hidden rounded-lg">
                <img 
                  src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg" 
                  alt="Planejamento" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values and Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nossos Valores e Missão</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Acreditamos que cada imóvel é mais que uma propriedade - é o cenário de histórias de vida, 
              sonhos e futuro. Por isso, trabalhamos com princípios claros que guiam nossas ações diárias.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Award className="text-blue-900" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excelência</h3>
              <p className="text-gray-600">
                Buscamos a excelência em cada detalhe, oferecendo um serviço impecável do início ao fim do processo.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Users className="text-blue-900" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Confiança</h3>
              <p className="text-gray-600">
                Construímos relacionamentos baseados em transparência, ética e cumprimento de compromissos.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Home className="text-blue-900" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dedicação</h3>
              <p className="text-gray-600">
                Cada cliente recebe atenção personalizada, com dedicação total às suas necessidades específicas.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Lightbulb className="text-blue-900" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inovação</h3>
              <p className="text-gray-600">
                Buscamos constantemente novas tecnologias e métodos para melhorar a experiência imobiliária.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nossa Equipe</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Conheça alguns dos profissionais dedicados que fazem da Imobiliária Elite um 
              sinônimo de qualidade e confiança no mercado imobiliário.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/agents">
              <Button variant="primary">Ver Todos os Corretores</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-blue-900">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Pronto para Trabalhar Conosco?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Seja para comprar, vender ou alugar um imóvel, nossa equipe está pronta para oferecer 
              o suporte que você precisa.
            </p>
            <Link to="/contact">
              <Button variant="secondary" size="lg">Entre em Contato</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;