import api from './api';

export const fetchMyProfile = () => {
  return api.get('/me');
};

export const updateProfile = (data: { name: string; email: string; description: string }) => {
  return api.put('/me', data);
};