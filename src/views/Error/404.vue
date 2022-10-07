<template>
  <div>
    <h1 class="text-center text-warning p-5">404 - 没有找到该页面</h1>
    <lottie-player ref="gif" autoplay loop mode="normal" class="p-jsonPlay"></lottie-player>
  </div>
</template>
<script>
  export default {
    name: '404',
    mounted() {
      this.$refs.gif.src = require('@/assets/Error/404.json')
    },
  }
</script>
<style>
</style>