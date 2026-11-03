import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiCsharp,
  SiDotnet,
  SiMicrosoftsqlserver,
  SiPostgresql,
  SiMysql,
  SiReact,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiGithub,
  SiPostman,
  SiSwagger,
  SiOpencv,
  SiDjango,
  SiFlask,
  SiDocker,
  SiSpringboot,
  SiHibernate,
} from 'react-icons/si';
import { FaPython, FaJava } from 'react-icons/fa';
import './Skills.css';

const iconMap = {
  FaJava: <FaJava />,
  FaPython: <FaPython />,
  SiCsharp: <SiCsharp />,
  SiMicrosoftsqlserver: <SiMicrosoftsqlserver />,
  SiJavascript: <SiJavascript />,
  SiSpringboot: <SiSpringboot />,
  SiDotnet: <SiDotnet />,
  SiDjango: <SiDjango />,
  SiFlask: <SiFlask />,
  SiHibernate: <SiHibernate />,
  SiMysql: <SiMysql />,
  SiPostgresql: <SiPostgresql />,
  SiHtml5: <SiHtml5 />,
  SiCss3: <SiCss3 />,
  SiReact: <SiReact />,
  SiDocker: <SiDocker />,
  SiGithub: <SiGithub />,
  SiPostman: <SiPostman />,
  SiSwagger: <SiSwagger />,
  SiOpencv: <SiOpencv />,
};

// Name-based icon map ensures no skill ever displays ⚡ on initial render!
const skillNameToIcon = {
  java: <FaJava />,
  python: <FaPython />,
  'c#': <SiCsharp />,
  sql: <SiMicrosoftsqlserver />,
  javascript: <SiJavascript />,
  'spring boot': <SiSpringboot />,
  'asp.net core': <SiDotnet />,
  'asp.net web forms': <SiDotnet />,
  'entity framework core': <SiDotnet />,
  'ado.net': <SiDotnet />,
  django: <SiDjango />,
  flask: <SiFlask />,
  react: <SiReact />,
  'react (basic)': <SiReact />,
  'react js': <SiReact />,
  html5: <SiHtml5 />,
  css: <SiCss3 />,
  postgresql: <SiPostgresql />,
  mysql: <SiMysql />,
  'sql server': <SiMicrosoftsqlserver />,
  docker: <SiDocker />,
  'git & github': <SiGithub />,
  postman: <SiPostman />,
  swagger: <SiSwagger />,
  opencv: <SiOpencv />,
  'hibernate / jpa': <SiHibernate />,
  'restful apis': <span className="emoji-icon">🧩</span>,
  'rest apis': <span className="emoji-icon">🧩</span>,
  microservices: <span className="emoji-icon">⚙️</span>,
  'mvc architecture': <span className="emoji-icon">🏛️</span>,
  'middleware & di': <span className="emoji-icon">🔗</span>,
  linq: <span className="emoji-icon">🔍</span>,
  'jwt authentication': <span className="emoji-icon">🔐</span>,
  'jwt / oauth': <span className="emoji-icon">🔐</span>,
  'role-based authorization': <span className="emoji-icon">🧑‍💼</span>,
  'role‑based authorization': <span className="emoji-icon">🧑‍💼</span>,
  'machine learning': <span className="emoji-icon">📊</span>,
  'ml & deep learning': <span className="emoji-icon">📊</span>,
  'deep learning (cnn)': <span className="emoji-icon">🧠</span>,
  'pandas / numpy': <span className="emoji-icon">🐼</span>,
  'github copilot': <span className="emoji-icon">🤖</span>,
  'oop & dsa': <span className="emoji-icon">💻</span>,
  antigravity: (
    <span
      className="emoji-icon"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #7928CA, #FF0080)',
        color: '#fff',
        fontSize: '11px',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
      }}
    >
      AG
    </span>
  ),
  cursor: (
    <span
      className="emoji-icon"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #10b981, #06b6d4)',
        color: '#fff',
        fontSize: '14px',
      }}
    >
      💎
    </span>
  ),
};

