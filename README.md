# Music Streaming Platform MVP

A full-stack music streaming application with user authentication, song library, search, playback, and playlist management features.

## Project Structure

```
├── backend/              # Node.js Express API
├── frontend/             # React application
├── api/                  # Vercel serverless functions
├── vercel.json           # Vercel configuration
└── README.md
```

## Features

- **User Authentication**: Register and login securely
- **Song Library**: Browse and search for songs
- **Music Playback**: Play songs with progress tracking
- **Playlist Management**: Create and manage custom playlists
- **Add to Playlist**: Add songs to your favorite playlists

## Tech Stack

**Backend:**
- Node.js with Express
- PostgreSQL database
- JWT authentication
- bcryptjs for password hashing

**Frontend:**
- React with React Router
- Axios for API calls
- Context API for state management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

### Installation

1. **Setup Database**
```bash
createdb music_streaming
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
npm run migration
npm run seed
npm run dev
```

3. **Setup Frontend**
```bash
cd frontend
npm install
npm start
```

The frontend will be available at `http://localhost:3000`
The backend API will be running at `http://localhost:5000`

**Demo Account:** The database is pre-loaded with 12 popular songs from YouTube Music for demo purposes.

## Deployment on Vercel

### Option 1: Separate Deployments (Recommended)

Deploy frontend and backend to different services for best results:

**Frontend on Vercel:**
1. Connect your GitHub repo to Vercel
2. Select the `frontend` folder as root
3. Vercel will auto-build with `npm run build`

**Backend on Railway/Render:**
1. Deploy the `backend` folder to Railway or Render
2. Set environment variables on the platform
3. Update REACT_APP_API_URL in frontend

### Option 2: Monorepo Deployment on Vercel

Deploy both frontend and backend together using `vercel.json`:

1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables in Vercel dashboard:
   - DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
   - JWT_SECRET
   - FRONTEND_URL

See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed instructions.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Songs
- `GET /api/songs` - Get all songs (with optional search parameter)
- `GET /api/songs/:id` - Get song by ID
- `POST /api/songs` - Create a new song

### Playlists
- `GET /api/playlists/user/:userId` - Get user's playlists
- `POST /api/playlists` - Create a new playlist
- `GET /api/playlists/:playlistId/songs` - Get songs in a playlist
- `POST /api/playlists/songs/add` - Add song to playlist
- `DELETE /api/playlists/:playlistId/songs/:songId` - Remove song from playlist
- `DELETE /api/playlists/:playlistId` - Delete a playlist

## Environment Variables

### Backend (.env)
```
PORT=5000
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=music_streaming
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Usage

1. Create an account or login
2. Browse the song library
3. Use the search feature to find specific songs
4. Click "Play" to start playing a song
5. Create playlists and add songs to them
6. Manage your playlists from the sidebar

## Future Enhancements

- Advanced music recommendations
- Social features (follow users, share playlists)
- User profile and listening history
- Audio quality options
- Offline mode
- Analytics and statistics

## License

MIT

## Author

Music Streaming Team
