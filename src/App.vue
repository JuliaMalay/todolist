<template>
  <form @submit.prevent>
    <input
      v-bind:value="title"
      @input="title = $event.target.value"
      type="text"
      name=""
      id=""
      placeholder=""
    />
    <button @click="createTask">Создать</button>
    <input type="checkbox" v-model="important" />
  </form>
  <div class="task" :key="task.id" v-for="task in tasks">
    <input
      v-model="task.checked"
      v-bind:id="task.id"
      type="checkbox"
      name="check"
    />
    <div>
      <strong>{{ task.title }}</strong>
    </div>
    <div>{{ task.date }}</div>
    <div v-show="task.important" class="important"></div>
  </div>
</template>

<script>
// import Task from './components/Task.vue';

export default {
  name: 'App',
  components: {},
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: 'First Task',
          date: '14:10',
          checked: false,
          important: false,
        },
        {
          id: 2,
          title: 'Second Task',
          date: '16:40',
          checked: false,
          important: false,
        },
        {
          id: 3,
          title: 'Third Task',
          date: '21.11.2021, 12:44:57',
          checked: false,
          important: false,
        },
      ],
      title: '',
      important: false,
    };
  },
  methods: {
    createTask() {
      const newTask = {
        id: Date.now(),
        title: this.title,
        date: new Date().toLocaleString('ru-RU'),
        checked: false,
        important: this.important,
      };
      this.tasks.push(newTask);
      this.important = false;
      this.title = '';
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.task {
  display: flex;
  align-items: center;
}
.important {
  background-color: red;
  border-radius: 50%;
  width: 10px;
  height: 10px;
}
</style>
