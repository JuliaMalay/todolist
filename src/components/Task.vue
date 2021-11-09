<template>
  <div class="task">
    <div style="display: flex; align-items: center">
      <input
        class="taskCheckbox"
        type="checkbox"
        :checked="task.is_completed"
        @change="changeTask(task)"
      />
      <div v-show="task.urgency" class="important"></div>
      <div>
        <strong>{{ task.name }}</strong>
      </div>
    </div>
    <div style="display: flex; align-items: center">
      <div>
        {{ new Date(task.created_at).toLocaleString('en-US', options) }}
      </div>
      <button
        class="buttonDelete"
        @click="showModal(`Удалить дело${task.name}?`, 'Удалить', true)"
      >
        X
      </button>
    </div>
  </div>
  <my-modal
    :show="modalVisible"
    :modalTitle="modalTitle"
    :rightBtnTitle="modalButton"
    @rightBtnAction="deleteTask(task)"
    @close="this.modalVisible = false"
    :twoButtons="buttons"
  ></my-modal>
</template>

<script>
import {mapActions} from 'vuex';
import MyModal from './UI/MyModal.vue';
export default {
  name: 'task',
  components: {MyModal},
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      },
      checked: this.task.is_completed,
      modalVisible: false,
      modalTitle: '',
      modalButton: '',
      buttons: false,
    };
  },
  created() {},
  computed: {},
  methods: {
    ...mapActions(['DELETE_TASK', 'CHANGE_TASK']),
    deleteTask(task) {
      this.DELETE_TASK(task);
    },
    changeTask(task) {
      this.CHANGE_TASK(task);
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

<style scoped>
.buttonDelete {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  background: transparent;
  cursor: pointer;
}
.task:hover {
  background: rgba(0, 0, 0, 0.2);
}
.taskCheckbox {
  margin-right: 5px;
}
</style>
