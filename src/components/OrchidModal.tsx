import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Orchid } from '../types/orchid';
import { formatPrice } from '../utils/formatters';

interface OrchidModalProps {
  orchid: Orchid;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}

const OrchidModal: React.FC<OrchidModalProps> = ({ orchid, isOpen, onClose, onAddToCart }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="modal-content"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>×</button>
          
          <div className="modal-grid">
            <motion.div 
              className="modal-image-container"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img 
                src={orchid.imageUrl} 
                alt={orchid.name} 
                className="modal-image"
              />
            </motion.div>

            <motion.div 
              className="modal-info"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2>{orchid.name}</h2>
              <div className="modal-price">
                {formatPrice(orchid.price)} VND
              </div>
              <div className="modal-description">
                <h3>Description</h3>
                <p>{orchid.description}</p>
              </div>
              
              <div className="modal-details">
                <h3>Care Instructions</h3>
                <ul>
                  <li>🌡️ Temperature: 18-25°C</li>
                  <li>💧 Water: Once a week</li>
                  <li>☀️ Light: Bright, indirect sunlight</li>
                  <li>🌱 Soil: Well-draining orchid mix</li>
                </ul>
              </div>

              <div className="modal-actions">
                <motion.button
                  className="add-to-cart-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onAddToCart();
                    onClose();
                  }}
                >
                  Add to Cart 🛒
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrchidModal; 