# Frontend Application

React-based frontend for the music streaming platform.

## Setup

```bash
npm install
```

## Running

Development:
```bash
npm start
```

Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── pages/
│   ├── Home.js          # Landing page
│   ├── Login.js         # Login page
│   ├── Register.js      # Registration page
│   └── Dashboard.js     # Main dashboard
├── components/
│   ├── SongList.js      # Song list display
│   ├── Player.js        # Music player
│   └── Sidebar.js       # Navigation sidebar
├── context/
│   └── AuthContext.js   # Authentication context
├── services/
│   └── api.js          # API client
├── styles/             # CSS stylesheets
├── App.js              # Main app component
└── index.js            # React entry point
```

## Features

- User authentication (register/login)
- Song search and browsing
- Music player with progress tracking
- Playlist creation and management
- Responsive design with Spotify-inspired UI

## Environment

The app communicates with the backend API at `http://localhost:5000`.

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests
