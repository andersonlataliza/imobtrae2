import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { Agent } from '../types';
import { motion } from 'framer-motion';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="h-64 overflow-hidden">
        <motion.img 
          src={agent.photo} 
          alt={agent.name} 
          className="w-full h-full object-cover object-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="p-5">
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-semibold text-gray-800"
        >
          {agent.name}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-blue-900 font-medium mb-3"
        >
          {agent.position}
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-4 line-clamp-3"
        >
          {agent.bio}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-100 pt-4 space-y-2"
        >
          <div className="flex items-center text-gray-700">
            <Phone size={18} className="mr-2 text-blue-900" />
            <span>{agent.contact}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Mail size={18} className="mr-2 text-blue-900" />
            <span>{agent.email}</span>
          </div>
        </motion.div>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors duration-300"
        >
          Contatar
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AgentCard;