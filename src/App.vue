<template>
  <div id="app">
    <app-header v-if="this.$route.meta.header !== false" />
    <router-view />
  </div>
</template>

<script>
import Header from './components/layout/Header.vue'

export default {
  components: {
    'app-header': Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
