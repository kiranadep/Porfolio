# Kiran Ramesh Adep • Full-Stack Portfolio

A modern, responsive full-stack developer portfolio powered by a **React.js** frontend and a **Python / Django REST Framework** backend connected to a serverless **Neon PostgreSQL** database.

🌐 **Live Demo:** [porfolio-blue-two.vercel.app](https://porfolio-blue-two.vercel.app)  
👤 **Portfolio Owner:** [Kiran Ramesh Adep](https://github.com/kiranadep)

---

## 🌟 Key Features

- **Dynamic Django Admin Portal:** Manage Projects, Skills, Experiences, Profile Bio, and Contact inquiries in real-time from `/admin` without changing frontend code.
- **Neon Serverless PostgreSQL:** Cloud database with connection pooling and automated SSL handling.
- **Dynamic Skill Categories:** Add custom categories (such as *AI Tools*, *Languages*, *Backend*) that automatically generate filter tabs on the frontend.
- **Custom Image & SVG Logo Upload:** Support for uploading SVG, PNG, JPG, or WebP icons and project screenshots directly through Django Admin.
- **Responsive React UI:** Built with Framer Motion animations, interactive modals, responsive navigation, and particle backgrounds.
- **Zero-Flicker Icon Mapping:** Immediate fallback icon matching prevents placeholder flashes on initial load.

---

## 🛠️ Tech Stack

### Frontend (`/Porfolio`)
- **React.js** (Create React App)
- **Framer Motion** (Page transitions & UI animations)
- **React Icons & Simple Icons**
- **EmailJS** (Direct contact email delivery)
- **CSS3** (Responsive design, frosted-glass effects)

### Backend (`/backend`)
- **Python 3.10+ & Django 5**
- **Django REST Framework (DRF)**
- **Neon PostgreSQL** (via `psycopg2-binary` & `dj-database-url`)
- **Django CORS Headers**
- **Gunicorn** (Production WSGI)

---

## 🚀 Getting Started Locally

### 1. Backend Setup (Django & PostgreSQL)

```bash
cd backend

# Create & activate virtual environment
python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure .env (copy from .env.example and add your Neon DB URL)
cp .env.example .env

# Run database migrations
python manage.py migrate

# (Optional) Seed initial portfolio data
python manage.py seed_data

# Start backend server
python manage.py runserver
```
Backend API will be live at: `http://127.0.0.1:8000/api/portfolio/`  
Admin portal: `http://127.0.0.1:8000/admin/`

---

### 2. Frontend Setup (React)

```bash
cd Porfolio

# Install dependencies
npm install

# Start development server
npm start
```
Frontend will be live at: `http://localhost:3000`

---

## 📁 Repository Structure

```
.
├── backend/                  # Django REST API backend
│   ├── core/                 # Models, serializers, views, admin
│   ├── portfolio_backend/    # Django project settings & URLs
│   ├── requirements.txt      # Python dependencies
│   ├── seed_data.py          # Database seeder
│   └── .env.example          # Safe environment template
├── Porfolio/                 # React.js frontend application
│   ├── src/
│   │   ├── components/       # Intro, Skills, Projects, Experience, Contact
│   │   ├── services/api.js   # Django backend API client with fallback
│   │   └── data/             # Static fallback portfolio data
│   ├── public/               # Static assets & project preview images
│   └── package.json
└── README.md
```

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

