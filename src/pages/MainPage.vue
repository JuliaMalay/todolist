<template>
  <div class="wrapper">
    <div class="left">
      <div class="lists">
        <lists></lists>
      </div>
      <div class="listsForm">
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
export default {
  components: {ListForm, Lists},
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
}
.listsForm {
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
