<template>
  <div class="wrapper">
    <canvas
      id="draw-canvas-js" 
      class="canvas" 
      width="600" 
      height="600" 
      @mousedown="mousedown"
      @mousemove="mousemove" 
      @mouseup="mouseup" 
      @mouseleave="mouseleave"
    />
  </div>
</template>
<script>
  export default {
    name: 'Draw',
    data() {
      return {
        canvasCtx: null
      }
    },
    mounted() {
      this.canvasCtx = document.getElementById('draw-canvas-js').getContext('2')
    },
    methods: {
      mousedown() {
        this.canvasCtx.beginPath()
      },
      mousemove(envet) {
        console.log(event, 'event')
        this.canvasCtx.moveTo()
        this.canvasCtx.lineTo(100, 200)
      },
      mouseup() {
        this.canvasCtx.stroke()
      },
      mouseleave() {
        this.canvasCtx.stroke()
      }
    }
  }
</script>
<style scoped>
  .wrapper{
    height: 100vh;
    width: 100vw;
  }
  .canvas{
    border: 1px solid;
  }
</style>
