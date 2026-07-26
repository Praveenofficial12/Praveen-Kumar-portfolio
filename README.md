<div align="center">

  <!-- Header Badges -->
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite_8-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB_Atlas-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Atlas" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/Vercel_Serverless-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />

  <br /><br />

  <h1>✨ Praveen Kumar K — Developer Portfolio & Full-Stack Platform ✨</h1>

  <p>
    <b>A high-performance, full-stack personal portfolio and telemetry engine.</b><br />
    Designed with modern glassmorphism aesthetics, dynamic micro-animations, cloud database persistence, dual-provider email automation, and a real-time admin control panel.
  </p>

  <p>
    <a href="https://praveen-kumar-portfolio-developer.vercel.app/" target="_blank">
      <img src="https://img.shields.io/badge/🌐_Live_Website-Visit_Portfolio-7c3aed?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Website" />
    </a>
    <a href="https://praveen-kumar-portfolio-developer.vercel.app/api/viewer" target="_blank">
      <img src="https://img.shields.io/badge/⚡_Admin_Dashboard-View_Live_Metrics-ec4899?style=for-the-badge&logo=mongodb&logoColor=white" alt="Admin Dashboard" />
    </a>
  </p>

</div>

---

## 📖 Table of Contents

- [✨ Overview](#-overview)
- [🏗 System Architecture](#-system-architecture)
- [🛠 Deep Tech Stack Elaboration](#-deep-tech-stack-elaboration)
- [🚀 Core Features & Innovations](#-core-features--innovations)
- [📁 Project Directory Structure](#-project-directory-structure)
- [⚙️ Local Installation & Development](#-local-installation--development)
- [☁️ Environment Variables & Vercel Deployment](#️-environment-variables--vercel-deployment)
- [📄 License & Contact](#-license--contact)

---

## ✨ Overview

This repository powers **Praveen Kumar K's** official developer portfolio. Beyond a standard showcase website, this project incorporates a **production-ready serverless backend infrastructure** capable of:

- 📬 **Receiving & Persisting Messages**: Seamless contact form capture stored in MongoDB Atlas with client browser IP/device telemetry.
- ⚡ **Dual Email Delivery Engine**: Guaranteed delivery utilizing **Resend API** as the primary handler and **Nodemailer (Gmail SMTP)** as an automatic fallback.
- 📊 **Real-Time Site Analytics**: Tracking total site visits, resume downloads, certification view metrics, and project interactions.
- 🛡 **Embedded Admin Dashboard**: A sleek, web-based management suite (`/api/viewer`) equipped with desktop notification alerts and audio chimes for real-time lead updates.

---

## 🏗 System Architecture

The application uses a **unified single-domain architecture** on Vercel. Vite handles client-side UI rendering while Express handles serverless API routes under `/api/*`.

```mermaid
flowchart TD
    subgraph Client ["💻 Client Browser (React + Vite)"]
        UI["Visual UI / Components"]
        Form["Contact Form"]
        Analytics["Site Telemetry Trigger"]
    end

    subgraph Vercel ["⚡ Vercel Cloud Platform"]
        Rewrites["Single Domain Router (vercel.json)"]
        API["Express Serverless Handler (api/index.js)"]
    end

    subgraph Database ["🍃 Cloud Storage"]
        Atlas[("MongoDB Atlas Cluster")]
    end

    subgraph MailServices ["📧 Email Providers"]
        Resend["Resend API (Primary)"]
        SMTP["Nodemailer Gmail SMTP (Fallback)"]
    end

    subgraph Admin ["⚡ Admin Suite"]
        Viewer["Admin Dashboard (/api/viewer)"]
        Owner["Praveen's Inbox"]
    end

    UI --> Rewrites
    Form -->|POST /api/contact| Rewrites
    Analytics -->|POST /api/analytics| Rewrites
    Rewrites --> API

    API -->|Save Message / Logs| Atlas
    API -->|1. Try Resend| Resend
    Resend -->|Failed? Fallback| SMTP
    Resend -->|Send Alert| Owner
    SMTP -->|Send Alert| Owner

    Atlas -->|Fetch Analytics & Messages| Viewer
    Viewer -->|Manage & Star Messages| API
```

---

## 🛠 Deep Tech Stack Elaboration

### 🎨 1. Frontend Layer
- **React 19 & Vite 8**: Built on the latest React architecture and Vite fast-build server for instant HMR and optimized production bundles (~125 kB gzip).
- **Tailwind CSS & PostCSS**: Custom utility-first styling with curated dark gradients, glassmorphism filters (`backdrop-blur`), neural grid patterns, and responsive breakpoints.
- **Framer Motion**: Delivers smooth scroll-triggered component entrances, card hover depth effects, modal popups, and tab transitions.
- **Lucide Icons & React Icons**: Modern vector icon libraries providing consistent visual iconography across all UI sections.

### ⚡ 2. Backend & Serverless API
- **Node.js & Express.js**: Lightweight RESTful routing engine wrapped inside a Vercel Serverless function (`api/index.js`).
- **Unified Domain Rewrite (`vercel.json`)**: Eliminates CORS complications by proxying all `/api/*` network requests seamlessly through the main web domain.
- **Modular Route Structure**: Clean separation between database schemas (`api/models/`), email services (`api/services/mailer.js`), and database handlers (`api/services/database.js`).

### 🍃 3. Database & Cloud Persistence
- **MongoDB Atlas**: Cloud-hosted NoSQL database storing messages, visitor telemetry, resume downloads, and certificate interactions.
- **Mongoose ODM**: Strongly typed schema modeling with index optimization and automated timestamping (`createdAt`).

### 📧 4. Automated Email Delivery System
- **Resend API**: Lightning-fast transactional email API used as the primary notification provider.
- **Nodemailer (Gmail SMTP)**: High-reliability secondary failover system utilizing 16-character Gmail App Authentication.
- **HTML Email Templates**: Custom dark-themed responsive HTML templates sent to both the portfolio owner (instant alert) and the visitor (confirmation auto-reply).

---

## 🚀 Core Features & Innovations

| Feature | Description |
| :--- | :--- |
| **🎨 Cyber-Dark Aesthetic** | Modern dark UI featuring neon glowing accents, glassmorphic cards, and custom typography. |
| **📁 Interactive Resume & Certs** | Downloadable PDF resume served via `public/resume.pdf` + interactive certificate preview modals. |
| **⚡ Admin Control Panel** | Full-featured control panel at `/api/viewer` to review messages, mark read/unread, star leads, and track analytics. |
| **🔔 Live Audio & Web Alerts** | Sound chimes & browser notifications when a new contact message arrives on the admin dashboard. |
| **🛡 Rate-Limiting & Security** | Sanitized inputs to prevent XSS attacks and input abuse across all contact API endpoints. |
| **📊 Real-Time Telemetry** | Captures browser details, device type, referrer origin, and interaction timestamps. |

---

## 📁 Project Directory Structure

```
Portfolio/
├── api/                   # Serverless Express API & Services
│   ├── models/            # Mongoose Schemas (ContactMessages, PortfolioAnalytics, etc.)
│   ├── routes/            # Modular API Endpoints (contact.js, analytics.js)
│   ├── services/          # Mailer (Resend/Nodemailer) & Database Services
│   └── index.js           # Serverless Express App Entrypoint & Dashboard
├── public/                # Static public assets
│   ├── certificates/      # Certification badges & credential images
│   ├── favicon.svg        # Custom Favicon
│   ├── praveen.jpg        # Profile Photo
│   └── resume.pdf         # Resume PDF for site visitors
├── scripts/               # Helper & utility scripts
│   └── test-email.mjs     # Live email diagnostics script
├── src/                   # React Frontend Application
│   ├── components/        # React UI components (Hero, Navbar, Projects, Skills, etc.)
│   ├── data/              # Portfolio Data Configuration (portfolio.js)
│   ├── App.jsx            # Core Application Shell
│   ├── index.css          # Design Tokens & Custom CSS Utilities
│   └── main.jsx           # React DOM Root Mount
├── .env                   # Local environment variables (git-ignored)
├── .env.example           # Reference template for environment variables
├── .gitignore             # Git ignore configuration
├── index.html             # Entry HTML template
├── package.json           # Project manifest and scripts
├── README.md              # Documentation
├── vercel.json            # Vercel deployment routes config
└── vite.config.js         # Vite build tool configuration
```

---

## ⚙️ Local Installation & Development

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Praveenofficial12/Praveen-Kumar-portfolio.git
cd Praveen-Kumar-portfolio
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# MongoDB Atlas Database Connection
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/portfolio?retryWrites=true&w=majority

# Portfolio Owner Destination Email
OWNER_EMAIL=praveenkumark1204@gmail.com

# Primary Email Provider (Resend API)
RESEND_API_KEY=your_resend_api_key_here

# Fallback Email Provider (Nodemailer / SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=praveenkumark1204@gmail.com
SMTP_PASS=your_gmail_app_password_here

# Local Development Port
PORT=3001
```

### 3. Run Dev Server
Launch both the Vite frontend and the Express backend simultaneously:
```bash
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3001](http://localhost:3001)
- **Admin Dashboard**: [http://localhost:3001/api/viewer](http://localhost:3001/api/viewer)

### 4. Test Email System
Verify email delivery diagnostics via script:
```bash
node scripts/test-email.mjs
```

---

## ☁️ Environment Variables & Vercel Deployment

Deploying on Vercel takes less than two minutes:

1. Push your latest code to GitHub.
2. Import your repository into **Vercel**.
3. Go to **Project Settings → Environment Variables** and enter the following key-value pairs:

| Key Name | Purpose | Example Value |
| :--- | :--- | :--- |
| `MONGODB_URI` | MongoDB Atlas Connection String | `mongodb+srv://...` |
| `OWNER_EMAIL` | Target email for contact alerts | `praveenkumark1204@gmail.com` |
| `RESEND_API_KEY` | Resend API key | `re_...` |
| `SMTP_HOST` | Gmail SMTP Server | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP Port | `587` |
| `SMTP_USER` | Gmail sender address | `praveenkumark1204@gmail.com` |
| `SMTP_PASS` | Gmail App Password | `16_character_app_pass` |

4. Click **Deploy**. Vercel will automatically build the React client and host the serverless Express endpoints!

---

## 📄 License & Contact

Developed with ❤️ by **Praveen Kumar K**

- **Email**: [praveenkumark1204@gmail.com](mailto:praveenkumark1204@gmail.com)
- **GitHub**: [@Praveenofficial12](https://github.com/Praveenofficial12)
- **LinkedIn**: [praveen-kumar-k-developer](https://linkedin.com/in/praveen-kumar-k-developer)
- **Live Portfolio**: [praveen-kumar-portfolio-developer.vercel.app](https://praveen-kumar-portfolio-developer.vercel.app/)

<div align="center">
  <sub>Designed & Engineered for High Performance and Professional Excellence</sub>
</div>
