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
export default {};
</script>

<style></style>
