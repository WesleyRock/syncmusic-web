import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home/Home.vue';
import Login from '@/views/login/Login.vue';
import Timeline from '@/components/Timeline.vue';
import Profile from '../views/user/Profile.vue';
import Saved from '../views/user/Saved.vue';

const routes = [
   {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },

  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: Timeline,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/saved',
    name: 'Saved',
    component: Saved,
    meta: { requiresAuth: true },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
