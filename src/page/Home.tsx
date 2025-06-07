import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ExoticOrchid from '../assets/ExoticOrchid.jpeg';
import PremiumSection from '../assets/PremiumSection.jpeg';
import SpecialOffer from '../assets/Special Offer.jpeg';
import PhalaenopsisOrchid from '../assets/PhalaenopsisOrchid.jpg';
import CattleyaOrchid from '../assets/CattleyaOrchid.jpg';
import DendrobiumOrchid from '../assets/Dendrobium Orchid.jpeg';
import '../styles/Home.css';

const slides = [
  {
    url: ExoticOrchid,
    title: 'Exotic Orchids',
    description: 'Discover our rare collection of exotic orchids, carefully curated from around the world. Each flower tells a unique story of beauty and elegance.'
  },
  {
    url: PremiumSection,
    title: 'Premium Selection',
    description: 'Hand-picked premium orchids for your home, featuring the most stunning varieties. Transform your space with natural beauty.'
  },
  {
    url: SpecialOffer,
    title: 'Special Offers',
    description: 'Explore our special collection with amazing deals. Find the perfect orchid to start or expand your collection at unbeatable prices.'
  }
];

const featuredItems = [
  {
    title: "Phalaenopsis Orchid",
    description: "Known as the Moth Orchid, this elegant flower brings grace and sophistication to any space.",
    image: PhalaenopsisOrchid
  },
  {
    title: "Cattleya Orchid",
    description: "The queen of orchids, featuring large, fragrant blooms in stunning colors and patterns.",
    image: CattleyaOrchid
  },
  {
    title: "Dendrobium Orchid",
    description: "Beautiful cascading flowers that create a dramatic display of color and beauty.",
    image: DendrobiumOrchid
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="slider-container">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="slide"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentSlide === index ? 1 : 0,
                scale: currentSlide === index ? 1 : 1.1
              }}
              transition={{ duration: 0.5 }}
              style={{ display: currentSlide === index ? 'block' : 'none' }}
            >
              <img src={slide.url} alt={slide.title} className="slide-image" />
              <div className="slide-overlay">
                <motion.div 
                  className="slide-content"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  <motion.button
                    className="btn-shop-now"
                    onClick={() => navigate('/shop')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Shop Now
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
          <button className="slider-nav prev" onClick={prevSlide}>❮</button>
          <button className="slider-nav next" onClick={nextSlide}>❯</button>
          <div className="slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="featured-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Featured Collections
        </motion.h2>
        <div className="featured-grid">
          {featuredItems.map((item, index) => (
            <motion.div
              key={index}
              className="featured-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              <div 
                className="card-image" 
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <motion.button
                  className="btn-buy-now"
                  onClick={() => navigate('/shop')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Buy Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
