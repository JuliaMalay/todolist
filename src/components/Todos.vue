<template>
  <div v-for="todo in todos" :key="todo.id">
    <div @click="router.push({name: 'todos', params: {id: todo.id}})">
      {{ todo.title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
