import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaTruck, FaCreditCard, FaBox } from 'react-icons/fa';
import type { Orchid } from '../types/orchid';
import { formatPrice } from '../utils/formatters';
import '../styles/Order.css';

// Payment method images
import visaImg from '../assets/payment/visa.png';
import mastercardImg from '../assets/payment/mastercard.png';
import momoImg from '../assets/payment/momo.png';
import zalopayImg from '../assets/payment/zalopay.png';

interface OrderItem {
  orchid: Orchid;
  quantity: number;
}

interface LocationState {
  items: OrderItem[];
}

const Order: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = (location.state as LocationState) || { items: [] };
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    note: ''
  });

  const steps = [
    { number: 1, label: 'Information', icon: <FaUser /> },
    { number: 2, label: 'Shipping', icon: <FaTruck /> },
    { number: 3, label: 'Payment', icon: <FaCreditCard /> },
    { number: 4, label: 'Review', icon: <FaBox /> }
  ];

  const paymentMethods = [
    { id: 'visa', name: 'Visa', image: visaImg },
    { id: 'mastercard', name: 'Mastercard', image: mastercardImg },
    { id: 'momo', name: 'Momo', image: momoImg },
    { id: 'zalopay', name: 'ZaloPay', image: zalopayImg }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const subtotal = items.reduce((sum, item) => sum + item.orchid.price * item.quantity, 0);
  const shipping = 50000; // Fixed shipping cost
  const total = subtotal + shipping;

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission
    console.log('Order submitted:', { formData, selectedPayment, items });
  };

  return (
    <div className="order-container">
      <motion.div 
        className="order-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="order-steps">
          <div className="step-indicator">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                className={`step ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
                whileHover={{ scale: 1.1 }}
              >
                <div className="step-number">
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                <div className="step-label">{step.label}</div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <div className="form-section">
                  <h3 className="form-title">
                    <FaUser /> Personal Information
                  </h3>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-input"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="form-section">
                  <h3 className="form-title">
                    <FaTruck /> Shipping Information
                  </h3>
                  <div className="form-group">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      name="address"
                      className="form-input"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-input"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Note (Optional)</label>
                    <textarea
                      name="note"
                      className="form-input"
                      value={formData.note}
                      onChange={handleInputChange}
                      placeholder="Add any special instructions"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="form-section">
                  <h3 className="form-title">
                    <FaCreditCard /> Payment Method
                  </h3>
                  <div className="payment-methods">
                    {paymentMethods.map((method) => (
                      <motion.div
                        key={method.id}
                        className={`payment-method ${selectedPayment === method.id ? 'selected' : ''}`}
                        onClick={() => setSelectedPayment(method.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <img src={method.image} alt={method.name} />
                        <span>{method.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="form-section">
                  <h3 className="form-title">
                    <FaBox /> Order Review
                  </h3>
                  {/* Display order summary and confirmation */}
                  <div className="review-details">
                    {/* Add review content here */}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                {currentStep > 1 && (
                  <motion.button
                    className="checkout-button"
                    onClick={handlePrevStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ flex: 1 }}
                  >
                    Previous
                  </motion.button>
                )}
                <motion.button
                  className="checkout-button"
                  onClick={currentStep === 4 ? handleSubmit : handleNextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ flex: 1 }}
                >
                  {currentStep === 4 ? 'Place Order' : 'Next'}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="order-summary">
          <h3 className="summary-title">Order Summary</h3>
          <div className="summary-items">
            {items.map((item) => (
              <motion.div
                key={item.orchid.id}
                className="summary-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="item-details">
                  <img src={item.orchid.imageUrl} alt={item.orchid.name} className="item-image" />
                  <div className="item-info">
                    <h4>{item.orchid.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="item-price">
                  {formatPrice(item.orchid.price * item.quantity)} VND
                </div>
              </motion.div>
            ))}
          </div>
          <div className="summary-total">
            <div className="total-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)} VND</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>{formatPrice(shipping)} VND</span>
            </div>
            <div className="total-row final">
              <span>Total</span>
              <span>{formatPrice(total)} VND</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Order;
