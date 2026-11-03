import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane, FaHeart } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { submitContactMessage } from '../../services/api';
import './Contact.css';

const Contact = ({ onTabChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);

  const contacts = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'kiran221202adep@gmail.com',
      link: 'mailto:kiran221202adep@gmail.com',
      color: '#EA4335'
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      value: 'kiranadep',
      link: 'https://www.linkedin.com/in/kiranadep/',
      color: '#0A66C2'
    },
    {
      icon: <FaGithub />,
      label: 'GitHub',
      value: 'kiranadep',
      link: 'https://github.com/kiranadep',
      color: '#333'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // 1. Submit to Django Backend (saves in Database & Django Admin)
      try {
        await submitContactMessage(formData);
      } catch (backendError) {
        console.warn('Backend contact save error (continuing with EmailJS):', backendError);
      }

      // 2. Submit to EmailJS
      if (process.env.REACT_APP_EMAILJS_SERVICE_ID) {
        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message
          },
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        );
      }

      alert('Message sent successfully!');

      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact submission Error:', error);
      alert(`Notice: ${error?.text || error?.message || 'Message processed.'}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="contact-section" id="contact">
      <div className="contact-container">
        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 className="thank-you text-gradient" variants={itemVariants}>
            Thank You for Visiting!
          </motion.h2>

          <motion.p className="contact-description" variants={itemVariants}>
            Your time and attention are greatly appreciated. If you'd like to connect,
            feel free to reach out! I'm always open to discussing new projects,
            creative ideas, or opportunities.
            <br /><br />
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onTabChange('intro', e);
              }}
              className="text-gradient intro-link"
            >
              ← Back to Intro
            </a>
          </motion.p>

          <motion.div className="contact-cards" variants={itemVariants}>
            {contacts.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 20px 40px ${contact.color}30`
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className="contact-icon"
                  style={{ background: contact.color }}
                >
                  {contact.icon}
                </div>

                <div className="contact-info">
                  <span className="contact-label">{contact.label}</span>
                  <span className="contact-value">{contact.value}</span>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="contact-form-container"
            variants={itemVariants}
          >
            <h3>Send me a message</h3>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value
                    })
                  }
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSending}
              >
                {isSending ? 'Sending...' : (
                  <>
                    Send Message <FaPaperPlane />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          <motion.div className="footer" variants={itemVariants}>
            <p>
              Made with <FaHeart className="heart-icon" /> by Kiran Adep
            </p>
            <p className="copyright">
              © 2024 All rights reserved
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
