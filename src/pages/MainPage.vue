<template>
  <div class="wrapper">
    <div class="left">
      <div>
        <!-- <lists-filter v-model="this.option"></lists-filter> -->
        <my-filter :option="option" @changeOpt="changeOpt"></my-filter>
        <div class="lists">
          <lists :val="option"></lists>
        </div>
      </div>
      <div class="lists-form">
        <list-form></list-form>
      </div>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ListForm from '../components/ListForm.vue';
import Lists from '../components/Lists.vue';
import {mapActions} from 'vuex';
import MyFilter from '../components/MyFilter.vue';

export default {
  components: {ListForm, Lists, MyFilter},
  data() {
    return {
      option: '1',
    };
  },
  created() {
    this.GET_LISTS_FROM_API();
    // this.GET_TASKS_FROM_API();
  },
  methods: {
    ...mapActions(['GET_LISTS_FROM_API', 'DELETE_LIST']),
    changeSelect(selected) {
      console.log('эмит прошел', selected);
      this.option = selected;
      console.log(this.option);
    },
    changeOpt(selected) {
      this.option = selected;
    },
  },
};
</script>

<style>
.wrapper {
  display: flex;
  min-height: 100vh;
  padding: 15px;
}
.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 1 auto;
  margin-right: 30px;
  border: 2px solid blue;
  padding: 5px;
}
.lists {
  margin: 10px 0px;
}
.lists-form {
  display: flex;
  justify-content: space-between;
}
.right {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid blue;
  padding: 5px;
}
</style>
