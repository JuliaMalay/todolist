<template>
  <div
    class="list"
    v-for="todo in this.GET_ALL_LISTS"
    :key="todo.id"
    :class="{completed: todo.is_completed, empty: !todo.count_tasks}"
  >
    <router-link :to="'/tasks/' + todo.id">
      <div class="listsItems">
        {{ todo.name
        }}<button class="buttonDelete" @click="deleteList(todo.id)">X</button>
      </div></router-link
    >
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
  mounted() {
    this.GET_LISTS_FROM_API();
  },
  computed: {
    ...mapGetters(['GET_ALL_LISTS']),
  },
  methods: {
    ...mapActions(['GET_LISTS_FROM_API', 'DELETE_LIST']),

    deleteList(id) {
      this.DELETE_LIST(id);
      if (id == this.$router.currentRoute.value.params.id) {
        console.log('равны');

        this.$router.push('/');
        console.log('прошел');
      }
    },
  },
};
</script>

<style>
.listsItems {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  border: 1px solid rgb(92, 102, 148);
}
.listsItems:hover {
  background: rgba(0, 0, 0, 0.2);
}
.buttonDelete {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  background: transparent;
  cursor: pointer;
}
.list {
  background: #dbffb8;
}
.completed {
  background: #d7d7d7;
}
.empty {
  background: #fff;
}
</style>
