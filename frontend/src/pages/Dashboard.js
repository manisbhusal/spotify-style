import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { songsAPI, playlistsAPI } from '../services/api';
import SongList from '../components/SongList';
import Player from '../components/Player';
import Sidebar from '../components/Sidebar';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSongs();
    fetchPlaylists();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await songsAPI.getAllSongs(search);
      setSongs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setLoading(false);
    }
  };

  const fetchPlaylists = async () => {
    if (user?.id) {
      try {
        const response = await playlistsAPI.getUserPlaylists(user.id);
        setPlaylists(response.data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleAddToPlaylist = async (playlistId) => {
    try {
      await playlistsAPI.addSongToPlaylist({
        playlistId,
        songId: currentSong.id,
      });
      alert('Song added to playlist');
    } catch (error) {
      alert(error.response?.data?.error || 'Error adding song to playlist');
    }
  };

  return (
    <div className="dashboard">
      <Sidebar playlists={playlists} onPlaylistRefresh={fetchPlaylists} />
      <div className="main-content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search songs..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchSongs()}
          />
          <button onClick={fetchSongs}>Search</button>
        </div>

        {loading ? (
          <p>Loading songs...</p>
        ) : (
          <SongList
            songs={songs}
            onSongClick={setCurrentSong}
            playlists={playlists}
            onAddToPlaylist={handleAddToPlaylist}
          />
        )}

        {currentSong && <Player song={currentSong} />}
      </div>
    </div>
  );
}
