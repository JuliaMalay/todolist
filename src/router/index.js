import {createRouter, createWebHashHistory} from 'vue-router';
import Todos from '../components/Todos';
import TaskList from '../components/TaskList';

const routes = [
  {path: '/', component: Todos},
  {path: '/todos/:id', name: 'todos', component: TaskList},
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});
export default router;
