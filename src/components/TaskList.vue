<template>
  <div v-if="tasks.length">
    <h3>Список задач</h3>
    <task
      :key="task.id"
      v-for="(task, index) in tasks"
      :task="task"
      @showModal="$emit('showModal', task)"
      @deleteTask="deleteTask(index)"
    ></task>
  </div>
  <h2 v-else>Список задач пуст</h2>
</template>

<script>
import {mapActions} from 'vuex';
import Task from './Task.vue';
export default {
  components: {Task},
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions(['DELETE_TASK']),
    deleteTask(index) {
      this.DELETE_TASK(index);
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
