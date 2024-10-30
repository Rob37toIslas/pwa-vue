import './assets/main.css'

import { createApp } from 'vue'
import App from './screens/App.vue'
import './registerServiceWorker'
import router from './controllers/roouter'
import './registerServiceWorker'

// Registrar el Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registrado con éxito:', registration);
        })
        .catch((error) => {
          console.log('Error al registrar el Service Worker:', error);
        });
    });
  }
const app = createApp(App);
app.use(router);
app.mount('#app');

