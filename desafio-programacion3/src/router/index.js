// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CronogramaView from '../views/CronogramaView.vue' // Importa la nueva vista

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cronograma',
      name: 'cronograma',
      component: CronogramaView // Asigna la ruta al componente
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: () => import('../views/ContactoView.vue') // Lazy loading
    },
    {
      path: '/artistas',
      name: 'artistas',
      component: () => import('../views/ArtistasView.vue') // Lazy loading
    },
    {
      path: '/entradas',
      name: 'entradas',
      component: () => import('../views/EntradasView.vue') // Lazy loading
    },
  ]
})

export default router
