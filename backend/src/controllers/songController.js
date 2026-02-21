const pool = require('../database/connection');

// Get all songs
const getAllSongs = async (req, res) => {
  try {
    const { search } = req.query;
    let query = 'SELECT * FROM songs';
    let values = [];

    if (search) {
      query += ' WHERE title ILIKE $1 OR artist ILIKE $1';
      values.push(`%${search}%`);
    }

    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get song by ID
const getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM songs WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Song not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create song (admin only)
const createSong = async (req, res) => {
  try {
    const { title, artist, album, duration, file_url, cover_url } = req.body;

    const result = await pool.query(
      'INSERT INTO songs (title, artist, album, duration, file_url, cover_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, artist, album, duration, file_url, cover_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllSongs, getSongById, createSong };
