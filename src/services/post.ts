import api from './api';

export const getPosts = () => {
  return api.get('/posts');
};

export const createPost = (payload: { content: string; music?: string | null }) => {
  return api.post('/posts', payload);
};

export const updatePost = (id: number, payload: { content: string }) => {
  return api.put(`/posts/${id}`, payload)
}

export const deletePost = (postId: number) => {
  return api.delete(`/posts/${postId}`);
};