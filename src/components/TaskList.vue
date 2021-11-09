<template>
  <div>
    <h2 class="list-title">{{ GET_NAME(id) }}</h2>
    <div v-if="taskList.length">
      <task
        :key="task.id"
        v-for="task in taskList"
        :task="task"
        @showModal="$emit('showModal', task)"
      ></task>
    </div>
    <h3 v-else>Список задач пуст</h3>
  </div>
  <task-form :listId="id"></task-form>
</template>

<script>
import Task from './Task.vue';
import {mapActions, mapGetters} from 'vuex';
import TaskForm from './TaskForm.vue';
export default {
  components: {Task, TaskForm},
  props: {
    id: {
      type: Number,
    },
  },
  mounted() {
    this.GET_TASKS_FROM_API();
  },
  created() {},
  computed: {
    ...mapGetters(['GET_TASKS_BY_ID', 'GET_NAME']),
    taskList() {
      return this.GET_TASKS_BY_ID(this.id);
    },
  },
  methods: {
    ...mapActions(['GET_TASKS_FROM_API']),
  },
};
</script>

<style>
.list-title {
  padding-bottom: 10px;
}
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
  margin-right: 5px;
}
</style>
