import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { playlistsAPI } from '../services/api';
import '../styles/Sidebar.css';

export default function Sidebar({ playlists, onPlaylistRefresh }) {
  const { user, logout } = useAuth();
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDesc, setPlaylistDesc] = useState('');

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    try {
      await playlistsAPI.createPlaylist({
        name: playlistName,
        description: playlistDesc,
      });
      setPlaylistName('');
      setPlaylistDesc('');
      setShowCreatePlaylist(false);
      onPlaylistRefresh();
    } catch (error) {
      alert('Error creating playlist');
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Music Streaming</h2>
        <p>Welcome, {user?.username}</p>
      </div>

      <div className="sidebar-section">
        <h3>Your Playlists</h3>
        {playlists.length === 0 ? (
          <p>No playlists yet</p>
        ) : (
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id}>{playlist.name}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="sidebar-section">
        <button onClick={() => setShowCreatePlaylist(!showCreatePlaylist)}>
          Create Playlist
        </button>
        {showCreatePlaylist && (
          <form onSubmit={handleCreatePlaylist} className="create-playlist-form">
            <input
              type="text"
              placeholder="Playlist name"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              required
            />
            <textarea
              placeholder="Description (optional)"
              value={playlistDesc}
              onChange={(e) => setPlaylistDesc(e.target.value)}
            />
            <button type="submit">Create</button>
            <button
              type="button"
              onClick={() => setShowCreatePlaylist(false)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      <div className="sidebar-footer">
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}
