<template>
  <div @click="toBefore">vue.use的测试</div>
</template>
<script>
  import Vue from 'vue'
  import useTest from './components/vueUse'

  Vue.use(useTest)
  export default {
    name: 'VueUse',
    methods: {
      toBefore() {
        this.$router.push({
          name: 'Use1'
        })
      }
    }
  }
</script>
