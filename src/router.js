import {createRouter, createWebHashHistory} from 'vue-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Lists from './pages/Lists';
import TaskList from './components/TaskList2';

const routes = [
  {path: '/login', component: Login},
  {path: '/signup', component: Signup},
  {
    path: '/lists',
    component: Lists,
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: 'tasks/:id',
        name: 'tasks',
        component: TaskList,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),

  routes, // short for `routes: routes`
});
export default router;
