<template>
  <div class="task">
    <h3>{{ title }}</h3>
    <p>{{ date }}</p>
  </div>
</template>

<script>
export default {
  name: 'task',
  props: {
    title: String,
    date: String,
  },
};
</script>

<style scoped></style>
