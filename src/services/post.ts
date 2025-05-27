import api from './api';

export const getPosts = () => {
  return api.get('/posts');
};

export const createPost = (payload: { content: string; music?: string | null }) => {
  return api.post('/posts', payload);
};