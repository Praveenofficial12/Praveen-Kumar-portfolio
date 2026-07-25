<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express" />
</div>

<h1 align="center">✨ Praveen Kumar K · Premium Developer Portfolio ✨</h1>

<p align="center">
  A next-generation, high-performance web application showcasing my engineering background and modern UI/UX capabilities. Built with React, Vite, Framer Motion, and a production-grade Express backend.
</p>

<div align="center">
  
  [![Live Demo](https://img.shields.io/badge/Live_Website-Deployed_on_Vercel-black?style=for-the-badge&logo=vercel)](https://praveen-kumar-portfolio-developer.vercel.app/)

</div>

---

## 🚀 Live Deployment
👉 **Experience the live portfolio here:** [**praveen-kumar-portfolio-developer.vercel.app**](https://praveen-kumar-portfolio-developer.vercel.app/)

---

## 🌟 Features & Architecture Highlights

### 🎨 Frontend Showcase
- **High-Fidelity Visual Design**: Interactive layouts styled with Tailwind CSS, including a dark visual theme matching modern styling trends. Overlapping glassmorphism techniques and neural mesh backgrounds.
- **Micro-Animations & Transitions**: Leverages `Framer Motion` for smooth component animations, scrolls, and dynamic page transversals.
- **Interactive UI**: Hover effects, dynamic glowing borders, and particle animations make the portfolio feel premium and alive.

### ⚡ Backend Serverless Architecture
- **Unified Express Backend**: Built as a Vercel Serverless Function which handles routing, database connections, secure email notifications, and an admin dashboard.
- **Single Domain Routing**: Configured via `vercel.json` rewrites. Frontend assets and backend endpoints route under the same origin domain, avoiding CORS limits.

### 🍃 Cloud Database Persistence (MongoDB)
- **MongoDB Atlas Integration**: Stores form submissions securely inside an online MongoDB Atlas cluster using the `mongoose` ODM.
- **Admin Dashboard UI**: An interactive, customized dashboard to track site analytics, view messages, and mark requests. Accessible via `/api/viewer`.

### 📧 Automated Email Notifications
- **Resend + Nodemailer**: Integrated SMTP solutions to instantly alert the site owner upon contact form submissions while sending professional auto-replies to visitors.

---

## 🛠️ Technology Stack

| Ecosystem | Technology / Library |
| :--- | :--- |
| **Frontend** | React 19, Vite 8, Tailwind CSS, React Router DOM, Framer Motion, Lucide Icons, React Icons |
| **Backend** | Node.js, Express, Nodemailer, Resend |
| **Database** | MongoDB Atlas, Mongoose |
| **Deployment** | Vercel Serverless Functions |

---

## 💻 Local Setup & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_cluster_string
PORT=3001
OWNER_EMAIL=your_email@gmail.com
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_app_password
RESEND_API_KEY=your_resend_api_key
```

### 3. Run the Express Backend Server
Boot the API server locally. It will run on [http://localhost:3001](http://localhost:3001):
```bash
npm run server
```

### 4. Run the Frontend Dev Environment
Boot the Vite dev server on [http://localhost:5173](http://localhost:5173):
```bash
npm run dev
```
*Note: Vite is configured with a proxy, meaning any frontend API call (e.g., `/api/contact`) is automatically routed to the Express instance during local development.*

### 5. Admin Database Viewer
Navigate to [http://localhost:3001/api/viewer](http://localhost:3001/api/viewer) to manage database logs, read submissions, or delete entries.

---

## ☁️ Deployment on Vercel

This repository is optimized for quick, one-click deployments on Vercel.

1. **Push Changes to GitHub**: Commit and push changes to your repository branch.
2. **Connect to Vercel**: Import the repository in Vercel.
3. **Configure Environment Variables**:
   In the Vercel project Settings dashboard under **Environment Variables**, add the ones defined in the `.env` section above.
4. **Deploy**: Completed! The website and API endpoints will be live under a single unified domain URL.
5. **View Submissions**: Access the online dashboard database by visiting `https://<your-vercel-domain>.vercel.app/api/viewer`.

<p align="center">
  <i>Custom Built for Production Setup and High-Fidelity Performance</i>
</p>
