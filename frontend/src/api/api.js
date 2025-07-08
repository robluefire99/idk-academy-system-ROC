import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || '' });
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const login = (email, password) => API.post('/api/login', { email, password });

// Lecturer endpoints
export const getStudents = () => API.get('/api/lecturer/students');
export const getStudentScores = (studentId) => API.get(`/api/lecturer/student/${studentId}/scores`);
export const addScore = (scoreData) => API.post('/api/lecturer/scores', scoreData);
export const updateScore = (scoreId, scoreData) => API.put(`/api/lecturer/scores/${scoreId}`, scoreData);
export const deleteScore = (scoreId) => API.delete(`/api/lecturer/scores/${scoreId}`);
export const sendNotification = (data) => API.post('/api/lecturer/notify', data);

export default API;
