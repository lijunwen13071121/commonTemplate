<template>
  <div class="wrapper">
    <canvas id="canvas-test-js" />
    <img v-show="false" id="img-test-js" :src="require('@/assets/logo.png')">
  </div>
</template>
<script>
  export default {
    name: 'CanvasTest',
    data() {
      return {

      }
    },
    mounted() {
      this.drawCanvas()
    },
    methods: {
      drawCanvas() {
        const canvas = document.getElementById('canvas-test-js')
        const ctx = canvas.getContext('2d')
        const img = document.getElementById('img-test-js')
        canvas.height = 500
        canvas.width = 300
        ctx.drawImage(img, 0, 0, 300, 500)
      }
    }
  }
</script>
<style scoped>
  .wrapper{
    width: 100vw;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  canvas{
    margin: 0;
    width: 100vw;
    height: 100vh;
  }
</style>
