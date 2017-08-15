<template>
  <div class="backendCon">
  <div class="container layout">
    <div class="ui inverted menu">
      <a class="active item font3">
        แดชบอร์ด
      </a>
      <router-link to="/backwebboard" class="item font3">
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
              <button class="ui basic fluid button font3" v-on:click="menu = 1">
                <i class="icon shopping bag pink"></i>
                order สินค้า
              </button>
            </div>
            <div class="element">
              <button class="ui basic fluid button font3" v-on:click="menu = 2">
                <i class="icon plus"></i>
                เพิ่มสินค้า
              </button>
            </div>
            <div class="element">
              <button class="ui basic fluid button font3" v-on:click="menu = 3">
                <i class="icon shop"></i>
                สินค้าทั้งหมด
              </button>
            </div>
            <!-- <div class="element">
              <button class="ui basic fluid button font3" v-on:click="menu = 4">
                <i class="icon archive"></i>
                สินค้าที่ถูกลบ
              </button>
            </div> -->
            <!-- <div class="element">
              <button class="ui basic fluid button font3" v-on:click="menu = 5">
                <i class="icon percent"></i>
                  โปรโมชัน
              </button>
            </div> -->
            <div class="element">
              <button class="ui basic fluid button font3" v-on:click="menu = 5">
                <i class="icon write"></i>
                  เกี่ยวกับเรา
              </button>
            </div>
            <div class="element">
              <button class="ui basic fluid button font3" v-on:click="menu = 6">
                <i class="icon send outline"></i>
                  การติดต่อ
              </button>
            </div>
            <div class="element">
              <button class="ui basic fluid button font3" v-on:click="menu = 7">
                <i class="icon payment"></i>
                  การชำระเงิน
              </button>
            </div>
            <div class="element">
              <button class="ui basic fluid button font3" v-on:click="menu = 10">
                <i class="icon car"></i>
                  ค่าจัดส่งสินค้า
              </button>
            </div>
            <div class="element">
              <button class="ui basic fluid button font3" v-on:click="menu = 8">
                เปลี่ยน Banner
              </button>
            </div>
            <div class="element">
              <button class="ui basic fluid button font3" v-on:click="menu = 9">
                เปลี่ยนรหัสผ่าน
              </button>
            </div>
            <div class="element">
              <button class="red ui basic fluid button font3" v-on:click="menu = 4">
                <i class="icon tag"></i>
                  หมวดหมู่
              </button>
            </div>
        </div>
      </div>

      <div class="thirteen wide column">
        <Dash1 v-if="getMenu == 1"></Dash1>
        <Dash2 v-if="getMenu == 2"></Dash2>
        <Dash3 v-if="getMenu == 3"></Dash3>
        <Dash4 v-if="getMenu == 4" :viewKey="productKey"></Dash4>
        <Dash5 v-if="getMenu == 5"></Dash5>
        <Dash6 v-if="getMenu == 6"></Dash6>
        <Dash7 v-if="getMenu == 7"></Dash7>
        <Dash8 v-if="getMenu == 8"></Dash8>
        <Dash9 v-if="getMenu == 9"></Dash9>
        <Dash10 v-if="getMenu == 10"></Dash10>
        <viewProduct v-if="getMenu == 0"></viewProduct>
      </div>

    </div>

  </div>
  </div>
</template>

<script>
import Dash1 from '../Back/components/Dash1.vue'
import Dash2 from '../Back/components/Dash2.vue'
import Dash3 from '../Back/components/Dash3.vue'
import Dash4 from '../Back/components/Dash4.vue'
import Dash5 from '../Back/components/Dash5.vue'
import Dash6 from '../Back/components/Dash6.vue'
import Dash7 from '../Back/components/Dash7.vue'
import Dash8 from '../Back/components/Dash8.vue'
import Dash9 from '../Back/components/Dash9.vue'
import Dash10 from '../Back/components/Dash10.vue'
import viewProduct from '../Back/components/viewProduct.vue'
export default {
  name: 'hello',
  data () {
    return {
      menu: 1
    }
  },
  firebase () {
    return {
    }
  },
  computed: {
    getMenu () {
      if (this.$store.backViewProduct === '') {
        return this.menu
      } else {
        return '0'
      }
    }
  },
  methods: {
    back () {
      this.$store.backViewProduct = ''
    },
    Adminlogout () {
      this.$session.start()
      this.$session.remove('admin')
      this.$router.push({
        name: 'Back'
      })
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
  components: {
    Dash1, Dash2, Dash3, Dash4, Dash5, Dash6, Dash7, Dash8, Dash9, Dash10, viewProduct
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
