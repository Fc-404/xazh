<template>
  <div>
    <h1 class="text-center text-warning p-5">
      404 - 没有找到该页面
    </h1>
    <Lottie id="four-lottie"></Lottie>
  </div>
</template>
<script>
  import Lottie from '@/components/Lottie.vue'

  export default {
    name: '404',
    components: {
      Lottie
    },
    mounted() {
      document.title = this.$store.state.title + '404'
      let lottie = document.getElementById('four-lottie')
      lottie.style.top = 'calc(50% - ' + lottie.scrollHeight / 2 + 'px)'
    },
  }
</script>
<style scoped>
  #four-lottie {
    position: fixed;
    width: 100vw;
    z-index: -9;
  }
</style>