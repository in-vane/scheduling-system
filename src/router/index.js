import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const ROUTER = [
  {
    path: '/',
    name: 'MainLayout',
    redirect: '/initial_scheduling',
    component: () => import('@/layout/MainLayout.vue'),
    children: [
      {
        path: '/initial_scheduling',
        name: 'initial_scheduling',
        component: () => import('@/views/InitialSch.vue'),
      },
      {
        path: '/online_scheduling',
        name: 'online_scheduling',
        component: () => import('@/views/OnlineSch.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: ROUTER,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0, behavior: 'smooth' }),
});

export function setupRouter(app) {
  app.use(router);
}

export default router;
