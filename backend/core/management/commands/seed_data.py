from django.core.management.base import BaseCommand
from core.models import Profile, Project, Skill, Experience


class Command(BaseCommand):
    help = "Seeds initial portfolio data from portfolioData.js"

    def handle(self, *args, **options):
        self.stdout.write("Seeding portfolio data...")

        # 1. Profile
        profile, created = Profile.objects.get_or_create(
            id=1,
            defaults={
                "name": "Kiran Ramesh Adep",
                "title": "Software Engineer | Java · Python · .NET",
                "email": "kiran221202adep@gmail.com",
                "github_url": "https://github.com/kiranadep",
                "linkedin_url": "https://www.linkedin.com/in/kiranadep/",
                "bio": (
                    "I'm a Software Engineer with 2+ years of experience building scalable backend systems, "
                    "RESTful APIs, and full-stack applications using Java, Python, and C#/.NET. "
                    "Proficient in Spring Boot, ASP.NET Core, microservices, and relational databases. "
                    "I also work with AI/ML tools and agentic development assistants (Cursor, GitHub Copilot, Claude Code) "
                    "to ship clean, reliable solutions faster."
                ),
                "resume_url": "/assets/KiranAdep_SoftwareEngineer.pdf",
            }
        )
        if created:
            self.stdout.write(self.style.SUCCESS("[OK] Seeded Profile"))
        else:
            self.stdout.write("Profile already exists.")

        # 2. Experiences
        experiences_data = [
            {
                "year": "2018",
                "title": "SSC – School Education",
                "company": "Nethaji SubhasChandra Bose High School, Solapur",
                "description": "Completed my Schooling",
                "experience_type": "education",
                "highlight": False,
                "display_order": 1
            },
            {
                "year": "2020",
                "title": "Higher Secondary (Science)",
                "company": "D.B.F. Dayanand College of Arts & Science, Solapur",
                "description": "Completed Higher Secondary Education",
                "experience_type": "education",
                "highlight": False,
                "display_order": 2
            },
            {
                "year": "Jan 2021 – Jul 2024",
                "title": "B.Tech – Computer Science",
                "company": "N.K. Orchid College of Engineering & Technology, Solapur",
                "description": "Successfully graduated with B.Tech in Computer Science",
                "experience_type": "education",
                "highlight": False,
                "display_order": 3
            },
            {
                "year": "May 2024 – Aug 2024",
                "title": "Data Analyst (Intern)",
                "company": "Zidio Development",
                "description": "Built social-media-driven customer segmentation tools improving targeting by ~15%. Developed voice-based emotion detection and digit recognition modules using CNNs and Tkinter.",
                "experience_type": "work",
                "highlight": False,
                "display_order": 4
            },
            {
                "year": "Aug 2024 – Present",
                "title": "Software Engineer",
                "company": "LSL Technologies Pvt. Ltd.",
                "description": "Building scalable backend services and RESTful APIs using Java and Python. Working with Spring Boot, microservices, and relational databases in agile environments.",
                "experience_type": "work",
                "highlight": True,
                "display_order": 5
            },
            {
                "year": "Present",
                "title": "Open to Opportunities",
                "company": "",
                "description": "Actively seeking full-time Software Developer / Backend Engineer roles where I can build scalable APIs and web applications with clean, maintainable code.",
                "experience_type": "future",
                "highlight": False,
                "display_order": 6
            }
        ]

        for exp in experiences_data:
            Experience.objects.update_or_create(
                year=exp["year"],
                title=exp["title"],
                defaults=exp
            )
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(experiences_data)} Experiences"))

        # 3. Skills
        skills_data = [
            # Languages
            {"name": "Java", "category": "language", "level": 9, "icon_key": "FaJava", "is_emoji": False, "emoji": "", "display_order": 1},
            {"name": "Python", "category": "language", "level": 9, "icon_key": "FaPython", "is_emoji": False, "emoji": "", "display_order": 2},
            {"name": "C#", "category": "language", "level": 8, "icon_key": "SiCsharp", "is_emoji": False, "emoji": "", "display_order": 3},
            {"name": "SQL", "category": "language", "level": 8, "icon_key": "SiMicrosoftsqlserver", "is_emoji": False, "emoji": "", "display_order": 4},
            {"name": "JavaScript", "category": "language", "level": 7, "icon_key": "SiJavascript", "is_emoji": False, "emoji": "", "display_order": 5},

            # Frameworks
            {"name": "Spring Boot", "category": "framework", "level": 9, "icon_key": "SiSpringboot", "is_emoji": False, "emoji": "", "display_order": 6},
            {"name": "ASP.NET Core", "category": "framework", "level": 8, "icon_key": "SiDotnet", "is_emoji": False, "emoji": "", "display_order": 7},
            {"name": "ASP.NET Web Forms", "category": "framework", "level": 8, "icon_key": "SiDotnet", "is_emoji": False, "emoji": "", "display_order": 8},
            {"name": "Django", "category": "framework", "level": 8, "icon_key": "SiDjango", "is_emoji": False, "emoji": "", "display_order": 9},
            {"name": "Flask", "category": "framework", "level": 7, "icon_key": "SiFlask", "is_emoji": False, "emoji": "", "display_order": 10},

            # Backend
            {"name": "RESTful APIs", "category": "backend", "level": 9, "icon_key": "", "is_emoji": True, "emoji": "🧩", "display_order": 11},
            {"name": "Microservices", "category": "backend", "level": 8, "icon_key": "", "is_emoji": True, "emoji": "⚙️", "display_order": 12},
            {"name": "MVC Architecture", "category": "backend", "level": 8, "icon_key": "", "is_emoji": True, "emoji": "🏛️", "display_order": 13},
            {"name": "Middleware & DI", "category": "backend", "level": 8, "icon_key": "", "is_emoji": True, "emoji": "🔗", "display_order": 14},

            # Data Access
            {"name": "Hibernate / JPA", "category": "data", "level": 8, "icon_key": "SiHibernate", "is_emoji": False, "emoji": "", "display_order": 15},
            {"name": "Entity Framework Core", "category": "data", "level": 8, "icon_key": "SiDotnet", "is_emoji": False, "emoji": "", "display_order": 16},
            {"name": "ADO.NET", "category": "data", "level": 8, "icon_key": "SiDotnet", "is_emoji": False, "emoji": "", "display_order": 17},
            {"name": "LINQ", "category": "data", "level": 8, "icon_key": "", "is_emoji": True, "emoji": "🔍", "display_order": 18},

            # Databases
            {"name": "MySQL", "category": "database", "level": 9, "icon_key": "SiMysql", "is_emoji": False, "emoji": "", "display_order": 19},
            {"name": "SQL Server", "category": "database", "level": 8, "icon_key": "SiMicrosoftsqlserver", "is_emoji": False, "emoji": "", "display_order": 20},
            {"name": "PostgreSQL", "category": "database", "level": 8, "icon_key": "SiPostgresql", "is_emoji": False, "emoji": "", "display_order": 21},

            # Security
            {"name": "JWT Authentication", "category": "security", "level": 8, "icon_key": "", "is_emoji": True, "emoji": "🔐", "display_order": 22},
            {"name": "Role‑Based Authorization", "category": "security", "level": 8, "icon_key": "", "is_emoji": True, "emoji": "🧑‍💼", "display_order": 23},

            # Frontend
            {"name": "HTML5", "category": "frontend", "level": 8, "icon_key": "SiHtml5", "is_emoji": False, "emoji": "", "display_order": 24},
            {"name": "CSS", "category": "frontend", "level": 8, "icon_key": "SiCss3", "is_emoji": False, "emoji": "", "display_order": 25},
            {"name": "React (Basic)", "category": "frontend", "level": 7, "icon_key": "SiReact", "is_emoji": False, "emoji": "", "display_order": 26},

            # Tools
            {"name": "Docker", "category": "tools", "level": 7, "icon_key": "SiDocker", "is_emoji": False, "emoji": "", "display_order": 27},
            {"name": "Git & GitHub", "category": "tools", "level": 8, "icon_key": "SiGithub", "is_emoji": False, "emoji": "", "display_order": 28},
            {"name": "Postman", "category": "tools", "level": 8, "icon_key": "SiPostman", "is_emoji": False, "emoji": "", "display_order": 29},
            {"name": "Swagger", "category": "tools", "level": 7, "icon_key": "SiSwagger", "is_emoji": False, "emoji": "", "display_order": 30},

            # AI / CV
            {"name": "Machine Learning", "category": "ai", "level": 8, "icon_key": "", "is_emoji": True, "emoji": "📊", "display_order": 31},
            {"name": "Deep Learning (CNN)", "category": "ai", "level": 7, "icon_key": "", "is_emoji": True, "emoji": "🧠", "display_order": 32},
            {"name": "OpenCV", "category": "ai", "level": 7, "icon_key": "SiOpencv", "is_emoji": False, "emoji": "", "display_order": 33},
            {"name": "Pandas / NumPy", "category": "ai", "level": 8, "icon_key": "", "is_emoji": True, "emoji": "🐼", "display_order": 34},
            {"name": "GitHub Copilot", "category": "ai", "level": 8, "icon_key": "", "is_emoji": True, "emoji": "🤖", "display_order": 35},
        ]

        for skill in skills_data:
            Skill.objects.update_or_create(
                name=skill["name"],
                defaults=skill
            )
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(skills_data)} Skills"))

        # 4. Projects
        projects_data = [
            {
                "id": 1,
                "title": "Smart Attendance System (ASP.NET Core, React.js, React Native, PostgreSQL)",
                "image_url": "/images/project/smart-attendance.png",
                "description": "Full‑stack attendance management system with JWT‑based role authentication, QR‑based student onboarding, and secure access control. Implemented geo‑location and time‑based attendance validation with responsive web and mobile interfaces using React.js and React Native.",
                "project_type": "Full‑stack .NET Project",
                "date": "Oct 2025 – Present",
                "live_link": "",
                "github_link": "",
                "technologies": ["ASP.NET Core", "React.js", "React Native", "PostgreSQL", "JWT Auth"],
                "display_order": 1,
            },
            {
                "id": 2,
                "title": "HR Recruitment Portal (ASP.NET Core 8, PostgreSQL, Render Deployment)",
                "image_url": "/images/project/hr-portal.png",
                "description": "Secure recruitment platform supporting multiple user roles with optimized PostgreSQL queries and role‑based authentication. Deployed and maintained on Render with cloud proxy configuration for reliable production access.",
                "project_type": "Backend‑focused .NET Project",
                "date": "Oct 2025",
                "live_link": "",
                "github_link": "",
                "technologies": ["ASP.NET Core 8", "PostgreSQL", "Render", "Role‑Based Auth"],
                "display_order": 2,
            },
            {
                "id": 3,
                "title": "ClinicCare – Healthcare Management System (ASP.NET Web Forms, ADO.NET, AIVEN Cloud)",
                "image_url": "/images/project/cliniccare.png",
                "description": "Healthcare management system for online appointment booking, patient data handling, and cloud‑based storage. Implemented role‑based access control with optimized backend CRUD operations for Admin, Doctor, and Patient modules.",
                "project_type": "Web Forms Project",
                "date": "Sept 2025",
                "live_link": "",
                "github_link": "",
                "technologies": ["ASP.NET Web Forms", "ADO.NET", "AIVEN Cloud DB", "Role‑Based Access"],
                "display_order": 3,
            },
            {
                "id": 4,
                "title": "Loan Application System (ASP.NET Web Forms, ADO.NET, RailwayDB)",
                "image_url": "/images/project/loan-system.png",
                "description": "Loan processing application supporting loan requests, approvals, and repayment tracking. Integrated ADO.NET for database operations with separate dashboards for Admin and User roles.",
                "project_type": "Web Forms Project",
                "date": "Aug 2025",
                "live_link": "",
                "github_link": "",
                "technologies": ["ASP.NET Web Forms", "ADO.NET", "RailwayDB"],
                "display_order": 4,
            },
            {
                "id": 5,
                "title": "The 3rd Eye",
                "image_url": "/images/project/3rd_eye.jpg",
                "description": "3rd Eye is a real‑time event detection video surveillance application that monitors video feeds, detects fires, and alerts users instantly.",
                "project_type": "FullStack (Python Project)",
                "date": "05/2024",
                "live_link": "https://www.linkedin.com/posts/kiran-adep-018524186_innovation-techforgood-videosurveillance-activity-7202934481773584384-qwSK",
                "github_link": "",
                "technologies": ["Python", "OpenCV", "Machine Learning", "Flask"],
                "display_order": 5,
            },
            {
                "id": 6,
                "title": "ShopEase E‑commerce Website",
                "image_url": "/images/project/Shopease.png",
                "description": "ShopEase is a Java Spring Boot‑powered e‑commerce platform specializing in clothing and apparel with a modern React front‑end.",
                "project_type": "FullStack (Java Project)",
                "date": "12/2024",
                "live_link": "https://www.linkedin.com/posts/kiran-adep-018524186_java-springboot-react-activity-7287482047198076929-c2Gq",
                "github_link": "https://github.com/kiranadep/Ecommerce-Java.git",
                "technologies": ["Java", "Spring Boot", "React", "MySQL"],
                "display_order": 6,
            },
            {
                "id": 7,
                "title": "Django E‑commerce Website",
                "image_url": "/images/project/ecommerce.png",
                "description": "Shopping website focused on backend Django and template‑database interaction. Implemented full cart and order flow with Django ORM.",
                "project_type": "FullStack (Python Project)",
                "date": "08/2024",
                "live_link": "https://www.linkedin.com/posts/kiran-adep-018524186_django-ecommerce-backenddevelopment-activity-7233103365314904064-GB9-",
                "github_link": "https://github.com/kiranadep/Ecommerce-Django.git",
                "technologies": ["Python", "Django", "SQLite", "Bootstrap"],
                "display_order": 7,
            },
            {
                "id": 8,
                "title": "Volume Control Using Hand Gestures",
                "image_url": "/images/project/hand tracking.jpg",
                "description": "Implemented a hands‑free volume control system using OpenCV and MediaPipe for real‑time hand tracking and gesture interpretation.",
                "project_type": "Backend (Python Project)",
                "date": "10/2023",
                "live_link": "https://github.com/kiranadep/Volume_Control_using_hands.git",
                "github_link": "https://github.com/kiranadep/Volume_Control_using_hands.git",
                "technologies": ["Python", "OpenCV", "MediaPipe"],
                "display_order": 8,
            },
            {
                "id": 9,
                "title": "Customer Segmentation – Most Searched Product (Data Science)",
                "image_url": "/images/project/customer.jpg",
                "description": "Customer segmentation project to categorize users based on their product search patterns to improve marketing strategies.",
                "project_type": "Data Science Project",
                "date": "06/2024",
                "live_link": "https://github.com/kiranadep/Customer_Segmentation1.git",
                "github_link": "https://github.com/kiranadep/Customer_Segmentation1.git",
                "technologies": ["Python", "Pandas", "Scikit‑learn", "Matplotlib"],
                "display_order": 9,
            },
            {
                "id": 10,
                "title": "Customer Segmentation – Annual Income (Mall Dataset)",
                "image_url": "/images/project/mall.png",
                "description": "Performed clustering on Mall Customer dataset based on annual income and spending score to identify customer groups.",
                "project_type": "Data Science Project",
                "date": "06/2024",
                "live_link": "https://github.com/kiranadep/Customer_Segmentation2.git",
                "github_link": "https://github.com/kiranadep/Customer_Segmentation2.git",
                "technologies": ["Python", "K‑Means", "Data Analysis"],
                "display_order": 10,
            },
        ]

        for proj in projects_data:
            Project.objects.update_or_create(
                id=proj["id"],
                defaults=proj
            )
        self.stdout.write(self.style.SUCCESS(f"[OK] Seeded {len(projects_data)} Projects"))

        # Reset PostgreSQL sequences if using Postgres
        from django.core.management import call_command
        from django.db import connection
        from io import StringIO
        try:
            output = StringIO()
            call_command('sqlsequencereset', 'core', stdout=output)
            sql = output.getvalue()
            if sql.strip():
                with connection.cursor() as cursor:
                    cursor.execute(sql)
                self.stdout.write(self.style.SUCCESS("[OK] Synchronized PostgreSQL ID sequences"))
        except Exception:
            pass

        self.stdout.write(self.style.SUCCESS("All data successfully seeded!"))
