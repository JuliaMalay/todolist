<template>
  <!-- <div class="header">
    <router-link to="/lists">Lists</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/signup">Signup</router-link>
  </div> -->
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  components: {},
  mounted() {},
  computed: {},
  methods: {},
  created() {
    this.$router.push('/login');
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
</style>
