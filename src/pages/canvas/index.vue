<template>
  <div class="wrapper">
    <canvas id="canvas-js1" class="canvas" />
  </div>
</template>
<script>
  export default {
    name: 'Canvas',
    data() {
      return {

      }
    },
    mounted() {
      this.makeCanvas1()
    },
    methods: {
      makeCanvas1() {
        const canvas = document.getElementById('canvas-js1')
        const ctx = canvas.getContext('2d')
        // const ctxImage = canvas.getContext('2d')
        // canvasContext.fillStyle = 'red'
        // canvasContext.fillRect(0, 0, 200, 200)
        canvas.height = 300
        canvas.width = 300
        ctx.beginPath()
        ctx.moveTo(150, 150)
        ctx.fillStyle = 'red'
        ctx.arc(150, 150, 100, -0.25 * Math.PI, 0.25 * Math.PI)
        ctx.fill()
        ctx.save()
        ctx.translate(150, 150)
        ctx.rotate(0.5 * Math.PI)
        const img = new Image()
        img.src = require('@/assets/logo.png')
        ctx.drawImage(img, 135, 80, 30, 30)
      }
    }
  }
</script>
<style scoped>
  .wrapper{
    width: 100vw;
    height: 100vh;
  }
  .canvas{
    width: 600px;
    height: 600px;
  }
</style>
