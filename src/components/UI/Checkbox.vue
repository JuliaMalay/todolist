<template>
  <input type="checkbox" :checked="isChecked" @change="updateCheckbox" />
</template>

<script>
export default {
  name: 'checkbox',
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    updateCheckbox(event) {
      this.$emit('update:isChecked', event.target.checked);
    },
  },
};
</script>

<style></style>
