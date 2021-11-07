<template>
  <form @submit.prevent class="form">
    <input-add
      v-model.trim="list.name"
      type="text"
      name="title"
      placeholder="Введите название списка"
    />
    <button-add @click="createList(list)">Создать лист</button-add>
  </form>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  data() {
    return {
      list: {
        name: '',
        is_closed: false,
      },
    };
  },
  methods: {
    ...mapActions(['CREATE_LIST']),
    createList(list) {
      if (this.list.name) {
        this.CREATE_LIST(list);
        this.list = {
          name: '',
          is_closed: false,
        };
      }
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
