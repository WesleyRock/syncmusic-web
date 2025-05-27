import api from './api';

export const likePost = (postId: number) => {
  return api.post(`/posts/${postId}/like`);
};

export const unlikePost = (postId: number) => {
  return api.delete(`/posts/${postId}/like`);
};