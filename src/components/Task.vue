<template>
  <div class="task">
    <div style="display: flex; align-items: center">
      <checkbox v-model:isChecked="checked"></checkbox>
      <div v-show="task.important" class="important"></div>
      <div>
        <strong>{{ task.title }}</strong>
      </div>
    </div>
    <div style="display: flex; align-items: center">
      <div>{{ task.date }}</div>
      <button @click="showModal">X</button>
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
      this.$emit('showModal', this.task);
      // this.$store.commit('SET_CURRENT_TASK', this.task);
      // this.$store.commit('SHOW_MODAL');
    },
  },
};
</script>

<style scoped></style>
