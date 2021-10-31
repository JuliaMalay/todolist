<template>
  <input :value="modelValue" @input="updateInput" />
</template>

<script>
export default {
  name: 'input-add',
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>

<style></style>
