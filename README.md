# Task Management System (TMS) for EMAAR
#### by Abdellatif Amireh [https://www.linkedin.com/in/abdellatifamireh/]

## Preview Online
- Frontend: https://tms-emaar.vercel.app/
- Backend: https://tms-emaar.online/tasks

## Project Description

**Task Management System** where users can:
- View a list of tasks
- Add a new task
- Mark a task as completed
- Delete a task

### The project consists of:

- **Backend:** Node.js + Express + MongoDB (Mongoose) + TypeScript + Zod
- **Frontend:** React + Vite + TypeScript + TailwindCSS

---

## 🚀 Features

- VPS server hosting for backend in this **paid** domain https://tms-emaar.online/tasks with ssl
- Setup Caddy as Reverse Proxy server in vps
- Clean MCR file structure Backend
- Clean Feature-Based file structure Frontend
- Full CRUD operations for tasks
- **Filtering** (All, Completed, Pending)
- **Sorting** (Newest First, Oldest First)
- Validation on backend using **Zod**
- Dark / Light mode based on device
- Responsive design with Tailwind
- CORS configuration for secure API access in remote server VPS
- Deploy in Vercel https://tms-emaar.vercel.app/
- Run it throw Docker ready image

---

## 🛠 Requirements

- Node.js 18+
- npm
- MongoDB (local or via Docker)
- (Optional) Docker & Docker Compose (for production deployment)

---

## 📂 Project Structure

```
backend/
    src/
        config/
        db/
        models/
        middlewares/
        controllers/
        routes/
        app.ts
        server.ts
package.json
Dockerfile
tsconfig.json
.env
frontend/
    src/
        app/
        features/tasks/
        shared/
        main.tsx
    package.json
    vite.config.ts
    tailwind.config.ts
    tailwind.config.js
    .env
Caddyfile
docker-compose.yml
README.md
.env
```
---

## Install and Setup

### [Note]: Make sure First install and run mongodb in default port 27017

### 1. Clone code from Github

```bash
git clone https://github.com/AbdellatifAmireh/tms-emaar.git
cd tms-emaar
```

### 2. Add .env files send them in email

    - /backend/.env
    - /frontend/.env
    - /.env (for Docker)

### 3. Install dependencies

- Backend

```bash
cd backend
npm install
npm run dev
```

http://localhost:4000/tasks

> 
> 
- Frontend

```bash
cd ../frontend
npm install
npm run dev
```

http://localhost:5173/

### 4. Build and run in production

```bash
npm run build
npm start
```

### (Optional) Docker Setup

### Make sure install docker and docker-compose

https://docs.docker.com/desktop/setup/install/mac-install/
and from root in project run these command
this will install MongoDB image and Caddy server with Backend image

```bash
docker compose up --build -d
```
