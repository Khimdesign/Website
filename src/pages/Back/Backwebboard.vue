<template>
  <div class="backendCon">
  <div class="container layout">
    <div class="ui inverted menu">
      <router-link to="/dashboard" class="item font3">
        แดชบอร์ด
      </router-link>
      <router-link to="/backwebboard" class="active item font3">
        หลังบ้านเว็บบอร์ด
      </router-link>
      <router-link to="/" class="item font3">เว็บไซต์</router-link>
      <a class="item font3" v-on:click="Adminlogout">
        ออกจากระบบ
      </a>
    </div>

   <div class="ui stackable  column grid">
    
    <div class="three wide column">
      <div class="ui raised segment">
        <div class="element">
          <button class="ui basic fluid button font3" v-on:click="menu = 'all'">
            กระทู้ทั้งหมด
          </button>
        </div>
        <div class="element">
          <button class="ui basic fluid button font3" v-on:click="menu = 'add'">
            <i class="icon plus teal"></i>
            เพิ่มกระทู้
          </button>
        </div>
      </div>
    </div>
    <div class="thirteen wide column">
      <Addwebboard v-if="menu == 'add'"></Addwebboard>
      <Allwebboard v-if="menu == 'all'"></Allwebboard>
    </div>
   </div>


  </div>
  </div>
</template>

<script>
import Addwebboard from '../Back/components/Addwebboard.vue'
import Allwebboard from '../Back/components/Allwebboard.vue'
export default {
  name: 'hello',
  data () {
    return {
      menu: 'all'
    }
  },
  created () {
    this.$session.start()
    if (this.$session.get('admin') !== true) {
      this.$router.push({
        name: 'Homepage'
      })
    }
  },
  firebase () {
    return {
    }
  },
  components: {
    Addwebboard, Allwebboard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .Dashtitle
  {
    width: 100%;
    font-family: font4;
    font-size: 1.6rem;
  }
</style>
