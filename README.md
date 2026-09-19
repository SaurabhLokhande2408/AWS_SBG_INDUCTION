# AWS SBG RMDSSOE - Fullstack Induction Portal

A modern, high-performance web platform for the AWS Student Builder Group at RMD Sinhgad School of Engineering, Pune.

## Architecture

This project is organized into a modular fullstack structure:

```
AWS_SBG_INDUCTION/
├── backend/            # Express.js REST API server
│   ├── server.js       # Main server file with API endpoints
│   ├── .env            # Environment configuration
│   └── package.json    # Backend dependencies
├── frontend/           # React + Vite + Tailwind CSS landing page
│   ├── src/            # React components and styling
│   ├── vite.config.js  # Vite configuration with /api proxy to backend
│   └── package.json    # Frontend dependencies
├── package.json        # Root scripts to run both simultaneously
└── README.md           # Documentation
```

## Quick Start

### 1. Install All Dependencies
From the project root:
```bash
npm run install:all
```
*(Or install individually inside `frontend/` and `backend/`)*

### 2. Run Both Frontend & Backend Simultaneously
```bash
npm run dev
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 3. Individual Scripts
- **Start Backend only**: `npm run dev:backend`
- **Start Frontend only**: `npm run dev:frontend`
- **Build Frontend for Production**: `npm run build`
- **Start Backend in Production mode**: `npm run start:backend`

## API Endpoints
- `GET /api/health` - API server status & uptime
- `GET /api/info` - AWS SBG club & induction details
- `POST /api/register` - Student induction application submission
