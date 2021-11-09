<template>
  <div class="task">
    <div style="display: flex; align-items: center">
      <!-- <checkbox v-model:isChecked="checked" ></checkbox> -->
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
      <button class="buttonDelete" @click="deleteTask(task)">X</button>
    </div>
  </div>
  <!-- v-model="task.checked" -->
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: 'task',
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
    showModal() {
      this.$emit('showModal', this.task);
      // this.$store.commit('SET_CURRENT_TASK', this.task);
      // this.$store.commit('SHOW_MODAL');
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
