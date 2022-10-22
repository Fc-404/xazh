<template>
  <div ref="lottie">
  </div>
</template>
<script>
  import lottie from 'lottie-web'

  export default {
    name: 'Lottie',
    props: {
      width: {
        type: String,
        default: null
      },
      height: {
        type: String,
        default: null
      },
      src: {
        type: Object,
        default: null
      }
    },
    mounted() {
      let lot = new lottie.loadAnimation({
        container: this.$refs.lottie,
        renderer: 'canvas',
        loop: true,
        autoplay: true,
        animationData: this.src ? this.src : this.$store.state.assets.error404
      })
      this.$refs.lottie.style.width = this.width
      this.$refs.lottie.style.height = this.height
      this.$emit('control', lot)
    },
  }
</script>
<style>
</style>