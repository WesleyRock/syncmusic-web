import api from './api';
import type { UserType } from './../types/UserType';
import type { LoginType } from '../types/LoginType';

export async function login(payload: LoginType): Promise<void> {
  try {
    await api.get('/sanctum/csrf-cookie');

    await api.post('/api/login', payload);
  } catch (error: any) {
    throw error.response?.data || error;
  }
}

export async function getUser(): Promise<UserType> {
  try {
    const response = await api.get<UserType>('/api/user');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post('/api/logout');
  } catch (error: any) {
    throw error.response?.data || error;
  }
}