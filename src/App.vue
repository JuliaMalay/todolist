<template>
  <modal-register></modal-register>
  <task-form></task-form>
  <task-list :tasks="GET_ALL_TASKS" @showModal="showModal"></task-list>
  <modal-window
    v-model="$store.getters"
    @close="modalVisible = false"
    @rightBtnAction="removeTask"
    rightBtnTitle="Удалить"
    :modalTitle="modalTitle"
    :task="GET_CURRENT_TASK"
    :countButton="true"
  >
    Мое окно</modal-window
  >

  <todos :todos="GET_ALL_LISTS"></todos>
  <router-view></router-view>
</template>

<script>
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import {mapActions, mapGetters} from 'vuex';
import Todos from './components/Todos.vue';
import ModalRegister from './components/UI/modal/ModalRegister.vue';

export default {
  name: 'App',
  components: {TaskList, TaskForm, Todos, ModalRegister},
  mounted() {
    // this.GET_TASKS_FROM_API();
    this.GET_ALL_LISTS_ACT;
  },
  computed: {
    ...mapGetters([
      'GET_ALL_TASKS',
      'GET_MODAL_VISIBLE',
      'GET_CURRENT_TASK',
      'GET_ALL_LISTS',
    ]),
  },
  methods: {
    ...mapActions(['GET_TASKS_FROM_API', 'GET_ALL_LISTS_ACT']),
    // createTask(task) {
    //   this.tasks.push(task);
    // },
    removeTask(task) {
      this.modalVisible = true;
      this.modalTitle = task.title;
    },
    removeTaskMain(task) {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    },
    showModal(task) {
      this.modalVisible = true;
      this.currentTask = task;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
