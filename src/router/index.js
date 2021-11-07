import {createRouter, createWebHashHistory} from 'vue-router';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import MainPage from '../pages/MainPage';
import TaskList from '../components/TaskList';

const routes = [
  {path: '/login', component: Login},
  {path: '/signup', component: Signup},
  {
    path: '/',
    component: MainPage,
    children: [
      {
        path: 'tasks/:id',
        name: 'tasks',
        component: TaskList,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
