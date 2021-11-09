<template>
  <header class="header">
    <h1>TodoApp</h1>
    <button class="logout__button" @click="logout"></button>
  </header>
  <div class="wrapper">
    <div class="left">
      <div>
        <my-filter :option="option" @changeOpt="changeOpt"></my-filter>
        <div class="lists">
          <lists :value="option"></lists>
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
    changeOpt(selected) {
      this.option = selected;
    },
    logout() {
      this.$store.dispatch('auth/logout').then(
        () => {
          this.$router.push('/login');
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style>
.wrapper {
  display: flex;
  min-height: 95vh;
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
.header {
  display: flex;
  justify-content: space-between;
  padding: 0px 15px;
  align-items: center;
}
.logout__button {
  background-image: url(/img/logout.0716d3b1.png);
  /* display: inline-block;
  padding: 0;
  margin: 0; */
  vertical-align: top;
  background-size: contain;
  height: 50px;
  width: 50px;
  background-color: white;
  cursor: pointer;
}
</style>
