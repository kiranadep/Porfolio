import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaClock } from 'react-icons/fa';
import './Projects.css';

const defaultProjects = [
  /* =========================
     NEW .NET / BACKEND PROJECTS
     ========================= */
  {
    id: 1,
    title:
      'Smart Attendance System (ASP.NET Core, React.js, React Native, PostgreSQL)',
    image: '/images/project/smart-attendance.png',
    description:
      'Full‑stack attendance management system with JWT‑based role authentication, QR‑based student onboarding, and secure access control. Implemented geo‑location and time‑based attendance validation with responsive web and mobile interfaces using React.js and React Native.',
    type: 'Full‑stack .NET Project',
    date: 'Oct 2025 – Present',
    liveLink: '',
    githubLink: '',
    technologies: [
      'ASP.NET Core',
      'React.js',
      'React Native',
      'PostgreSQL',
      'JWT Auth',
    ],
  },
  {
    id: 2,
    title:
      'HR Recruitment Portal (ASP.NET Core 8, PostgreSQL, Render Deployment)',
    image: '/images/project/hr-portal.png',
    description:
      'Secure recruitment platform supporting multiple user roles with optimized PostgreSQL queries and role‑based authentication. Deployed and maintained on Render with cloud proxy configuration for reliable production access.',
    type: 'Backend‑focused .NET Project',
    date: 'Oct 2025',
    liveLink: '',
    githubLink: '',
    technologies: [
      'ASP.NET Core 8',
      'PostgreSQL',
      'Render',
      'Role‑Based Auth',
    ],
  },
  {
    id: 3,
    title:
      'ClinicCare – Healthcare Management System (ASP.NET Web Forms, ADO.NET, AIVEN Cloud)',
    image: '/images/project/cliniccare.png',
    description:
      'Healthcare management system for online appointment booking, patient data handling, and cloud‑based storage. Implemented role‑based access control with optimized backend CRUD operations for Admin, Doctor, and Patient modules.',
    type: 'Web Forms Project',
    date: 'Sept 2025',
    liveLink: '',
    githubLink: '',
    technologies: [
      'ASP.NET Web Forms',
      'ADO.NET',
      'AIVEN Cloud DB',
      'Role‑Based Access',
    ],
  },
  {
    id: 4,
    title:
      'Loan Application System (ASP.NET Web Forms, ADO.NET, RailwayDB)',
    image: '/images/project/loan-system.png',
    description:
      'Loan processing application supporting loan requests, approvals, and repayment tracking. Integrated ADO.NET for database operations with separate dashboards for Admin and User roles.',
    type: 'Web Forms Project',
    date: 'Aug 2025',
    liveLink: '',
    githubLink: '',
    technologies: ['ASP.NET Web Forms', 'ADO.NET', 'RailwayDB'],
  },

  /* =========================
     ORIGINAL PORTFOLIO PROJECTS
     ========================= */
  {
    id: 5,
    title: 'The 3rd Eye',
    image: '/images/project/3rd_eye.jpg',
    description:
      '3rd Eye is a real‑time event detection video surveillance application that monitors video feeds, detects fires, and alerts users instantly.',
    type: 'FullStack (Python Project)',
    date: '05/2024',
    liveLink:
      'https://www.linkedin.com/posts/kiran-adep-018524186_innovation-techforgood-videosurveillance-activity-7202934481773584384-qwSK',
    githubLink: '',
    technologies: ['Python', 'OpenCV', 'Machine Learning', 'Flask'],
  },
  {
    id: 6,
    title: 'ShopEase E‑commerce Website',
    image: '/images/project/Shopease.png',
    description:
      'ShopEase is a Java Spring Boot‑powered e‑commerce platform specializing in clothing and apparel with a modern React front‑end.',
    type: 'FullStack (Java Project)',
    date: '12/2024',
    liveLink:
      'https://www.linkedin.com/posts/kiran-adep-018524186_java-springboot-react-activity-7287482047198076929-c2Gq',
    githubLink: 'https://github.com/kiranadep/Ecommerce-Java.git',
    technologies: ['Java', 'Spring Boot', 'React', 'MySQL'],
  },
  {
    id: 7,
    title: 'Django E‑commerce Website',
    image: '/images/project/ecommerce.png',
    description:
      'Shopping website focused on backend Django and template‑database interaction. Implemented full cart and order flow with Django ORM.',
    type: 'FullStack (Python Project)',
    date: '08/2024',
    liveLink:
      'https://www.linkedin.com/posts/kiran-adep-018524186_django-ecommerce-backenddevelopment-activity-7233103365314904064-GB9-',
    githubLink: 'https://github.com/kiranadep/Ecommerce-Django.git',
    technologies: ['Python', 'Django', 'SQLite', 'Bootstrap'],
  },
  {
    id: 8,
    title: 'Volume Control Using Hand Gestures',
    image: '/images/project/hand tracking.jpg',
    description:
      'Implemented a hands‑free volume control system using OpenCV and MediaPipe for real‑time hand tracking and gesture interpretation.',
    type: 'Backend (Python Project)',
    date: '10/2023',
    liveLink: 'https://github.com/kiranadep/Volume_Control_using_hands.git',
    githubLink: 'https://github.com/kiranadep/Volume_Control_using_hands.git',
    technologies: ['Python', 'OpenCV', 'MediaPipe'],
  },
  {
    id: 9,
    title:
      'Customer Segmentation – Most Searched Product (Data Science)',
    image: '/images/project/customer.jpg',
    description:
      'Customer segmentation project to categorize users based on their product search patterns to improve marketing strategies.',
    type: 'Data Science Project',
    date: '06/2024',
    liveLink:
      'https://github.com/kiranadep/Customer_Segmentation1.git',
    githubLink:
      'https://github.com/kiranadep/Customer_Segmentation1.git',
    technologies: ['Python', 'Pandas', 'Scikit‑learn', 'Matplotlib'],
  },
  {
    id: 10,
    title: 'Customer Segmentation – Annual Income (Mall Dataset)',
    image: '/images/project/mall.png',
    description:
      'Performed clustering on Mall Customer dataset based on annual income and spending score to identify customer groups.',
    type: 'Data Science Project',
    date: '06/2024',
    liveLink:
      'https://github.com/kiranadep/Customer_Segmentation2.git',
    githubLink:
      'https://github.com/kiranadep/Customer_Segmentation2.git',
    technologies: ['Python', 'K‑Means', 'Data Analysis'],
  },
];

