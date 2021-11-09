<template>
  <select @change="changeOption" class="form-select">
    <option value="1">Все</option>
    <option value="2">Неисполненные</option>
    <option value="3">Исполненные</option>
  </select>
</template>

<script>
export default {
  props: ['myMethod', 'option'],
  model: {
    prop: 'option',
    event: 'optionchange',
  },
  computed: {
    optionLocal: {
      get: function () {
        return this.option;
      },
      set: function (value) {
        this.$emit('optionchange', value);
      },
    },
  },
  methods: {
    changeOption(e) {
      this.optionLocal = e.target.value;
    },
  },
};
</script>

<style scoped>
.form-select {
  width: 70%;
  height: 60%;
  cursor: pointer;
}
i {
  position: absolute;
  display: none;
  right: 3%;
}
@media screen and (max-width: 700px) {
  i {
    display: block;
  }
}
</style>
