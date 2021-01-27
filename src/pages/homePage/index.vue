<template>
  <div>
    <Rend msg="render函数性能优化" />
    <div class="bubble-div">
      <Bubble content="test2" placement="top-left" :font-size="12"> 
        <span class="title">bubble</span>
      </Bubble>
    </div>
  </div>
</template>

<script>
  import Bubble from '@/components/Bubble.vue'
  import Rend from '@/components/render.vue'

  export default {
    name: 'Home',
    components: {
      Bubble,
      Rend
    },
    data() {
      return {
        msg: 'test'
      }
    }
  }
</script>

<style>
  .bubble-div{
    width: 200px;
    height: 20px;
    margin-left: 200px;
    border: 1px solid red;
    text-align: center;
  }
</style>
