<template>
  <div>
    <div class="parent">
      <div class="child">test</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        
      }
    }
  }
</script>
<style scoped>
body{
  position: relative;
}
.parent{
  width: 40%;
  height: 20px;
  border: 1px solid black;
  position: relative;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.child{
  width:100px;
  height: 30px;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: left center;
  border: 1px solid red;
}
</style>
