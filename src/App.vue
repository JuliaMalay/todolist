<template>
  <task-form @create="createTask"></task-form>
  <task-list :tasks="tasks" @remove="removeTask"></task-list>
  <button-add @click="showModal"> Открыть окно </button-add>
  <modal-window
    v-model:show="modalVisible"
    @close="modalVisible = false"
    @rightBtnAction="removeTask"
    rightBtnTitle="Удалить"
    :modalTitle="modalTitle"
    :task="task"
    :countButton="true"
  >
    Мое окно</modal-window
  >
</template>

<script>
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
// import Task from './components/Task.vue';

export default {
  name: 'App',
  components: {TaskList, TaskForm},
  data() {
    return {
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
      modalTitle: 'Имя окна 2',
    };
  },
  methods: {
    createTask(task) {
      // console.log(task);
      this.tasks.push(task);
    },
    removeTask(task) {
      this.modalVisible = true;
      this.modalTitle = task.title;
    },
    removeTaskMain(task) {
      console.log('Дохожу');
      // console.log('task', task);
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    },
    showModal() {
      this.modalVisible = true;
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
