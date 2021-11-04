import {createApp} from 'vue';
import App from './App.vue';
import components from '@/components/UI';
import store from './store';
import router from './router';
// import Vuelidate from 'vuelidate';

// Create a new store instance.

const app = createApp(App);
components.forEach((component) => {
  app.component(component.name, component);
});
app.use(router);
app.use(store);
// app.use(Vuelidate);
app.mount('#app');
