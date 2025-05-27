import api from './api';

export const toggleSaved = (postId: number) => {
  return api.post(`/posts/${postId}/save`);
};

export const fetchSavedPosts = () => {
  return api.get('/saved');
};