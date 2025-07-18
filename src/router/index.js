import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/generic/HomePage'
import FAQ from '@/generic/FAQ.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: FAQ
    },
  ]
})
export default router
