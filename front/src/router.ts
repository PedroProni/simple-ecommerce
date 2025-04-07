import { createRouter, createWebHashHistory } from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router