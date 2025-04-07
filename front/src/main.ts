import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import { createPinia } from 'pinia'
import './assets/styles/style.css'

const pinia = createPinia()

const toastOptions: ToastContainerOptions = {
  position: 'top-right',
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: true,
}

createApp(App).use(Vue3Toastify, toastOptions).use(pinia).use(router).mount('#app')
