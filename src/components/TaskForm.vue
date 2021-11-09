<template>
  <form @submit.prevent class="form">
    <div class="formWrapper">
      <input-add
        v-model.trim="task.name"
        type="text"
        name="title"
        placeholder="Введите дело"
      />
      <label class="checkbox" for="important">
        <input type="checkbox" v-model="task.urgency" id="important" />
        Срочное</label
      >
    </div>
    <button-add @click="showModal(`Дело ${task.name} создано`, 'ОК', false)"
      >Создать</button-add
    >
  </form>
  <my-modal
    :show="modalVisible"
    :modalTitle="modalTitle"
    :rightBtnTitle="modalButton"
    @rightBtnAction="createTask()"
    @close="this.modalVisible = false"
    :twoButtons="buttons"
  ></my-modal>
</template>

<script>
import {mapActions} from 'vuex';
import MyModal from './UI/MyModal.vue';
export default {
  components: {MyModal},
  props: {
    listId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      task: {
        name: '',
        is_completed: false,
        lists_id: parseInt(this.listId),
        urgency: false,
      },
      modalVisible: false,
      modalTitle: '',
      modalButton: '',
      buttons: false,
    };
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    ...mapActions(['CREATE_TASK', 'CREATE_TASK_NEW']),
    createTask() {
      this.modalVisible = false;
      if (this.task.name) {
        const obj = {
          attributes: {
            name: this.task.name,
            lists_id: parseInt(this.listId),
            urgency: this.task.urgency,
            is_completed: this.task.is_completed,
          },
        };
        this.CREATE_TASK(obj);
        // this.task.name = '';
        // this.task.urgency = false;
        // this.task.is_completed = false;
        // this.task.lists_id = parseInt(this.listId);
        this.task = {
          name: '',
          is_completed: false,
          lists_id: parseInt(this.listId),
          urgency: false,
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
  justify-content: space-between;
}
.formWrapper {
  width: 100%;
  display: flex;
  align-items: center;
}
.checkbox {
  margin-left: 5px;
}
</style>
