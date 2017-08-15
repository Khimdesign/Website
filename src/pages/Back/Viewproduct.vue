<template>
  <div class="container">
    <div class="ui inverted menu">
      <a class="active item font3" href="dashboard.php">
        แดชบอร์ด
      </a>
      <a class="item font3">
        หลังบ้านเว็บบอร์ด
      </a>
      <a class="item font3">
        เว็บไซต์
      </a>
      <a class="item font3">
        ออกจากระบบ
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
    }
  },
  created () {
    this.$session.start()
    this.$session.set('admin', true)
    this.$router.push({
      name: 'Dashboard'
    })
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
