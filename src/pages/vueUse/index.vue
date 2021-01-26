<template>
  <div @click="toNext">vue.use的测试</div>
</template>
<script>
  import Vue from 'vue'
  import useTest from './components/vueUse'

  Vue.use(useTest)
  export default {
    name: 'VueUse',
    methods: {
      toNext() {
        this.$router.push({
          name: 'Use2'
        })
      }
    }
  }
</script>
