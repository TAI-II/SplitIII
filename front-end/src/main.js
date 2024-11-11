import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router'; // Importa o roteador
import './style.css';
import '@mdi/font/css/materialdesignicons.min.css';
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router); // Usa o Vue Router na aplicação
app.mount('#app');
