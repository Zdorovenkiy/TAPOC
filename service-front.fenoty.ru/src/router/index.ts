import { createRouter, createWebHistory } from 'vue-router'
import GeneralView from '../views/GeneralView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Главная',
      component: GeneralView
    },
    {
      path: '/arena',
      name: 'Арена',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ArenaView.vue')
    },
    {
      path: '/tasks',
      name: 'Задания',
      component: () => import('../views/TasksView.vue')
    },
    {
      path: '/friends',
      name: 'Друзья',
      component: () => import('../views/FriendsView.vue')
    },
    {
      path: '/select-team',
      name: 'Выбор команды',
      component: () => import('../views/SelectTeamView.vue')
    }
  ]
})

export default router
