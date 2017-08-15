<template>
  <div>
  <div class="container">
    <div class="component">
      <div class="row">
        <div class="col-md-12"><Banner></Banner></div>
      </div>
    </div>
    <div class="component">
      <div class="row">
        <div class="col-md-4">
          <div class="catImage" v-on:click="viewLv1('เสื้อผ้าผู้ชาย')">
            <div class="text">เสื้อผ้าผู้ชาย</div>
            <div class="filter t2"></div>
            <img src="../assets/img/shopmen.png">
          </div>
        </div>
        <div class="col-md-4">
          <div class="catImage" v-on:click="viewLv1('เสื้อผ้าผู้หญิง')">
            <div class="text">เสื้อผ้าผู้หญิง</div>
            <div class="filter t2"></div>
            <img src="../assets/img/shopwomen.png">
          </div>
        </div>
        <div class="col-md-4">
          <div class="catImage" v-on:click="viewLv1('Pattern สุนัข')">
            <div class="text">Pattern สุนัข</div>
            <div class="filter t2"></div>
            <img src="../assets/img/shopdog.jpg">
          </div>
        </div>
      </div>
    </div>

    <div class="component">
      <div class="centerText">
        <h2 class="font4">สินค้ายอดนิยม</h2>
        <h5 class="font3">สินค้ามาใหม่ผลงานคุณภาพจากร้าน Khim Design</h5>
      </div>
    </div>

    <div class="component">
      <div class="row">
        <div class="col-md-3 col-6" v-for="(product,index) in newProduct" v-if="product.show == true">
          <Productbox :product="product"></Productbox>
        </div>
      </div>
    </div>

    <div class="component">
      <div class="centerText">
        <h2 class="font4">กระทู้ถาม-ตอบ</h2>
        <h5 class="font3">ถามตอบข้อมูลและความรู้จากผู้มีความชำนาญ</h5>
      </div>
    </div>

    <div class="component">
      <div class="row">
        <div class="col-md-4" v-for="webboard in newComment">
          <Homewebboard :data="webboard"></Homewebboard>
        </div>
      </div>
    </div>

  </div>
  </div>
</template>

<script>
import Navigate from '../components/Navigate.vue'
import Banner from '../components/Banner'
import Productbox from '../components/Productbox'
import Homewebboard from '../components/Homewebboard'
import db from '../modules/firebase.js'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  firebase () {
    return {
      products: {
        source: db.database().ref('product')
      },
      webboards: {
        source: db.database().ref('webboard')
      }
    }
  },
  methods: {
    viewLv1 (thiskey) {
      this.$router.push({
        name: 'Category',
        params: {
          lv1: thiskey
        }
      })
    }
  },
  computed: {
    newProduct () {
      return this.products.slice().reverse().slice(0, 4)
    },
    newComment () {
      return this.webboards.slice().reverse().slice(0, 6)
    }
  },
  components: {
    Banner, Navigate, Productbox, Homewebboard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.catImage
{
  width: 100%;
  background-color: #333;
  border:2px #ffa5c1 solid;
  position: relative;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
}
.catImage img
{
  width: 100%;
  cursor: pointer;
}

.catImage:hover .filter
{
  width: 80%;
  height: 60px;
  top: 50%;
  background-color: #e4628b;
  position: absolute;
  opacity: 0.9;
  z-index: 100;
  margin-top: -30px;
  border-radius: 5px;
  left: 10%;
  cursor: pointer;
}

.catImage .filter
{
  width: 100%;
  height: 100%;
  background-color: #e4628b;
  position: absolute;
  opacity: 0.4;
  z-index: 100;
  top: 0%;
  margin-top: 0px;
  left: 0%;
  cursor: pointer;
}

.catImage .text
{
  width: 100%;
  height: 50px;
  line-height: 50px;
  position: absolute;
  z-index: 200;
  top: 50%;
  margin-top: -25px;
  text-align: center;
  font-family: font3;
  font-size: 1.6rem;
  color: #fff;
  cursor: pointer;
}
</style>