const defaultSkills = [
  /* LANGUAGES */
  { name: 'Java', icon: <FaJava />, category: 'language', level: 9 },
  { name: 'Python', icon: <FaPython />, category: 'language', level: 9 },
  { name: 'C#', icon: <SiCsharp />, category: 'language', level: 8 },
  { name: 'SQL', icon: <SiMicrosoftsqlserver />, category: 'language', level: 8 },
  { name: 'JavaScript', icon: <SiJavascript />, category: 'language', level: 7 },

  /* FRAMEWORKS / PLATFORMS */
  { name: 'Spring Boot', icon: <SiSpringboot />, category: 'framework', level: 9 },
  { name: 'ASP.NET Core', icon: <SiDotnet />, category: 'framework', level: 8 },
  { name: 'ASP.NET Web Forms', icon: <SiDotnet />, category: 'framework', level: 8 },
  { name: 'Django', icon: <SiDjango />, category: 'framework', level: 8 },
  { name: 'Flask', icon: <SiFlask />, category: 'framework', level: 7 },

  /* BACKEND / ARCHITECTURE */
  { name: 'RESTful APIs', icon: '🧩', category: 'backend', level: 9, isEmoji: true },
  { name: 'Microservices', icon: '⚙️', category: 'backend', level: 8, isEmoji: true },
  { name: 'MVC Architecture', icon: '🏛️', category: 'backend', level: 8, isEmoji: true },
  { name: 'Middleware & DI', icon: '🔗', category: 'backend', level: 8, isEmoji: true },

  /* ORM / DATA ACCESS */
  { name: 'Hibernate / JPA', icon: <SiHibernate />, category: 'data', level: 8 },
  { name: 'Entity Framework Core', icon: <SiDotnet />, category: 'data', level: 8 },
  { name: 'ADO.NET', icon: <SiDotnet />, category: 'data', level: 8 },
  { name: 'LINQ', icon: '🔍', category: 'data', level: 8, isEmoji: true },

  /* DATABASES */
  { name: 'MySQL', icon: <SiMysql />, category: 'database', level: 9 },
  { name: 'SQL Server', icon: <SiMicrosoftsqlserver />, category: 'database', level: 8 },
  { name: 'PostgreSQL', icon: <SiPostgresql />, category: 'database', level: 8 },

  /* AUTH / SECURITY */
  { name: 'JWT Authentication', icon: '🔐', category: 'security', level: 8, isEmoji: true },
  { name: 'Role‑Based Authorization', icon: '🧑‍💼', category: 'security', level: 8, isEmoji: true },

  /* FRONTEND */
  { name: 'HTML5', icon: <SiHtml5 />, category: 'frontend', level: 8 },
  { name: 'CSS', icon: <SiCss3 />, category: 'frontend', level: 8 },
  { name: 'React (Basic)', icon: <SiReact />, category: 'frontend', level: 7 },

  /* TOOLS / DEVOPS */
  { name: 'Docker', icon: <SiDocker />, category: 'tools', level: 7 },
  { name: 'Git & GitHub', icon: <SiGithub />, category: 'tools', level: 8 },
  { name: 'Postman', icon: <SiPostman />, category: 'tools', level: 8 },
  { name: 'Swagger', icon: <SiSwagger />, category: 'tools', level: 7 },

  /* AI / CV */
  { name: 'Machine Learning', icon: '📊', category: 'ai', level: 8, isEmoji: true },
  { name: 'Deep Learning (CNN)', icon: '🧠', category: 'ai', level: 7, isEmoji: true },
  { name: 'OpenCV', icon: <SiOpencv />, category: 'ai', level: 7 },
  { name: 'Pandas / NumPy', icon: '🐼', category: 'ai', level: 8, isEmoji: true },
  { name: 'GitHub Copilot', icon: '🤖', category: 'ai', level: 8, isEmoji: true },
];

