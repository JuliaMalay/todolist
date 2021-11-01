<template>
  <div>
    <task-form></task-form>
    <task-list :tasks="GET_ALL_TASKS" @showModal="showModal"></task-list>
    <button-add @click="showModal"> Открыть окно </button-add>
    <modal-delete
      v-model="$store.GET_MODAL_VISIBLE"
      :task_data="$store.GET_CURRENT_TASK"
    >
      Мое окно</modal-delete
    >
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'App',
  components: {TaskList, TaskForm},
  mounted() {
    this.GET_TASKS_FROM_API();
  },
  computed: {
    ...mapGetters(['GET_ALL_TASKS', 'GET_MODAL_VISIBLE', 'GET_CURRENT_TASK']),
  },
  methods: {
    ...mapActions(['GET_TASKS_FROM_API', 'DELETE_TASK']),
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
