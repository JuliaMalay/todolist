<template>
  <form @submit.prevent class="form">
    <div class="formWrapper">
      <input-add
        v-model.trim="task.name"
        type="text"
        name="title"
        placeholder="Введите дело"
      />
      <label class="checkbox" for="important">
        <input type="checkbox" v-model="task.urgency" id="important" />
        Срочное</label
      >
    </div>
    <button-add @click="createTask()">Создать</button-add>
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
    createTask() {
      if (this.task.name) {
        const obj = {
          attributes: {
            name: this.task.name,
            lists_id: this.task.lists_id,
            urgency: this.task.urgency,
            is_completed: this.task.is_completed,
          },
        };
        this.CREATE_TASK(obj);
        this.task.name = '';
        this.task.urgency = false;
        this.task.is_completed = false;
      }
    },
  },
};
</script>

<style>
.form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.formWrapper {
  width: 100%;
  display: flex;
  align-items: center;
}
.checkbox {
  margin-left: 5px;
}
</style>
