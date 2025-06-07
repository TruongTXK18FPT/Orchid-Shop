import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import backgroundImage from '../assets/Background.jpeg';
import logoOrchid from '../assets/LogoOrchid.jpeg';
import '../styles/Login.css';

const Login: React.FC = () => {
  const [formType, setFormType] = useState<'login' | 'register' | 'forgot'>('login');

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const inputVariants = {
    focus: { scale: 1.02 },
  };

  return (
    <div className="login-page">
      <div className="login-bg-image" style={{ backgroundImage: `url(${backgroundImage})` }} />
      
      <motion.div
        className="login-form-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img className="login-logo" src={logoOrchid} alt="Orchid Shop Logo" />
        
        <AnimatePresence mode="wait">
          <motion.form
            className="login-form"
            key={formType}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >


            <div className="login-input-group">
              <div className="login-input-icon"><FaEnvelope /></div>
              <motion.input 
                className="login-form-input"
                type="email" 
                placeholder="Email"
                whileFocus="focus"
                variants={inputVariants}
              />
            </div>

            {formType !== 'forgot' && (
              <div className="login-input-group">
                <div className="login-input-icon"><FaLock /></div>
                <motion.input 
                  className="login-form-input"
                  type="password" 
                  placeholder="Password"
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </div>
            )}
            {formType === 'register' && (
              <div className="login-input-group">
                <div className="login-input-icon"><FaLock /></div>
                <motion.input 
                  className="login-form-input"
                  type="text" 
                  placeholder="Confirm Password"
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </div>
            )}

            <motion.button
              className="btn-login"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              type="submit"
            >
              {formType === 'login' ? 'Login' : formType === 'register' ? 'Register' : 'Reset Password'}
            </motion.button>

            {formType === 'login' && (
              <>
                <motion.p
                  className="login-link"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setFormType('register')}
                >
                  Don't have an account? Register
                </motion.p>
                <motion.p
                  className="login-link"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setFormType('forgot')}
                >
                  Forgot Password?
                </motion.p>
              </>
            )}

            {formType !== 'login' && (
              <motion.p
                className="login-link"
                whileHover={{ scale: 1.05 }}
                onClick={() => setFormType('login')}
              >
                Back to Login
              </motion.p>
            )}
          </motion.form>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;