const getProjectImg = (img) => {
  if (!img) return '/images/project1.jpg';
  if (img.startsWith('http') || img.startsWith('/images') || img.startsWith('data:')) {
    return img;
  }
  return `http://127.0.0.1:8000${img.startsWith('/') ? '' : '/'}${img}`;
};

const Projects = ({ projects: projectsProp }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const rawProjects = projectsProp && projectsProp.length > 0 ? projectsProp : defaultProjects;

  const projects = rawProjects.map((p) => {
    let techs = [];
    if (Array.isArray(p.technologies)) {
      techs = p.technologies;
    } else if (typeof p.technologies === 'string') {
      try {
        const parsed = JSON.parse(p.technologies);
        techs = Array.isArray(parsed) ? parsed : [String(parsed)];
      } catch (e) {
        techs = p.technologies.split(',').map((t) => t.trim()).filter(Boolean);
      }
    }

    const rawImg = p.image || p.image_url;

    return {
      id: p.id,
      title: p.title,
      image: getProjectImg(rawImg),
      description: p.description,
      type: p.type || p.project_type || 'FullStack Project',
      date: p.date,
      liveLink: p.liveLink || p.live_link || '',
      githubLink: p.githubLink || p.github_link || '',
      technologies: techs,
    };
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="projects-section" id="project">
      <div className="projects-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My <span className="text-gradient">Projects</span>
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Click on any project to learn more
        </motion.p>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id || index}
              className="project-card"
              variants={cardVariants}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-image">
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/project1.jpg';
                  }}
                />
                <div className="project-overlay">
                  <span className="view-details">View Details</span>
                </div>
                <div className="project-index">#{index + 1}</div>
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">
                  {project.description.substring(0, 110)}...
                </p>
                <div className="project-meta">
                  <span className="project-type">{project.type}</span>
                  <span className="project-date">
                    <FaClock /> {project.date}
                  </span>
                </div>
                <div className="project-tech">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="modal-image"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/project1.jpg';
                }}
              />
              <div className="modal-body">
                <h2>{selectedProject.title}</h2>
                <p className="modal-type">{selectedProject.type}</p>
                <p className="modal-description">
                  {selectedProject.description}
                </p>
                <div className="modal-tech">
                  {selectedProject.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="modal-links">
                  {selectedProject.liveLink && (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-btn"
                    >
                      <FaExternalLinkAlt /> View Project
                    </a>
                  )}
                  {selectedProject.githubLink && (
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-btn github"
                    >
                      <FaGithub /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
