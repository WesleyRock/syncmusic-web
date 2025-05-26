import type { RouteRecordRaw } from 'vue-router';
import Home from '../views/home/Home.vue';
import LoginView from '@/views/LoginView.vue';

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component:  Home},
  { path: '/login', name: 'Login', component: LoginView },
];
