import api from './api';

export const fetchMyProfile = () => {
  return api.get('/me');
};