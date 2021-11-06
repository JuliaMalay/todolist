<template>
  <form @submit.prevent class="form">
    <input-add
      v-model.trim="task.name"
      type="text"
      name="title"
      placeholder="Введите дело"
    />
    <label for="important">
      <input
        type="checkbox"
        v-model="task.urgency"
        id="important"
      />Срочно</label
    >

    <button-add @click="createTask(task)">Создать</button-add>
  </form>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  props: {
    listId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      task: {
        name: '',
        is_completed: false,
        lists_id: parseInt(this.listId),
        urgency: false,
      },
    };
  },
  methods: {
    ...mapActions(['CREATE_TASK']),
    createTask(task) {
      console.log(task);

      if (this.task.name) {
        this.CREATE_TASK(task);
        this.task = {
          name: '',
          is_completed: false,
          list_id: this.listId,
          urgency: false,
        };
      }
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