const defaultCategories = [
  { id: 'all', label: 'All' },
  { id: 'language', label: 'Languages' },
  { id: 'framework', label: 'Frameworks' },
  { id: 'backend', label: 'Backend' },
  { id: 'data', label: 'Data Access' },
  { id: 'database', label: 'Databases' },
  { id: 'security', label: 'Security' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'tools', label: 'Tools' },
  { id: 'ai', label: 'AI / CV' },
  { id: 'ai-tools', label: 'AI Tools' },
  { id: 'other', label: 'Other' },
];

const Skills = ({ skills: skillsProp, categoriesProp }) => {
  const [filter, setFilter] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const activeSkills = skillsProp && skillsProp.length > 0 ? skillsProp : defaultSkills;

  // Build dynamic category buttons from backend and active skills
  const categories = categoriesProp && categoriesProp.length > 0
    ? [
        { id: 'all', label: 'All' },
        ...categoriesProp.map((c) => ({ id: c.slug, label: c.name })),
      ]
    : defaultCategories;

  // Ensure any category assigned to a skill is represented in the filter bar
  const existingIds = new Set(categories.map((c) => c.id));
  activeSkills.forEach((s) => {
    if (s.category && !existingIds.has(s.category)) {
      const label = s.category
        .split(/[-_]/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      categories.push({ id: s.category, label });
      existingIds.add(s.category);
    }
  });

  const filteredSkills =
    filter === 'all'
      ? activeSkills
      : activeSkills.filter((skill) => skill.category === filter);

  const renderIcon = (skill) => {
    // 1. Custom uploaded SVG/image or icon URL
    const customImg = skill.icon_image_url || skill.icon_image || skill.icon_url;
    if (customImg) {
      const srcUrl =
        customImg.startsWith('http') || customImg.startsWith('/images') || customImg.startsWith('data:')
          ? customImg
          : `http://127.0.0.1:8000${customImg.startsWith('/') ? '' : '/'}${customImg}`;

      return (
        <img
          src={srcUrl}
          alt={skill.name}
          className="skill-custom-img"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.style.display = 'none';
          }}
        />
      );
    }

    // 2. Predefined React Icons or Emojis (existing skills remain unchanged)
    if (skill.is_emoji || skill.isEmoji) {
      return <span className="emoji-icon">{skill.emoji || skill.icon}</span>;
    }
    if (skill.icon) return skill.icon;
    if (skill.icon_key && iconMap[skill.icon_key]) return iconMap[skill.icon_key];

    // 3. Fallback by name lookup so NO skill ever shows ⚡ initially!
    const key = (skill.name || '').toLowerCase().trim();
    if (skillNameToIcon[key]) {
      return skillNameToIcon[key];
    }

    return <span className="emoji-icon">⚡</span>;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: { duration: 0.25 },
    },
  };

  return (
    <div className="skills-section" id="skill">
      <div className="skills-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Technical <span className="text-gradient">Skills</span>
        </motion.h2>

        <motion.div
          className="filter-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
              onClick={() => setFilter(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {filteredSkills.map((skill, index) => {
              const skillLevel = skill.level > 10 ? Math.round(skill.level / 10) : skill.level;
              return (
                <motion.div
                  key={skill.name}
                  className={`skill-card ${hoveredSkill === index ? 'hovered' : ''}`}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  onHoverStart={() => setHoveredSkill(index)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  whileHover={{
                    y: -10,
                    boxShadow: '0 20px 40px rgba(202, 62, 167, 0.3)',
                  }}
                >
                  <div className="skill-icon">
                    {renderIcon(skill)}
                  </div>
                  <h3 className="skill-name">{skill.name}</h3>
                  <div className="skill-level">
                    <div className="level-bar">
                      <motion.div
                        className="level-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${skillLevel * 10}%` }}
                        transition={{ duration: 1, delay: 0.4 }}
                      />
                    </div>
                    <span className="level-text">{skillLevel} / 10</span>
                  </div>
                  <div className="skill-glow"></div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
