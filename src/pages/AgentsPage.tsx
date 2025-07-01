import React from 'react';
import AgentCard from '../components/AgentCard';
import { agents } from '../data/agents';

const AgentsPage: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Header */}
      <div 
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg)', backgroundSize: 'cover' }}
      >
        <div className="bg-black bg-opacity-60 absolute inset-0"></div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-4xl font-bold text-white mb-4">
            Nossos Corretores
          </h1>
          <p className="text-xl text-white opacity-90">
            Conheça nossa equipe de profissionais especializados
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Especialistas em Imóveis Prontos para Ajudar
          </h2>
          <p className="text-gray-600">
            Nossa equipe de corretores combina experiência no mercado imobiliário com atendimento personalizado. 
            Estamos comprometidos em encontrar a propriedade perfeita para você, oferecendo 
            orientação em cada etapa do processo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;