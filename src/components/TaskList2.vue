<template>
  <div v-if="GET_TASKS_BY_ID(id).length">
    <h3>{{ GET_NAME(id) }}</h3>
    <task
      :key="task.id"
      v-for="(task, index) in GET_TASKS_BY_ID(id)"
      :task="task"
      @showModal="$emit('showModal', task)"
      @deleteTask="deleteTask(index)"
    ></task>
  </div>
  <h2 v-else>Список задач пуст</h2>
  <task-form :listId="id"></task-form>
</template>

<script>
import Task from './Task.vue';
import {mapActions, mapGetters} from 'vuex';
import TaskForm from './TaskForm.vue';
export default {
  components: {Task, TaskForm},
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    id: {
      type: Number,
    },
  },
  mounted() {
    this.GET_TASKS_FROM_API();
  },
  created() {},
  computed: {
    ...mapGetters(['GET_ALL_TASKS', 'GET_TASKS_BY_ID', 'GET_NAME']),
  },
  methods: {
    ...mapActions(['DELETE_TASK', 'GET_TASKS_FROM_API', 'CREATE_TASK']),
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
