import api from './api';

export const fetchComments = (postId: number) => {
  return api.get(`/posts/${postId}/comments`);
};

export const createComment = (postId: number, content: string) => {
  return api.post(`/posts/${postId}/comments`, { content });
};

export const deleteComment = (commentId: number) => {
  return api.delete(`/comments/${commentId}`);
};