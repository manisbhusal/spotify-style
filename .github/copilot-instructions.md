# Music Streaming Platform - Workspace Instructions

## Project Overview
Full-stack music streaming platform MVP with React frontend, Node.js Express backend, and PostgreSQL database. Features include user authentication, song search, playback, and playlist creation.

## Checklist Status

- [x] Create workspace structure
- [x] Set up Node.js backend
- [x] Set up React frontend
- [x] Configure database schema
- [x] Implement authentication
- [x] Create song/playlist APIs
- [x] Build UI components
- [ ] Test and verify

## Quick Start

### Prerequisites
- Node.js v14+
- PostgreSQL v12+

### Database Setup
```bash
createdb music_streaming
cd backend
npm install
npm run migration
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
# Server runs on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
# App runs on http://localhost:3000
```

## Project Structure
- `/backend` - Node.js/Express API with PostgreSQL
- `/frontend` - React application with routing and state management
- `README.md` - Complete project documentation

## Key Features Implemented
- User registration and login with JWT
- PostgreSQL database with user, songs, and playlists tables
- RESTful API for songs, playlists, and authentication
- React frontend with authentication context
- Music player component with playback controls
- Playlist management (create, add songs, delete)
- Song search functionality
- Spotify-inspired UI design

## API Endpoints
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- GET `/api/songs` - Get all songs (with search)
- POST `/api/playlists` - Create playlist
- GET `/api/playlists/user/:userId` - Get user playlists

See README.md for complete API documentation
