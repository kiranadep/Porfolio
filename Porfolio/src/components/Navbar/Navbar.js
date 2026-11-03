import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = ({ activeTab, onTabChange, tabs }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'intro', label: 'Intro', icon: '👋' },
    { id: 'experience', label: 'Exp.', icon: '💼' },
    { id: 'skill', label: 'Skills', icon: '🚀' },
    { id: 'project', label: 'Projects', icon: '💻' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  return (
    <motion.header 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <nav>
        {navItems.map((item, index) => (
          <motion.a
            key={item.id}
            className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
            onClick={(e) => onTabChange(item.id, e)}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {activeTab === item.id && (
              <motion.div
                className="active-indicator"
                layoutId="activeIndicator"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </motion.a>
        ))}
      </nav>
    </motion.header>
  );
};

export default Navbar;