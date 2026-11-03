import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Navbar from './components/Navbar/Navbar';
import Intro from './components/Intro/Intro';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import { getPortfolioData } from './services/api';
import { personalInfo, experiences, skills, projects } from './data/portfolioData';
import './App.css';

const tabs = ['intro', 'experience', 'skill', 'project', 'contact'];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('intro');
  const [portfolioData, setPortfolioData] = useState({
    profile: personalInfo,
    experiences: experiences,
    skills: skills,
    projects: projects,
  });

  // use numbers here; we add "px" later
  const [clickPosition, setClickPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch live portfolio data from Django backend
  useEffect(() => {
    let isMounted = true;
    getPortfolioData().then((data) => {
      if (isMounted && data && data.isLive) {
        setPortfolioData(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Scroll to top whenever the active tab changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [activeTab]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleTabChange = useCallback(
    (tab, event) => {
      if (tab !== activeTab && !isAnimating) {
        setIsAnimating(true);

        if (event) {
          setClickPosition({
            x: event.clientX,
            y: event.clientY,
          });
        }

        setActiveTab(tab);

        // reset animation flag after transition ends
        setTimeout(() => setIsAnimating(false), 1000);
      }
    },
    [activeTab, isAnimating]
  );

  const renderTab = () => {
    switch (activeTab) {
      case 'intro':
        return <Intro onTabChange={handleTabChange} profile={portfolioData.profile} />;
      case 'experience':
        return <Experience experiences={portfolioData.experiences} />;
      case 'skill':
        return <Skills skills={portfolioData.skills} categoriesProp={portfolioData.categories} />;
      case 'project':
        return <Projects projects={portfolioData.projects} />;
      case 'contact':
        return <Contact onTabChange={handleTabChange} />;
      default:
        return <Intro onTabChange={handleTabChange} profile={portfolioData.profile} />;
    }
  };

  const pageVariants = {
    initial: {
      clipPath: `circle(0% at ${clickPosition.x}px ${clickPosition.y}px)`,
    },
    animate: {
      clipPath: `circle(150% at ${clickPosition.x}px ${clickPosition.y}px)`,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      clipPath: `circle(0% at ${clickPosition.x}px ${clickPosition.y}px)`,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="app">
      <ParticleBackground />
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} tabs={tabs} />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="tab-container"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {renderTab()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
