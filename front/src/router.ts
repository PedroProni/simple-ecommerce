import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router