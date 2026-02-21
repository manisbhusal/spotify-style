const pool = require('../database/connection');

// Get user playlists
const getUserPlaylists = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      'SELECT * FROM playlists WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create playlist
const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      'INSERT INTO playlists (user_id, name, description) VALUES ($1, $2, $3) RETURNING *',
      [userId, name, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get playlist songs
const getPlaylistSongs = async (req, res) => {
  try {
    const { playlistId } = req.params;

    const result = await pool.query(
      `SELECT s.* FROM songs s
       JOIN playlist_songs ps ON s.id = ps.song_id
       WHERE ps.playlist_id = $1
       ORDER BY ps.added_at DESC`,
      [playlistId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add song to playlist
const addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;

    // Check if song already in playlist
    const check = await pool.query(
      'SELECT * FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2',
      [playlistId, songId]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({ error: 'Song already in playlist' });
    }

    const result = await pool.query(
      'INSERT INTO playlist_songs (playlist_id, song_id) VALUES ($1, $2) RETURNING *',
      [playlistId, songId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove song from playlist
const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;

    await pool.query(
      'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2',
      [playlistId, songId]
    );

    res.json({ message: 'Song removed from playlist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete playlist
const deletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;

    await pool.query('DELETE FROM playlists WHERE id = $1', [playlistId]);

    res.json({ message: 'Playlist deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserPlaylists,
  createPlaylist,
  getPlaylistSongs,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
};
