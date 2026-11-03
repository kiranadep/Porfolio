// Centralized data for the portfolio
export const personalInfo = {
  name: 'Kiran Adep',
  title: 'Software Engineer',
  email: 'kiran221202adep@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kiranadep/',
  github: 'https://github.com/kiranadep',
  description: `Software Engineer with 2+ years of experience building scalable backend systems
    and REST APIs using Java, Python, and C#/.NET. Passionate about clean architecture,
    microservices, and AI-powered development.`
};

export const experiences = [
  {
    year: '2018',
    title: 'SSC – School Education',
    company: 'Nethaji SubhasChandra Bose High School, Solapur',
    description: 'Completed my Schooling',
    type: 'education'
  },
  {
    year: '2020',
    title: 'Higher Secondary (Science)',
    company: 'D.B.F. Dayanand College of Arts & Science, Solapur',
    description: 'Completed Higher Secondary Education',
    type: 'education'
  },
  {
    year: 'Jan 2021 – Jul 2024',
    title: 'B.Tech – Computer Science',
    company: 'N.K. Orchid College of Engineering & Technology, Solapur',
    description: 'Graduated with a Bachelor of Technology in Computer Science & Engineering',
    type: 'education'
  },
  {
    year: 'May 2024 – Aug 2024',
    title: 'Data Analyst (Intern)',
    company: 'Zidio Development',
    description: 'Built social-media-driven customer segmentation tools improving targeting by ~15%. Developed voice-based emotion detection and digit recognition modules using CNNs and Tkinter.',
    type: 'work'
  },
  {
    year: 'Aug 2024 – April 2026',
    title: 'Software Engineer',
    company: 'LSL Technologies Pvt. Ltd.',
    description: 'Building scalable backend services and RESTful APIs using Java and Python. Working with Spring Boot, microservices, and relational databases in agile environments.',
    type: 'work'
  },
  {
    year: 'April 2026 – June 2026',
    title: 'Software Engineer',
    company: 'Opethic Softwares',
    description: 'Engineered backend services and integrated APIs with optimized database queries.',
    type: 'work'
  },
  {
    year: 'July 2026 – Present',
    title: 'Software Trainer (Full Stack Trainer)',
    company: 'FortuneCloud Solapur',
    description: 'Training and mentoring aspiring developers in Full-Stack web development, Java, Python, .NET, and database architectures.',
    type: 'work',
    highlight: true
  }
];

export const skills = [
  // Languages
  { name: 'Java', category: 'language', level: 90, icon_key: 'FaJava' },
  { name: 'Python', category: 'language', level: 90, icon_key: 'FaPython' },
  { name: 'C#', category: 'language', level: 85, icon_key: 'SiCsharp' },
  { name: 'SQL', category: 'database', level: 85, icon_key: 'SiMicrosoftsqlserver' },
  { name: 'JavaScript', category: 'language', level: 80, icon_key: 'SiJavascript' },

  // Frameworks
  { name: 'Spring Boot', category: 'framework', level: 85, icon_key: 'SiSpringboot' },
  { name: 'ASP.NET Core', category: 'framework', level: 85, icon_key: 'SiDotnet' },
  { name: 'ASP.NET Web Forms', category: 'framework', level: 80, icon_key: 'SiDotnet' },
  { name: 'Entity Framework Core', category: 'framework', level: 80, icon_key: 'SiDotnet' },
  { name: 'Django', category: 'framework', level: 85, icon_key: 'SiDjango' },
  { name: 'Flask', category: 'framework', level: 75, icon_key: 'SiFlask' },
  { name: 'React Js', category: 'frontend', level: 75, icon_key: 'SiReact' },

  // Frontend
  { name: 'HTML5', category: 'frontend', level: 90, icon_key: 'SiHtml5' },
  { name: 'CSS', category: 'frontend', level: 85, icon_key: 'SiCss3' },

  // Databases
  { name: 'PostgreSQL', category: 'database', level: 80, icon_key: 'SiPostgresql' },
  { name: 'MySQL', category: 'database', level: 85, icon_key: 'SiMysql' },
  { name: 'SQL Server', category: 'database', level: 80, icon_key: 'SiMicrosoftsqlserver' },

  // Backend / Architecture
  { name: 'REST APIs', category: 'other', level: 90, is_emoji: true, emoji: '🧩' },
  { name: 'Microservices', category: 'other', level: 75, is_emoji: true, emoji: '⚙️' },
  { name: 'JWT / OAuth', category: 'other', level: 80, is_emoji: true, emoji: '🔐' },
  { name: 'MVC Architecture', category: 'other', level: 85, is_emoji: true, emoji: '🏛️' },
  { name: 'OOP & DSA', category: 'other', level: 90, is_emoji: true, emoji: '💻' },

  // DevOps / Tools
  { name: 'Docker', category: 'devops', level: 70, icon_key: 'SiDocker' },
  { name: 'Git & GitHub', category: 'devops', level: 85, icon_key: 'SiGithub' },
  { name: 'Postman', category: 'devops', level: 85, icon_key: 'SiPostman' },

  // AI / ML
  { name: 'ML & Deep Learning', category: 'ai', level: 80, is_emoji: true, emoji: '📊' },
  { name: 'OpenCV', category: 'ai', level: 75, icon_key: 'SiOpencv' },
  { name: 'Pandas / NumPy', category: 'ai', level: 80, is_emoji: true, emoji: '🐼' },

  // Agentic AI Tools
  { name: 'GitHub Copilot', category: 'ai', level: 85, is_emoji: true, emoji: '🤖' },
  { name: 'Antigravity', category: 'ai-tools', level: 100, is_emoji: true, emoji: '🪐' },
  { name: 'Cursor', category: 'ai-tools', level: 95, is_emoji: true, emoji: '💎' },
];

