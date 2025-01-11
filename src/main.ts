import { createApp } from 'vue';
import './styles/index.css';
import './styles/global.css';
import 'element-plus/dist/index.css';
import '@fortawesome/fontawesome-free/css/all.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
