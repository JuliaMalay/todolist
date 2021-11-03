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

    <button-add @click="createTask">Создать</button-add>
  </form>
</template>

<script>
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
    createTask() {
      if (this.task.title) {
        this.task.id = Date.now();
        (this.task.date = new Date().toLocaleString('ru-RU')),
          this.$emit('create', this.task);
        this.task = {
          important: false,
          title: '',
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
