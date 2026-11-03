import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteRight, FaDownload, FaArrowRight } from 'react-icons/fa';
import resumePdf from '../../assets/KiranAdep_SoftwareEngineer.pdf';
import './Intro.css';

const Intro = ({ onTabChange, profile }) => {
  const name = profile?.name || 'Kiran Ramesh Adep';
  const title = profile?.title || 'Software Engineer | Java · Python · .NET';
  const bio =
    profile?.bio ||
    `I'm a Software Engineer with 2+ years of experience building scalable backend systems, RESTful APIs, and full-stack applications using Java, Python, and C#/.NET. Proficient in Spring Boot, ASP.NET Core, microservices, and relational databases. I also work with AI/ML tools and agentic development assistants (Cursor, GitHub Copilot, Claude Code) to ship clean, reliable solutions faster.`;

  const getAvatarImg = (img) => {
    if (!img) return '/images/photo2.png';
    if (img.startsWith('http') || img.startsWith('/images') || img.startsWith('data:')) {
      return img;
    }
    return `http://127.0.0.1:8000${img.startsWith('/') ? '' : '/'}${img}`;
  };

  const avatarSrc = getAvatarImg(profile?.avatar_url || profile?.avatar);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="intro-section" id="intro">
      <div className="intro-container">
        {/* Avatar */}
        <motion.div
          className="avatar"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="avatar-glow"></div>

          <div className="avatar-circle">
            <img src={avatarSrc} alt={name} />
          </div>

          <div className="avatar-decoration">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          className="intro-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="greeting" variants={itemVariants}>
            <span className="wave">👋</span> Hello, I'm
          </motion.div>

          <motion.h1 className="name" variants={itemVariants}>
            {name}
          </motion.h1>

          <motion.h2 className="title text-gradient" variants={itemVariants}>
            {title}
          </motion.h2>

          <motion.p className="description" variants={itemVariants}>
            {bio}
          </motion.p>

          <motion.div className="cta-buttons" variants={itemVariants}>
            <motion.button
              className="btn btn-primary"
              onClick={(e) => onTabChange('skill', e)}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(86, 53, 196, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              See My Skills <FaArrowRight className="btn-icon" />
            </motion.button>

            <motion.a
              href={profile?.resume_url || resumePdf}
              download="KiranAdep_SoftwareEngineer.pdf"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload className="btn-icon" /> Download CV
            </motion.a>
          </motion.div>

          <motion.div className="quote-icon" variants={itemVariants}>
            <FaQuoteRight />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Intro;
