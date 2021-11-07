<template>
  <input class="inputAdd" :value="modelValue" @input="updateInput" />
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

<style>
.inputAdd {
  min-width: 200px;
  border-radius: 25px;
  padding: 15px 30px;
  color: #0f7bff;
  border: 2px solid #0f7bff;
  width: 65%;
}
</style>
