<template>
  <button class="button"><slot></slot></button>
</template>

<script>
export default {
  name: 'button-add',
};
</script>

<style>
.button {
  border-radius: 1rem;
}
</style>
