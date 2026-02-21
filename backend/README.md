# Backend API

Node.js/Express API server for the music streaming platform.

## Setup

```bash
npm install
cp .env.example .env
```

Create a PostgreSQL database:
```bash
createdb music_streaming
```

Initialize the database:
```bash
npm run migration
```

## Running

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## Project Structure

```
src/
├── index.js              # Server entry point
├── database/
│   ├── connection.js     # Database connection
│   └── migrate.js        # Database schema
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── songs.js         # Song routes
│   └── playlists.js     # Playlist routes
├── controllers/
│   ├── authController.js       # Auth logic
│   ├── songController.js       # Song logic
│   └── playlistController.js   # Playlist logic
├── middleware/
│   └── auth.js          # JWT authentication
└── models/              # Database models (optional)
```

## API Routes

See README.md in the root directory for complete API documentation.

## Environment Variables

- `PORT` - Server port (default: 5000)
- `DB_USER` - PostgreSQL user
- `DB_PASSWORD` - PostgreSQL password
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_NAME` - Database name
- `JWT_SECRET` - JWT secret key
