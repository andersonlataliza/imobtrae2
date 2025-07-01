import React, { useState } from 'react';
import Button from './Button';
import { motion } from 'framer-motion';

interface ContactFormProps {
  propertyId?: string;
  propertyTitle?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ propertyId, propertyTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: propertyTitle 
      ? `Olá, estou interessado no imóvel "${propertyTitle}". Por favor, entre em contato comigo para mais informações.` 
      : ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: propertyTitle 
            ? `Olá, estou interessado no imóvel "${propertyTitle}". Por favor, entre em contato comigo para mais informações.` 
            : ''
        });
        setSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-6"
    >
      <h3 className="text-xl font-semibold mb-4">
        {propertyId ? 'Interessado neste imóvel?' : 'Entre em Contato'}
      </h3>
      
      {submitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 text-green-700 p-4 rounded-lg mb-4"
        >
          Mensagem enviada com sucesso! Em breve entraremos em contato.
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="mb-4"
          >
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="mb-4"
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="mb-4"
          >
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefone*
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="mb-4"
          >
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </motion.div>
          
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
          </Button>
        </form>
      )}
    </motion.div>
  );
};

export default ContactForm;