<template>
  <div class="modal" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="modal__content">
      <div class="modal__header">
        <h2>{{ modalTitle }}</h2>
        <button class="modal_button-close" @click="$emit('close')">X</button>
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
        <div class="buttons" :class="{alone: !twoButtons}">
          <button
            class="modal_button"
            v-if="twoButtons"
            @click="$emit('close')"
          >
            Отмена
          </button>
          <button class="modal_button" @click="rightBtnAction">
            {{ rightBtnTitle }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    twoButtons: {
      type: Boolean,
      default: false,
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
.modal__header {
  margin-bottom: 20px;
}
.modal_button {
  background: transparent;
  border: 1px solid blue;
  padding: 5px 10px;
}
.modal_button-close {
  background: transparent;
  width: 20px;
  height: 20px;
  font-size: 20px;
  padding-left: 10px;
}
.alone {
  justify-content: center;
}
.modal__body {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal__footer {
}
</style>
