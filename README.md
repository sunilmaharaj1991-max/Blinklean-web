# ⚡ Blinklean

[![Render Deployment](https://img.shields.io/badge/Deploy%20to-Render-4642d4?style=for-the-badge&logo=render)](https://render.com)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

**Blinklean** is India's First QuickClean Platform — a premium doorstep service for smart home cleaning and responsible scrap recycling. Built for the modern lifestyle, providing professional Clean-Tech care in a blink.

---

## 🚀 Key Features

- **📱 Mobile First Design**: Fully responsive UI/UX optimized for smartphones.
- **♻️ Smart Recycling**: Real-time scrap value estimation and pickup scheduling.
- **🧹 Professional Cleaning**: Doorstep services for homes, kitchens, and vehicles.
- **⚡ Superfast Load Times**: Implemented code-splitting and lazy loading for near-instant page transitions.
- **📫 Real-time Notifications**: Integrated SMS gateway for booking confirmations.
- **🎨 Premium Aesthetics**: Modern glassmorphism UI with smooth animations and dynamic carousels.

---

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, React Router 7 |
| **Backend** | NestJS (Node.js framework), TypeORM |
| **Database** | PostgreSQL |
| **Authentication** | Firebase Auth (Client) + JWT (Backend Proxy) |
| **Styles** | Vanilla CSS3 (Custom Design System) |
| **Icons** | Lucide React |

---

## 🏗️ Project Structure

```text
blinklean-react/
├── src/                # Frontend React application
│   ├── assets/         # Styles, Images, and Global CSS
│   ├── components/     # Reusable UI components
│   └── pages/          # Code-split page views
├── blinklean-backend/  # Backend NestJS API
│   ├── src/            # Controllers, Services, Entities
│   └── .env            # Environment configuration
├── public/             # Static assets (Favicon, Logo)
└── render.yaml         # Deployment configuration for Render
```

---

## 📦 Local Installation

### 1. Prerequisite

- Node.js (v18+)
- PostgreSQL installed and running

### 2. Backend Setup

```bash
cd blinklean-backend
npm install
# Configure your .env (DATABASE_URL, FAST2SMS_API_KEY)
npm run start:dev
```

### 3. Frontend Setup

```bash
# In the root directory
npm install
npm run dev
```

---

## 🌐 Deployment

### Frontend (Vercel)

1. Import the repository into **Vercel**.
2. Set the `Framework Preset` to **Vite**.
3. Add the Environmental Variable:
   - `VITE_API_BASE_URL`: Your Render backend URL (e.g., `https://blinklean-api.onrender.com/api/v1`).

4. Vercel will automatically deploy the frontend.

### Backend (Render)

This project is configured for **Render Blueprint**.

1. Connect your GitHub repository to [Render](https://dashboard.render.com).
2. Render will automatically detect the `render.yaml` file.
3. Click **"Apply"** to deploy:
   - Managed PostgreSQL Database
   - NestJS API (Web Service)

**Required Post-Deployment Step**:
Go to your **blinklean-api** dashboard on Render and set your `FAST2SMS_API_KEY` in the Environment section.

---

## 📄 License

© 2026 Blinklean team. All rights reserved. Registered in India.
