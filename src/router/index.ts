import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import WelcomeView from '../views/WelcomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomeView,
  },
  {
    path: '/room/:id',
    name: 'room',
    component: () => import(/* webpackChunkName */ '../views/RoomView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
