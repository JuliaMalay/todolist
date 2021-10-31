<template>
  <div class="modal" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="modal__content">
      <div class="modal__header">
        <span>{{ modalTitle }}</span>
        <button @click="$emit('close')">X</button>
      </div>
      <div class="modal__body">
        <slot></slot>
      </div>
      <div class="modal__footer">
        <!-- <button
          v-if="countButton"
          class="modal-default-button"
          @click="$emit('close')"
        >
          OK
        </button> -->
        <div class="buttons">
          <button @click="$emit('close')">Отмена</button>
          <button @click="rightBtnAction">{{ rightBtnTitle }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-window',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    modalTitle: {
      type: String,
    },
    rightBtnTitle: {
      type: String,
      default: 'OK',
    },
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false);
    },
    rightBtnAction() {
      this.$emit('rightBtnAction');
    },
  },
};
</script>

<style>
.modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}
.modal__content {
  margin: auto;
  background: white;
  border-radius: 1rem;
  min-height: 3.125rem;
  min-width: 18.75rem;
  padding: 1.25rem;
}
.modal__header,
.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal__body {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal__footer {
}
</style>
