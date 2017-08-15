<template>
  <div>
  	Loading ...
  </div>
</template>

<script>
export default {
  created () {
    this.$router.push({
      name: 'Cart',
      params: {}
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
