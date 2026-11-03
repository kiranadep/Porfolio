import React from 'react';
import { motion } from 'framer-motion';
import { FaSchool, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import './Experience.css';

const defaultExperiences = [
  // Education
  {
    year: '2018',
    icon: <FaSchool />,
    title: 'SSC – School Education',
    company: 'Nethaji SubhasChandra Bose High School, Solapur',
    description: '',
    type: 'education',
  },
  {
    year: '2020',
    icon: <FaSchool />,
    title: 'Higher Secondary (Science)',
    company: 'D.B.F. Dayanand College of Arts & Science, Solapur',
    description: '',
    type: 'education',
  },
  {
    year: 'Jan 2021 – Jul 2024',
    icon: <FaGraduationCap />,
    title: 'B.Tech – Computer Science',
    company: 'N.K. Orchid College of Engineering & Technology, Solapur',
    description: '',
    type: 'education',
  },

  // Internships
  {
    year: 'May 2024 – Aug 2024',
    icon: <FaBriefcase />,
    title: 'Data Analyst (Intern)',
    company: 'Zidio Development',
    description:
      'Built social-media-driven customer segmentation tools improving targeting by ~15%. Developed voice-based emotion detection and digit recognition modules using CNNs and Tkinter.',
    type: 'work',
  },
  {
    year: 'Aug 2024 – Present',
    icon: <FaBriefcase />,
    title: 'Software Engineer',
    company: 'LSL Technologies Pvt. Ltd.',
    description:
      'Building scalable backend services and RESTful APIs using Java and Python. Working with Spring Boot, microservices, and relational databases in agile environments.',
    type: 'work',
    highlight: true,
  },
  {
    year: 'Present',
    icon: <FaBriefcase />,
    title: 'Open to Opportunities',
    company: '',
    description:
      'Actively seeking full-time Software Developer / Backend Engineer roles where I can build scalable APIs and web applications with clean, maintainable code.',
    type: 'future',
  },
];

const Experience = ({ experiences: experiencesProp }) => {
  const rawExperiences = experiencesProp && experiencesProp.length > 0 ? experiencesProp : defaultExperiences;

  const experiences = rawExperiences.map((exp) => {
    const expType = exp.type || exp.experience_type || 'work';
    let icon = exp.icon;
    if (!icon) {
      if (expType === 'education') {
        icon = String(exp.year || '').includes('2024') ? <FaGraduationCap /> : <FaSchool />;
      } else {
        icon = <FaBriefcase />;
      }
    }

    return {
      year: exp.year,
      icon,
      title: exp.title,
      company: exp.company,
      description: exp.description,
      type: expType,
      highlight: exp.highlight ?? exp.is_highlight ?? false,
    };
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="experience-section" id="experience">
      <div className="experience-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My <span className="text-gradient">Journey</span>
        </motion.h2>

        <motion.div
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="timeline-line"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`timeline-item ${
                index % 2 === 0 ? 'left' : 'right'
              } ${exp.highlight ? 'highlight' : ''}`}
              variants={itemVariants}
            >
              <div className="timeline-content">
                <div className="timeline-icon">{exp.icon}</div>
                <div className="timeline-year">{exp.year}</div>
                <h3 className="timeline-title">{exp.title}</h3>
                {exp.company && (
                  <p className="timeline-company">{exp.company}</p>
                )}
                {exp.description && (
                  <p className="timeline-description">{exp.description}</p>
                )}
                <span className={`timeline-badge ${exp.type}`}>
                  {exp.type === 'education'
                    ? '📚 Education'
                    : exp.type === 'future'
                    ? '🚀 Open to Work'
                    : exp.highlight
                    ? '💼 Work Experience'
                    : '💼 Internship'}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
