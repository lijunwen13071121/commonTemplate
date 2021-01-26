<template>
  <div 
    id="bubble-js"
    class="wrapper" 
    :class="['wrapper-drection-' + drection]"
  >
    <slot />
    <div 
      class="arrow" 
      :class="[ 'drection-'+ drection]" 
      :style="arrowStyle"
    />
    <div
      id="bubble-wrapper-js" 
      class="bubble-wrapper" 
      :style="contentStyle"
    >{{ content }}
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Bubble',
    props: {
      placement: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      backGroundColor: {
        type: String,
        default: '#000000'
      },
      fontColor: {
        type: String,
        default: '#ffffff'
      },
      fontSize: {
        type: Number,
        default: 12
      }
    },
    data() {
      return {
        bubbleWidth: 0,
        bubbleHeight: 0,

        wrapperWidth: 0,
        wrapperHeight: 0
      }
    },
    computed: {
      xPosition() {
        if (this.placement.indexOf('left') > -1) {
          return 'left'
        } else if (this.placement.indexOf('right') > -1) {
          return 'right'
        } else {
          return 'center'
        }
      },
      yPosition() {
        if (this.placement.indexOf('top') > -1) {
          return 'top'
        } else if (this.placement.indexOf('bottom') > -1) {
          return 'bottom'
        } else {
          return 'center'
        }
      },
      drection() {
        if (this.placement) {
          if (this.placement.split('-')[0] === 'center') {
            return 'bottom'
          } else {
            return this.placement.split('-')[0]
          }
        }
        return 'bottom'
      },
      arrowStyle() {
        return [
          {
            'top': this.arrowYPosition + 'px',
            'left': this.arrowXPosition + 'px'
          },
          this.drection === 'top' ? {
            'border-top-color': this.backGroundColor
          } : {
            'border-bottom-color': this.backGroundColor
          }
        ]
      },
      contentStyle() {
        return {
          'top': this.contentYPosition + 'px', 
          'left': this.contentXPosition + 'px',
          'background-color': this.backGroundColor, 
          'color': this.fontColor,
          'line-height': this.fontSize * 1.5 + 'px',
          'font-size': this.fontSize + 'px'
        }
      },
      arrowXPosition() {
        let xPosition = 0
        if (this.drection === 'bottom' || this.drection === 'top') {
          if (this.xPosition === 'center') {
            xPosition = this.bubbleWidth / 2 - 5
          } else if (this.xPosition === 'right') {
            xPosition = this.bubbleWidth * 0.9
          } else {
            xPosition = 10
          }
        }
        return xPosition
      },
      arrowYPosition() {
        let yPosition = 0
        if (this.drection === 'bottom') {
          yPosition = this.bubbleHeight
        } else {
          yPosition = -10
        }
        return yPosition
      },
      contentXPosition() {
        let xPosition = 0
        if (this.drection === 'bottom' || this.drection === 'top') {
          if (this.xPosition === 'center') {
            xPosition = this.bubbleWidth / 2 - 100
          } else if (this.xPosition === 'right') {
            xPosition = this.bubbleWidth * 0.8
          } else {
            xPosition = 40 - this.wrapperWidth
          }
        }
        return xPosition
      },
      contentYPosition() {
        let yPosition = 0
        if (this.drection === 'bottom') {
          yPosition = this.bubbleHeight + 10
        } else {
          yPosition = -10 - this.wrapperHeight
        }
        return yPosition
      }
    },
    mounted() {
      console.log(this)
      const bubbleWrapper = document.getElementById('bubble-wrapper-js')
      const bubble = document.getElementById('bubble-js')
      this.wrapperWidth = bubbleWrapper.offsetWidth
      this.wrapperHeight = bubbleWrapper.offsetHeight
      this.bubbleWidth = bubble.offsetWidth
      this.bubbleHeight = bubble.offsetHeight
    }
  }
</script>
<style scoped>
  .wrapper{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .bubble-wrapper{
    width: 200px;
    min-height: 20px;
    position: absolute;
    padding: 5px;
    border-radius: 5px;
    box-sizing: border-box;
  }
  .arrow{
    position: absolute;
  }
  .drection-bottom {
    border-left: 10px solid transparent ;
    border-bottom: 10px solid ;
    border-right: 10px solid transparent ;
  }
 .drection-top {
    border-left: 10px solid transparent ;
    border-top: 10px solid ;
    border-right: 10px solid transparent ;
  }
  .wrapper-drection-top{
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
</style>
