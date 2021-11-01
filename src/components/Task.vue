<template>
  <div class="task">
    <div style="display: flex; align-items: center">
      <checkbox></checkbox>
      <div v-show="task.important" class="important"></div>
      <div>
        <strong>{{ task.title }}</strong>
      </div>
    </div>
    <div style="display: flex; align-items: center">
      <div>{{ task.date }}</div>
      <button @click="deleteTask">X</button>
    </div>
  </div>
  <!-- v-model="task.checked" -->
</template>

<script>
export default {
  name: 'task',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    showModal() {
      this.$store.commit('SET_CURRENT_TASK', this.task);
      this.$store.commit('SHOW_MODAL');
    },
    deleteTask() {
      this.$emit('deleteTask');
    },
  },
};
</script>

<style scoped></style>
