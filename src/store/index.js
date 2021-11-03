import {createStore} from 'vuex';
// import axios from 'axios';

const store = createStore({
  state: {
    lists: [
      {
        id: 1,
        title: 'Список 1',
        tasks: [
          {
            id: 1,
            title: 'First Task',
            date: '14:10',
            checked: false,
            important: false,
          },
          {
            id: 2,
            title: 'Second Task',
            date: '16:40',
            checked: false,
            important: false,
          },
          {
            id: 3,
            title: 'Third Task',
            date: '21.11.2021, 12:44:57',
            checked: false,
            important: false,
          },
        ],
      },
      {
        id: 1,
        title: 'Список 2',
        tasks: [
          {
            id: 1,
            title: 'Первый',
            date: '14:10',
            checked: false,
            important: false,
          },
          {
            id: 2,
            title: 'Второй',
            date: '16:40',
            checked: false,
            important: false,
          },
          {
            id: 3,
            title: 'Третий',
            date: '21.11.2021, 12:44:57',
            checked: false,
            important: false,
          },
        ],
      },
    ],
    tasks: [
      {
        id: 1,
        title: 'First Task',
        date: '14:10',
        checked: false,
        important: false,
      },
      {
        id: 2,
        title: 'Second Task',
        date: '16:40',
        checked: false,
        important: false,
      },
      {
        id: 3,
        title: 'Third Task',
        date: '21.11.2021, 12:44:57',
        checked: false,
        important: false,
      },
    ],
    modalVisible: false,
    currentTask: {},
  },
  actions: {
    // GET_TASKS_FROM_API({commit}) {
    //   return axios('https://jsonplaceholder.typicode.com/todos?_limit=10', {
    //     method: 'GET',
    //   }).then((response) => {
    //     commit('SET_TASKS_TO_VUEX', response.data);
    //   });
    // },
    GET_ALL_LISTS_ACT({commit}) {
      commit('GET_ALL_LISTS');
    },
    CREATE_TASK({commit}, task) {
      commit('SET_TASK', task);
    },
    DELETE_TASK({commit}, index) {
      commit('REMOVE_TASK', index);
    },
  },
  mutations: {
    // SET_TASKS_TO_VUEX: (state, tasks) => {
    //   state.tasks = tasks;
    // },
    SHOW_MODAL(state) {
      state.modalVisible = true;
    },
    HIDE_MODAL(state) {
      state.modalVisible = false;
    },
    SET_CURRENT_TASK(state, payload) {
      state.currentTask = payload;
    },
    SET_TASK(state, task) {
      state.tasks.push(task);
    },
    REMOVE_TASK(state, index) {
      state.tasks.splice(index, 1);
    },
  },
  getters: {
    GET_ALL_TASKS(state) {
      return state.tasks;
    },
    GET_MODAL_VISIBLE(state) {
      return state.modalVisible;
    },
    GET_CURRENT_TASK(state) {
      return state.currentTask;
    },
    GET_ALL_LISTS(state) {
      return state.lists;
    },
  },
});

export default store;
