import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // URL do backend Laravel
  withCredentials: true, // Permite envio dos cookies (necessário pro Sanctum)
});

export default api;