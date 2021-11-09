<template>
  <form @submit.prevent class="form">
    <input-add
      v-model.trim="list.name"
      type="text"
      name="title"
      placeholder="Введите название списка"
    />
    <!-- <button-add @click="createList(list)">Создать лист</button-add> -->
    <button-add @click="showModal(`Список ${list.name} создан`, 'ОК', false)"
      >Создать</button-add
    >
  </form>
  <my-modal
    :show="modalVisible"
    :modalTitle="modalTitle"
    :rightBtnTitle="modalButton"
    @rightBtnAction="createList(list)"
    @close="this.modalVisible = false"
    :twoButtons="buttons"
  ></my-modal>
</template>

<script>
import {mapActions} from 'vuex';
import MyModal from './UI/MyModal.vue';
export default {
  components: {MyModal},
  data() {
    return {
      list: {
        name: '',
        is_closed: false,
      },
      modalVisible: false,
      modalTitle: '',
      modalButton: '',
      buttons: false,
    };
  },
  methods: {
    ...mapActions(['CREATE_LIST']),
    createList(list) {
      this.modalVisible = false;
      if (this.list.name) {
        this.CREATE_LIST(list);
        this.list = {
          name: '',
          is_closed: false,
        };
      }
    },
    showModal(title, button, buttons) {
      this.modalTitle = title;
      this.modalVisible = true;
      this.modalButton = button;
      this.buttons = buttons;
    },
  },
};
</script>

<style>
.form {
  display: flex;
  align-items: center;
}
</style>
