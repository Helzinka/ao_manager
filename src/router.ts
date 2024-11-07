import { createRouter, createWebHistory } from 'vue-router';

import DashboardView from '@/views/DashboardView.vue';
import NotFound from '@/views/NotFoundView.vue';
import CrafView from '@/views/CraftView.vue';
import ParameterView from '@/views/ParameterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: async () => await import('@/views/DashboardView.vue'),
    },
    {
      path: '/price',
      name: 'price',
      component: async () => await import('@/views/PriceView.vue'),
    },
    {
      path: '/craft',
      name: 'craft',
      component: async () => await import('@/views/CraftView.vue'),
    },
    {
      path: '/ressource',
      name: 'ressource',
      component: async () =>
        await import('@/views/ressourceView/RessourceView.vue'),
    },
    {
      path: '/parameter',
      name: 'parameter',
      component: async () => await import('@/views/ParameterView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: async () => await import('@/views/ParameterView.vue'),
    },
  ],
});

router.replace('/parameter');

export default router;
