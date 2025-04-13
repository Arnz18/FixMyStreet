// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const submitReport = (data) => API.post('/reports', data);
export const fetchReports = () => API.get('/reports');
