import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, title }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
  };

  return (
    <div>
      {/* Main Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="h-80 md:h-96 overflow-hidden rounded-lg cursor-pointer"
          onClick={() => openLightbox(0)}
        >
          <motion.img
            src={images[0]}
            alt={`${title} - imagem principal`}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        <div className="grid grid-cols-2 gap-4">
          {images.slice(1, 5).map((image, index) => (
            <motion.div 
              key={index} 
              whileHover={{ scale: 1.02 }}
              className="h-36 md:h-44 overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openLightbox(index + 1)}
            >
              <motion.img
                src={image}
                alt={`${title} - imagem ${index + 2}`}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft size={40} />
            </button>
            <motion.div 
              key={currentImage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="max-w-4xl max-h-[80vh] mx-auto"
            >
              <img
                src={images[currentImage]}
                alt={`${title} - imagem ${currentImage + 1}`}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </motion.div>
            <button
              onClick={nextImage}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight size={40} />
            </button>
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              {currentImage + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyGallery;