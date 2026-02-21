import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
};

// Songs APIs
export const songsAPI = {
  getAllSongs: (search = '') => API.get(`/songs?search=${search}`),
  getSongById: (id) => API.get(`/songs/${id}`),
  createSong: (data) => API.post('/songs', data),
};

// Playlists APIs
export const playlistsAPI = {
  getUserPlaylists: (userId) => API.get(`/playlists/user/${userId}`),
  createPlaylist: (data) => API.post('/playlists', data),
  getPlaylistSongs: (playlistId) => API.get(`/playlists/${playlistId}/songs`),
  addSongToPlaylist: (data) => API.post('/playlists/songs/add', data),
  removeSongFromPlaylist: (playlistId, songId) =>
    API.delete(`/playlists/${playlistId}/songs/${songId}`),
  deletePlaylist: (playlistId) => API.delete(`/playlists/${playlistId}`),
};

export default API;
