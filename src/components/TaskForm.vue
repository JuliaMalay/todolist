<template>
  <form @submit.prevent class="form">
    <input-add
      v-model.trim="task.title"
      type="text"
      name="title"
      placeholder="Введите дело"
    />
    <label for="important">
      <input
        type="checkbox"
        v-model="task.important"
        id="important"
      />Срочно</label
    >

    <button-add @click="createTask(task)">Создать</button-add>
  </form>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  data() {
    return {
      task: {
        title: '',
        important: false,
        checked: false,
      },
    };
  },
  methods: {
    ...mapActions(['GET_TASKS_FROM_API', 'DELETE_TASK', 'CREATE_TASK']),
    createTask(task) {
      if (this.task.title) {
        this.task.id = Date.now();
        (this.task.date = new Date().toLocaleString('ru-RU')),
          this.$emit('create', this.task);
        this.task = {
          important: false,
          title: '',
        };
      }
      this.CREATE_TASK(task);
    },
  },
};
</script>

<style>
.form {
  display: flex;
  align-items: center;
}
</style>
