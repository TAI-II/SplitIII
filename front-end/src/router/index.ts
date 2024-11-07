import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Session from '@/views/Session.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/sessao/:id',
    name: 'Sessão',
    component: Session,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
