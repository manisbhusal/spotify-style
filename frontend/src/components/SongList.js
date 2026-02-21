import React from 'react';
import '../styles/SongList.css';

export default function SongList({ songs, onSongClick, playlists, onAddToPlaylist }) {
  return (
    <div className="song-list">
      <h2>Available Songs</h2>
      {songs.length === 0 ? (
        <p>No songs found</p>
      ) : (
        <div className="songs-grid">
          {songs.map((song) => (
            <div key={song.id} className="song-card">
              {song.cover_url && <img src={song.cover_url} alt={song.title} />}
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
              {song.album && <p className="album">{song.album}</p>}
              <button onClick={() => onSongClick(song)} className="play-btn">
                Play
              </button>
              {playlists.length > 0 && (
                <div className="playlist-dropdown">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        onAddToPlaylist(parseInt(e.target.value));
                        e.target.value = '';
                      }
                    }}
                  >
                    <option value="">Add to playlist...</option>
                    {playlists.map((playlist) => (
                      <option key={playlist.id} value={playlist.id}>
                        {playlist.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
