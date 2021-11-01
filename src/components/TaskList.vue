<template>
  <div v-if="tasks.length">
    <h3>Список задач</h3>
    <task
      v-for="(task, index) in tasks"
      :key="task.id"
      :task="task"
      @deleteTask="deleteTask(index)"
    ></task>
  </div>
  <h2 v-else>Список задач пуст</h2>
</template>

<script>
import Task from './Task.vue';
import {mapActions} from 'vuex';

export default {
  components: {Task},
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions(['GET_TASKS_FROM_API', 'DELETE_TASK']),
    deleteTask(index) {
     this.DELETE_TASK(index)
    },
  },
};
</script>

<style>
.task {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.important {
  background-color: red;
  border-radius: 50%;
  width: 10px;
  height: 10px;
}
</style>
