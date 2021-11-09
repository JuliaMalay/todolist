import {createStore} from 'vuex';
import axios from 'axios';
import {auth} from './auth.module';
import TodoService from '../services/todo.service';

function sortFunc(item) {
  return item.sort((a, b) => {
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

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
      });
    },
    async CREATE_LIST({commit}, dataList) {
      const data = {attributes: dataList};
      await TodoService.createList(data).then((response) => {
        commit('SET_LIST', response.data.data.attributes);
        return JSON.stringify(response);
      });
    },
    async DELETE_TASK({commit}, task) {
      await TodoService.deleteTask(task.id).then(() => {
        commit('REMOVE_TASK', task);
      });
    },
    async DELETE_LIST({commit}, id) {
      await TodoService.deleteList(id).then(() => {
        commit('REMOVE_LIST', id);
      });
    },
    CHANGE_TASK({commit}, task) {
      TodoService.changeTask(task).then(() => {
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
      const listsWithId = state.tasks.filter(
        (t) => t.lists_id == task.lists_id
      );
      if (!listsWithId.find((t) => t.is_completed == false)) {
        state.lists.find(
          (list) => list.id == task.lists_id
        ).is_completed = true;
      } else {
        state.lists.find(
          (list) => list.id == task.lists_id
        ).is_completed = false;
      }
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
      state.lists.find((list) => list.id == task.lists_id).count_tasks += 1;
      state.tasks.unshift(task);
    },
    SET_LIST(state, list) {
      state.lists.push(list);
    },
    REMOVE_TASK(state, task) {
      state.lists.find((list) => list.id == task.lists_id).count_tasks -= 1;
      state.tasks = state.tasks.filter((t) => t.id !== task.id);
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
      const tasks = state.tasks.filter((task) => task.lists_id == id);
      return tasks.sort(function (a, b) {
        a = new Date(a.created_at);
        b = new Date(b.created_at);
        return a > b ? -1 : a < b ? 1 : 0;
      });
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
    FILTERED_LISTS: (state) => (option) => {
      switch (option) {
        case '1':
          return sortFunc(
            state.lists.filter((list) => list.is_completed == false)
          );
        case '2':
          return sortFunc(
            state.lists.filter((list) => list.is_completed == true)
          );
        case '3':
          return sortFunc(state.lists);
      }
    },
  },
});

export default store;
