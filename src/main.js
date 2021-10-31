import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Styles
import "../node_modules/tailwindcss/tailwind.css"
import "./assets/style.css"

createApp(App).use(store).use(router).mount('#app')
