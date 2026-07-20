# 🚀 Praveen Kumar K · Modern Developer & Designer Portfolio

Welcome to my premium developer portfolio! This project is a next-generation, high-performance web application designed to showcase my engineering background and modern graphic design capabilities. It features an interactive react interface coupled with a production-ready Express backend database to catch and store contact form submissions.

---

## ✨ Features & Architecture Highlights

### 🎨 Frontend Showcase
- **High-Fidelity Visual Design**: Interactive layouts styled with Tailwind CSS, including dark visual theme matching modern styling trends.
- **Micro-Animations & Transitions**: Leverages `Framer Motion` for smooth component animations, scrolls, and dynamic page transits.
- **Dual Gallery**: Interactive view showcasing both **Development Codebases** and **Graphic Design Portfolios**.

### ⚡ Backend Serverless Architecture
- **Unified Express Backend**: Built as a Vercel Serverless Function under `api/index.js` which performs routing, database, and admin viewer rendering.
- **Single Domain Routing**: Configured via `vercel.json` rewrites. In production, frontend assets and backend endpoints route under the same origin domain, avoiding CORS limits and simplifying configurations.

### 🍃 Cloud Database Persistence (MongoDB)
- **MongoDB Atlas Integration**: Stores form submissions securely inside an online MongoDB Atlas cluster database using `mongoose` ODM.
- **State Persistence**: Both local dev runs and deployed Vercel functions write to the same cluster database, ensuring a single, secure source of truth for contact information.

---

## 🛠️ Technology Stack

| Ecosystem | Technology / Library |
| :--- | :--- |
| **Frontend** | React 19, Vite 8, Tailwind CSS, React Router DOM, Framer Motion, Lucide Icons, React Icons |
| **Backend** | Node.js, Express, CORS |
| **Database** | MongoDB Atlas, Mongoose |
| **Deployment** | Vercel Serverless Functions |

---

## 📂 Project Structure

```bash
Portfolio/
├── api/
│   ├── index.js      # Express Entry Point (Serverless Handler)
│   └── db.js         # Mongoose Database Connector & Model
├── src/
│   ├── components/   # Modular React Components (Hero, Gallery, Contact, etc.)
│   ├── data/         # Mock data & copy information
│   └── main.jsx      # React Mount Entry Point
├── public/           # Static designs and assets
├── vercel.json       # Routing & Rewrites Configuration for Vercel
├── vite.config.js    # Configure dev proxy for unified URL routes
└── package.json      # Node scripts & dependencies
```

---

## 💻 Local Setup & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Express Backend Server
Boot the API server locally. It will run on [http://localhost:3001](http://localhost:3001):
```bash
npm run server
```

### 3. Run the Frontend Dev Environment
Boot the Vite dev server on [http://localhost:5173](http://localhost:5173):
```bash
npm run dev
```
*Note: Vite is configured with a proxy, meaning any frontend API call (e.g. `/api/contact`) is automatically routed to the Express instance during local development.*

### 4. Admin Database Viewer
Navigate to [http://localhost:3001/api/viewer](http://localhost:3001/api/viewer) to manage database logs, read submissions, or delete entries.

---

## ☁️ Deployment on Vercel

This repository is optimized for quick, one-click deployments on Vercel.

1. **Push Changes to GitHub**: Commit and push changes to your repository branch.
2. **Connect to Vercel**: Import the repository in Vercel.
3. **Configure Environment Variables**:
   In the Vercel project Settings dashboard under **Environment Variables**, add:
   - **`MONGODB_URI`**: Your MongoDB connection string.
4. **Deploy**: Completed! The website and API endpoints will be live under a single unified domain URL.
5. **View Submissions**: Access the online dashboard database by visiting:
   ```txt
   https://<your-vercel-domain>.vercel.app/api/viewer
   ```


