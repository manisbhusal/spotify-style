import React, { useState, useRef, useEffect } from 'react';
import '../styles/Player.css';

export default function Player({ song }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = song.file_url || '';
    }
  }, [song]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="player">
      <div className="player-info">
        {song.cover_url && <img src={song.cover_url} alt={song.title} />}
        <div className="info">
          <h3>{song.title}</h3>
          <p>{song.artist}</p>
        </div>
      </div>

      <div className="player-controls">
        <button onClick={handlePlayPause} className="play-btn">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <div className="progress-bar">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={song.duration || 100}
            value={currentTime}
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.currentTime = e.target.value;
              }
            }}
          />
          <span>{formatTime(song.duration)}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}
