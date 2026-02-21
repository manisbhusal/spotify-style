const express = require('express');
const { getAllSongs, getSongById, createSong } = require('../controllers/songController');

const router = express.Router();

router.get('/', getAllSongs);
router.get('/:id', getSongById);
router.post('/', createSong);

module.exports = router;
