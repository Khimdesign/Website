<template>
  <div class="con">
    <div class="textCon">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
    }
  },
  props: ['text']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .textCon
  {
    padding-left: 20px;
    padding-right: 20px;
    background-color: #ff91a3;
    display: inline-block;
    height: 35px;
    line-height: 37px;
    color: #fff;
    font-family: font4;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }
  .con
  {
    width: 100%;
    border-bottom: 2px #ff91a3 solid
  }
</style>
