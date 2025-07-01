import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Menu, X, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    navigate('/dashboard');
  };

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Imóveis', path: '/properties' },
    { name: 'Comprar', path: '/buy' },
    { name: 'Alugar', path: '/rent' },
    { name: 'Corretores', path: '/agents' },
    { name: 'Sobre', path: '/about' },
    { name: 'Contato', path: '/contact' }
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-30 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Home size={28} className={`${isScrolled ? 'text-blue-900' : 'text-white'}`} />
              <span className={`text-xl font-bold ${isScrolled ? 'text-blue-900' : 'text-white'}`}>
                Imobiliária Elite
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    to={link.path}
                    className={`font-medium ${isScrolled ? 'text-gray-800 hover:text-blue-900' : 'text-white hover:text-amber-400'} transition-colors duration-300`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Admin Panel Button */}
              <motion.div
                whileHover={{ y: -2 }}
              >
                <button
                  onClick={() => setShowAuthModal(true)}
                  className={`flex items-center space-x-1 font-medium px-4 py-2 rounded-lg ${
                    isScrolled 
                      ? 'bg-blue-900 text-white hover:bg-blue-800' 
                      : 'bg-white text-blue-900 hover:bg-gray-100'
                  } transition-colors duration-300`}
                >
                  <LayoutDashboard size={18} />
                  <span>Painel Admin</span>
                </button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleMenu}
                className={`${isScrolled ? 'text-gray-800' : 'text-white'} focus:outline-none`}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isOpen ? 1 : 0,
              height: isOpen ? 'auto' : 0
            }}
            className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white absolute top-full left-0 right-0 shadow-md`}
          >
            <div className="px-4 py-3 space-y-3">
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={link.path}
                    className="block font-medium text-gray-800 hover:text-blue-900 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                whileHover={{ x: 5 }}
              >
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-2 font-medium text-white bg-blue-900 px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-300 w-full"
                >
                  <LayoutDashboard size={18} />
                  <span>Painel Admin</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Navbar;