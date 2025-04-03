import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Login from './components/Login.vue'
import HelloWorld from './components/HelloWorld.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld
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