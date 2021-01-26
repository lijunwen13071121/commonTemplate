<template>
  <div class="wrapper">
    <div
      ref="move" 
      class="move-item" 
      @mousedown="mousedown" 
      @mousemove="mouseMove" 
      @mouseup="mouseup" 
      @mouseleave="mouseleave"
    />
  </div>
</template>
<script>
  export default {
    name: 'Move',
    data() {
      return {
        top: 0,
        left: 0,
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        setIntervalMove: null
      }
    },
    mounted() {
      const moveItem = this.$refs.move
      moveItem.style.top = this.top + 'px'
      moveItem.style.left = this.left + 'px'
    },
    methods: {
      mousedown(event) {
        this.startX = event.clientX
        this.startY = event.clientY
        if (!this.setIntervalMove) {
          const self = this
          this.setIntervalMove = setInterval(() => {
            const moveX = self.endX - self.startX
            const moveY = self.endY - self.startY
            const moveItem = self.$refs.move
            moveItem.style.top = moveY + self.top + 'px'
            moveItem.style.left = moveX + self.left + 'px'
          }, 10)
        } 
        console.log('mousedown')
      },
      mouseup() {
        this.endMove()
      },
      mouseleave() {
        this.endMove()
      },
      mouseMove(event) {
        this.endX = event.clientX
        this.endY = event.clientY
      },
      endMove() {
        this.left = this.left + this.endX - this.startX 
        this.top = this.top + this.endY - this.startY 
        this.startX = 0
        this.startY = 0
        this.endX = 0
        this.endY = 0
        clearInterval(this.setIntervalMove)
        this.setIntervalMove = null
      }
    }
  }
</script>
<style scoped>
  .wrapper{
    position: relative;
  }
  .move-item{
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: pink;
    
  }
</style>
