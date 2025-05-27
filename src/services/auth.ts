import api from './api';

export const login = (email: string, password: string) => {
  return api.post('/login', { email, password });
};

export const register = (name: string, email: string, password: string) => {
  return api.post('/register', { name, email, password });
};

export const getUser = () => {
  return api.get('/user');
};

export const logout = () => {
  return api.post('/logout');
};

export const getMyProfile = () => {
  return api.get('/me');
};