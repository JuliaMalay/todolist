<template>
  <div class="App">
    <router-view></router-view>
  </div>
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
}
.App {
  margin: 0;
  padding: 0;
}
*,
*::before,
*::after {
  padding: 0px;
  margin: 0px;
  border: 0px;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  line-height: 150%;
  font-size: 16px;
  color: #000;
  font-weight: 300;
  font-family: 'Quicksand', sans-serif;
  background-color: #fff;
  font-style: normal;
  height: 100vh;
  overflow: hidden;
}
a:focus,
a:active {
  outline: none;
}
a,
a:visited {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
  color: blue;
}
a {
  color: rgb(106, 170, 255);
}
</style>
