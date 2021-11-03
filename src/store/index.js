import {createStore} from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    tasks: [],
    modalVisible: false,
    currentTask: {},
  },
  actions: {
    GET_TASKS_FROM_API({commit}) {
      return axios('https://jsonplaceholder.typicode.com/todos?_limit=10', {
        method: 'GET',
      }).then((response) => {
        commit('SET_TASKS_TO_VUEX', response.data);
      });
    },
  },
  mutations: {
    SET_TASKS_TO_VUEX: (state, tasks) => {
      state.tasks = tasks;
    },
    SHOW_MODAL(state) {
      state.modalVisible = true;
    },
    HIDE_MODAL(state) {
      state.modalVisible = false;
    },
    SET_CURRENT_TASK(state, payload) {
      state.currentTask = payload;
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
  },
});

export default store;
