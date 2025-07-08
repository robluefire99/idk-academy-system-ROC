import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || '' });
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const login = (email, password) => API.post('/auth/login', { email, password });

// Lecturer endpoints
export const getStudents = () => API.get('/lecturer/students');
export const getStudentScores = (studentId) => API.get(`/lecturer/student/${studentId}/scores`);
export const addScore = (scoreData) => API.post('/lecturer/scores', scoreData);
export const updateScore = (scoreId, scoreData) => API.put(`/lecturer/scores/${scoreId}`, scoreData);
export const deleteScore = (scoreId) => API.delete(`/lecturer/scores/${scoreId}`);
export const sendNotification = (data) => API.post('/lecturer/notify', data);

export default API;
