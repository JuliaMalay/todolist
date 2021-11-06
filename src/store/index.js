import {createStore} from 'vuex';
import axios from 'axios';
import {auth} from './auth.module';
import TodoService from '../services/todo.service';

const store = createStore({
  modules: {
    auth,
  },
  state: {
    lists: [],
    tasks: [],
    user: [],
    modalVisible: false,
    currentTask: {},
    token: '',
    errors: [],
  },
  actions: {
    // GET_LISTS_FROM_API({commit}) {
    //   return axios('http://lebedev-danil-api.academy.smartworld.team/Lists', {
    //     method: 'GET',
    //     headers: {
    //       Authorization: `Bearer ${
    //         JSON.parse(localStorage.getItem('user')).access_token
    //       }`,
    //     },
    //   }).then((response) => {
    //     console.log(response);

    //     commit('SET_LISTS_TO_VUEX', response.data.data);
    //   });
    // },
    GET_LISTS_FROM_API({commit}) {
      TodoService.getLists().then(
        (response) => {
          commit('SET_LISTS_TO_VUEX', response.data.data.items);
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    GET_TASKS_FROM_API({commit}) {
      TodoService.getTasks().then(
        (response) => {
          commit('SET_TASKS_TO_VUEX', response.data.data.items);
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    async SIGNUP(payload) {
      return await axios({
        url: 'http://lebedev-danil-api.academy.smartworld.team/User/register',
        method: 'POST',
        data: payload,
        headers: {'Content-Type': 'application/json'},
      }).then((response) => {
        console.log(response);
      });
    },
    async LOGIN({commit}, payload) {
      return await axios({
        url: 'http://lebedev-danil-api.academy.smartworld.team/User/login',
        method: 'POST',
        data: payload,
        headers: {'Content-Type': 'application/json'},
      }).then((response) => {
        console.log(response);
        if (response.data.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data.data));
        }
        commit('SET_TOKEN', response.data.data.access_token);
      });
    },
    LOGOUT() {
      localStorage.removeItem('user');
    },
    GET_ALL_LISTS_ACT({commit}) {
      commit('GET_ALL_LISTS');
    },
    CREATE_TASK({commit}, dataTask) {
      console.log(dataTask);
      const data = {attributes: dataTask};
      TodoService.createTask(data).then((response) => {
        commit('SET_TASK', response.data.data);
      });
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
    SET_USER(state, data) {
      state.user = data;
    },
    SET_TOKEN(state, data) {
      state.token = data;
    },
    SET_LISTS_TO_VUEX(state, data) {
      state.lists = data;
    },
    SET_TASKS_TO_VUEX(state, data) {
      state.tasks = data;
    },
  },
  getters: {
    GET_ALL_TASKS(state) {
      return state.tasks;
    },
    GET_TASKS_BY_ID: (state) => (id) => {
      return state.tasks.filter((task) => task.lists_id == id);
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
    GET_USER(state) {
      return state.user;
    },
    GET_TOKEN(state) {
      return state.token;
    },
    GET_NAME: (state) => (id) => {
      return state.lists.find((list) => list.id == id).name;
    },
  },
});

export default store;
