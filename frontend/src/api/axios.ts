// src/api/axios.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:7071/api', // Replace with your Azure Function URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
