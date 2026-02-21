const express = require('express');
const authenticateToken = require('../middleware/auth');
const {
  getUserPlaylists,
  createPlaylist,
  getPlaylistSongs,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
} = require('../controllers/playlistController');

const router = express.Router();

router.get('/user/:userId', getUserPlaylists);
router.post('/', authenticateToken, createPlaylist);
router.get('/:playlistId/songs', getPlaylistSongs);
router.post('/songs/add', authenticateToken, addSongToPlaylist);
router.delete('/:playlistId/songs/:songId', authenticateToken, removeSongFromPlaylist);
router.delete('/:playlistId', authenticateToken, deletePlaylist);

module.exports = router;
