import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import router from './router';

export const pinia = createPinia();

createApp(App).use(router).use(Antd).use(pinia).mount('#app');
