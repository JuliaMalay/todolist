<template>
  <div class="list" v-for="todo in lists" :key="todo.id">
    <div
      class="listsItems"
      :class="{completed: todo.is_completed, empty: !todo.count_tasks}"
    >
      <router-link :to="'/lists/tasks/' + todo.id" class="list_link">
        {{ todo.name }}
      </router-link>
      <button class="buttonDelete" @click="deleteList(todo.id)">X</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
  props: {
    value: {
      type: String,
    },
  },
  mounted() {
    this.GET_LISTS_FROM_API();
  },
  // computed: {
  //   ...mapGetters(['GET_ALL_LISTS']),
  // },
  computed: {
    ...mapGetters([`FILTERED_LISTS`]),
    lists() {
      return this.FILTERED_LISTS('' + this.value);
    },
  },
  methods: {
    ...mapActions(['GET_LISTS_FROM_API', 'DELETE_LIST']),

    deleteList(id) {
      this.DELETE_LIST(id);
      if (id == this.$router.currentRoute.value.params.id) {
        this.$router.replace({path: '/lists'});
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
  background: #dbffb8;
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
}
.completed {
  background: #d7d7d7;
}
.empty {
  background: #fff;
}
.list_link {
  width: 100%;
  text-align: left;
}
</style>
