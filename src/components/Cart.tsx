import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { Orchid } from '../types/orchid';
import { formatPrice } from '../utils/formatters';

interface CartProps {
  items: { orchid: Orchid; quantity: number }[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (orchidId: number, change: number) => void;
  onRemoveItem: (orchidId: number) => void;
}

const Cart: React.FC<CartProps> = ({ 
  items, 
  isOpen, 
  onClose, 
  onUpdateQuantity,
  onRemoveItem 
}) => {
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.orchid.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/order', { state: { items } });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="cart-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="cart-panel"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="cart-header">
            <h2>Your Cart 🛒</h2>
            <button className="cart-close" onClick={onClose}>×</button>
          </div>

          <div className="cart-items">
            {items.length === 0 ? (
              <motion.div
                className="cart-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="cart-empty-icon">🌺</span>
                <p>Your cart is empty</p>
                <button className="continue-shopping" onClick={onClose}>
                  Continue Shopping
                </button>
              </motion.div>
            ) : (
              <AnimatePresence>
                {items.map(({ orchid, quantity }) => (
                  <motion.div
                    key={orchid.id}
                    className="cart-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <img src={orchid.imageUrl} alt={orchid.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h3>{orchid.name}</h3>
                      <p className="cart-item-price">{formatPrice(orchid.price)} VND</p>
                    </div>
                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => onUpdateQuantity(orchid.id, -1)}
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => onUpdateQuantity(orchid.id, 1)}>
                          +
                        </button>
                      </div>
                      <button 
                        className="remove-item"
                        onClick={() => onRemoveItem(orchid.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {items.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span className="total-amount">{formatPrice(total)} VND</span>
              </div>
              <motion.button
                className="checkout-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Cart; 