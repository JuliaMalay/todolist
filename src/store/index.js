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
      });
    },
    async LOGIN({commit}, payload) {
      return await axios({
        url: 'http://lebedev-danil-api.academy.smartworld.team/User/login',
        method: 'POST',
        data: payload,
        headers: {'Content-Type': 'application/json'},
      }).then((response) => {
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
    async CREATE_TASK({commit}, dataTask) {
      await TodoService.createTask(dataTask).then((response) => {
        commit('SET_TASK', response.data.data.attributes);
        console.log(JSON.stringify(response.data.data.attributes));
      });
    },
    async CREATE_LIST({commit}, dataList) {
      const data = {attributes: dataList};
      await TodoService.createList(data)
        .then((response) => {
          console.log(response);

          commit('SET_LIST', response.data.data.attributes);
          return JSON.stringify(response);
        })
        .then((response) => console.log(response));
    },
    CREATE_NEW_TASK({commit}, data) {
      const dataTask = JSON.stringify(data);
      fetch('http://lebedev-danil-api.academy.smartworld.team/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6NzAwNFwvVXNlclwvbG9naW4iLCJpYXQiOjE2MzYyMTgwNjQsImV4cCI6MTYzNjMwNDQ2NCwibmJmIjoxNjM2MjE4MDY0LCJqdGkiOiJQZnhQWjVyemtGT2gxWUNVIiwic3ViIjo5LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.rLz0xOs_5HsbLN9CfSOQ4wfd_oZMM-Qnfk_-2T8wZww',
        },
        body: dataTask,
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          console.log(commit);
        });
    },
    async DELETE_TASK({commit}, id) {
      await TodoService.deleteTask(id).then(() => {
        commit('REMOVE_TASK', id);
      });
    },
    async DELETE_LIST({commit}, id) {
      await TodoService.deleteList(id).then(() => {
        commit('REMOVE_LIST', id);
      });
    },
    CHANGE_TASK({commit}, task) {
      TodoService.changeTask(task).then((response) => {
        console.log(response);

        commit('CHANGE_TODO_ITEM', task);
      });
    },
  },
  mutations: {
    // SET_TASKS_TO_VUEX: (state, tasks) => {
    //   state.tasks = tasks;
    // },
    CHANGE_TODO_ITEM(state, task) {
      state.tasks.find((t) => t.id == task.id).is_completed =
        !task.is_completed;
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
    SET_TASK(state, task) {
      state.tasks.push(task);
    },
    SET_LIST(state, list) {
      state.lists.push(list);
    },
    REMOVE_TASK(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    REMOVE_LIST(state, id) {
      state.lists = state.lists.filter((list) => list.id !== id);
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
      console.log(
        'get name',
        state.lists.find((list) => list.id == id)
      );

      return state.lists.find((list) => list.id == id).name;
    },
  },
});

export default store;