export const projects = [
  {
    id: 1,
    title: 'Smart Attendance System',
    image: '/images/project/smart-attendance.png',
    description: 'Production-grade attendance platform with JWT auth, QR-based student onboarding, role-based access control, geo-location and time-based attendance validation, and responsive React + React Native interfaces. Deployed via CI/CD to Render.',
    type: 'FullStack (.NET + React)',
    date: '10/2025',
    liveLink: '',
    githubLink: '',
    technologies: ['ASP.NET Core', 'C#', 'PostgreSQL', 'React', 'JWT', 'Docker']
  },
  {
    id: 2,
    title: 'HR Recruitment Portal',
    image: '/images/project/hr-portal.png',
    description: 'Secure role-based recruitment platform supporting Admin, HR, and Candidate roles with JWT authentication, service-based architecture, and optimized PostgreSQL queries. Deployed and maintained on Render with cloud proxy configuration.',
    type: 'FullStack (.NET)',
    date: '09/2025',
    liveLink: '',
    githubLink: '',
    technologies: ['ASP.NET Core 8', 'C#', 'PostgreSQL', 'JWT', 'Render']
  },
  {
    id: 3,
    title: 'ClinicCare – Healthcare Management System',
    image: '/images/project/cliniccare.png',
    description: 'Healthcare management system for online appointment booking and patient data handling. Role-specific dashboards for Admin, Doctor, and Patient with optimized backend CRUD operations and AIVEN cloud database integration.',
    type: 'FullStack (.NET)',
    date: '08/2025',
    liveLink: '',
    githubLink: '',
    technologies: ['ASP.NET Web Forms', 'ADO.NET', 'SQL Server', 'AIVEN Cloud']
  },
  {
    id: 4,
    title: 'Loan Application System',
    image: '/images/project/loan-system.png',
    description: 'Loan processing application supporting loan requests, approvals, and repayment tracking. Integrated ADO.NET for database operations with separate dashboards for Admin and User roles and audit-friendly transaction handling.',
    type: 'FullStack (.NET)',
    date: '07/2025',
    liveLink: '',
    githubLink: '',
    technologies: ['ASP.NET Web Forms', 'ADO.NET', 'RailwayDB']
  },
  {
    id: 5,
    title: 'The 3rd Eye',
    image: '/images/project/3rd_eye.jpg',
    description: '3rd Eye is a real-time event detection video surveillance application that monitors video feeds, detects fires, and alerts users instantly.',
    type: 'FullStack (Python Project)',
    date: '05/2024',
    liveLink: 'https://www.linkedin.com/posts/kiran-adep-018524186_innovation-techforgood-videosurveillance-activity-7202934481773584384-qwSK',
    githubLink: '',
    technologies: ['Python', 'OpenCV', 'Machine Learning', 'Flask']
  },
  {
    id: 6,
    title: 'ShopEase E-commerce',
    image: '/images/project/Shopease.png',
    description: 'ShopEase is a Java Spring Boot-powered e-commerce platform specializing in trendy clothing and apparel with a modern React front-end and full cart and order management.',
    type: 'FullStack (Java Project)',
    date: '12/2024',
    liveLink: 'https://www.linkedin.com/posts/kiran-adep-018524186_java-springboot-react-activity-7287482047198076929-c2Gq',
    githubLink: 'https://github.com/kiranadep/Ecommerce-Java.git',
    technologies: ['Java', 'Spring Boot', 'React', 'MySQL']
  },
  {
    id: 7,
    title: 'Django E-commerce',
    image: '/images/project/ecommerce.png',
    description: 'Shopping website focused on Backend Django and template-database interaction. Implemented full cart and order flow with Django ORM.',
    type: 'FullStack (Python Project)',
    date: '08/2024',
    liveLink: 'https://www.linkedin.com/posts/kiran-adep-018524186_django-ecommerce-backenddevelopment-activity-7233103365314904064-GB9-',
    githubLink: 'https://github.com/kiranadep/Ecommerce-Django.git',
    technologies: ['Python', 'Django', 'SQLite', 'Bootstrap']
  },
  {
    id: 8,
    title: 'Volume Control Using Hand Gestures',
    image: '/images/project/hand tracking.jpg',
    description: 'Hands-free volume control system using OpenCV and MediaPipe for real-time hand tracking and gesture interpretation.',
    type: 'Backend (Python Project)',
    date: '10/2023',
    githubLink: 'https://github.com/kiranadep/Volume_Control_using_hands.git',
    technologies: ['Python', 'OpenCV', 'MediaPipe']
  },
  {
    id: 9,
    title: 'Customer Segmentation - Product Search',
    image: '/images/project/customer.jpg',
    description: 'Data Science project to categorize customer base into distinct groups based on product search patterns to enhance marketing strategies.',
    type: 'Data Science Project',
    date: '06/2024',
    githubLink: 'https://github.com/kiranadep/Customer_Segmentation1.git',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib']
  },
  {
    id: 10,
    title: 'Customer Segmentation - Annual Income',
    image: '/images/project/mall.png',
    description: 'Customer segmentation analysis using the Mall Customer dataset to identify spending patterns and income-based customer groups using K-Means clustering.',
    type: 'Data Science Project',
    date: '06/2024',
    githubLink: 'https://github.com/kiranadep/Customer_Segmentation2.git',
    technologies: ['Python', 'K-Means', 'Data Analysis']
  }
];