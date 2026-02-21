# YouTube Music Demo Setup Guide

This music streaming platform includes sample data from popular YouTube Music songs. Follow these steps to get the demo running.

## Quick Setup (5 minutes)

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Create Database

```bash
createdb music_streaming
```

### 3. Initialize Backend

From the `backend` directory:
```bash
npm run migration    # Creates database tables
npm run seed        # Populates with 12 sample songs
npm run dev         # Starts server on port 5000
```

### 4. Start Frontend

In a new terminal, from the `frontend` directory:
```bash
npm start           # Starts app on port 3000
```

## Demo Features

Once running, you can:

1. **Register** - Create a new account with any username/email/password
2. **Search** - Find songs by title or artist (e.g., "Taylor Swift", "The Weeknd")
3. **Play** - Click any song to play it with the built-in player
4. **Create Playlists** - Build custom playlists from the sidebar
5. **Add Songs** - Add songs to your playlists

## Sample Songs Included

The demo database includes these popular tracks:
- **Blinding Lights** - The Weeknd
- **Heat Waves** - Glass Animals
- **As It Was** - Harry Styles
- **Anti-Hero** - Taylor Swift
- **Levitating** - Dua Lipa
- **Flowers** - Miley Cyrus
- **Shape of You** - Ed Sheeran
- **Perfect Duet** - Ed Sheeran, Beyoncé
- **Bad Habit** - Steve Lacy
- **Sunroof** - Nicky Youre
- **Starboy** - The Weeknd
- **Take Me Back to Eden** - Sleep Token

## Troubleshooting

**Port Already in Use?**
- Backend: Change PORT in `.env` file
- Frontend: It will automatically use port 3001 if 3000 is busy

**Database Connection Failed?**
- Ensure PostgreSQL is running
- Check database name in `.env` matches `music_streaming`

**Songs Not Showing?**
- Run `npm run seed` again from backend directory
- Verify database was created with `createdb music_streaming`

## Next Steps

Once you're familiar with the platform, you can:
- Add more sample songs to the seed.js file
- Replace sample audio with real music file URLs
- Integrate with actual YouTube Music API (if available)
- Deploy to production servers
