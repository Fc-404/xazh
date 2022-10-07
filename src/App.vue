<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  import HomePage from './views/HomePage.vue'

  export default {
    name: 'App',
    components: {
      HomePage
    },
    mounted() {
      this.$router.replace({
        // name: 'HomePage'
        name: 'HomePage',
        query: {
          type: 'login'
        }
      })
    },
  }
</script>
<style>
</style>