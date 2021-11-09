<template>
  <button class="main-button"><slot></slot></button>
</template>

<script>
export default {
  name: 'button-add',
  directives: {
    focus: {
      mounted(el) {
        el.focus();
      },
    },
  },
};
</script>

<style>
.main-button {
  background-color: #fff;
  border-radius: 25px;
  padding: 15px 15px;
  color: #0f7bff;
  font-weight: 700;
  border: 2px solid #0f7bff;
  min-height: 50px;
  text-align: center;
  line-height: 125%;
  transition: all 0.3s ease 0s;
  cursor: pointer;
}
.main-button:hover {
  background: #0f7bff;
  color: #fff;
}
</style>
