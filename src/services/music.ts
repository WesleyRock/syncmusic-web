import api from './api';

export const fetchMusics = () => {
  return api.get('/musics');
};