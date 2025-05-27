import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home/Home.vue';
import Login from '@/views/login/Login.vue';
//import Register from '@/views/auth/Register.vue';
import Timeline from '@/components/Timeline.vue';

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
  //{
  //  path: '/register',
  //  name: 'Register',
  //  component: Register,
  //},
  {
    path: '/timeline',
    name: 'Timeline',
    component: Timeline,
    meta: { requiresAuth: true },
  },
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
    next('/home');
  } else {
    next();
  }
});

export default router;
