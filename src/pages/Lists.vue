<template>
  <div v-for="todo in this.GET_ALL_LISTS" :key="todo.id">
    <div>
      <!-- <router-link :to="{name: 'tasks', params: {id: todo.id}}">{{
        todo.name
      }}</router-link> -->
      <router-link :to="'/lists/tasks/' + todo.id">{{ todo.name }}</router-link>
    </div>
  </div>

  <router-view></router-view>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
// import TodoService from '../services/todo.service';
export default {
  data() {
    return {
      content: '',
    };
  },
  mounted() {
    this.GET_LISTS_FROM_API();
  },
  computed: {
    ...mapGetters(['GET_ALL_LISTS']),
  },
  methods: {
    ...mapActions(['GET_LISTS_FROM_API']),
  },
  // mounted() {
  //   TodoService.getLists().then(
  //     (response) => {
  //       this.content = response.data.data;
  //     },
  //     (error) => {
  //       this.content =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //     }
  //   );
  // },
};
</script>

<style></style>
