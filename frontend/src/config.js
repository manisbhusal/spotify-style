const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getApiUrl = () => {
  // In production on Vercel, use relative API path
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return '/api';
  }
  return API_URL;
};
