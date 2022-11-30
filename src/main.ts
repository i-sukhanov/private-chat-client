import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import router from './router';
import './scss/main.scss';

const app = createApp(App);

app.directive('observe', (el: HTMLElement, binding) => {
  const options = {
    rootMargin: '100px',
    threshold: 0.25,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        binding.value();
      }
    }, options);
  });

  observer.observe(el);
});

export const pinia = createPinia();

app.use(router).use(Antd).use(pinia).mount('#app');
