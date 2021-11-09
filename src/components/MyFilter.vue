<template>
  <div id="v-model-select" class="demo">
    <select
      class="select"
      v-model="selected"
      @change="this.$emit('changeOpt', selected)"
    >
      <option value="1">Неисполненные</option>
      <option value="2">Исполненные</option>
      <option value="3">Все</option>
    </select>
  </div>
</template>

<script>
export default {
  props: ['option'],
  data() {
    return {
      selected: '',
    };
  },
  created() {
    this.selected = this.option;
  },
};
</script>

<style>
.select {
  background-color: transparent;
}
</style>
