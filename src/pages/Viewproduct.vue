<template>
  <div>
    <div class="container page">
      <div class="row">
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-2 desktop">
              <img src="../assets/img/noimage.jpg" class="miniImage miniactive t2" width="100%" v-if="countImage == false">
              <div v-if="countImage == true">
                <img :src="image.image" class="miniImage t2" v-for="(image, index, key) in products.image" v-on:click="viewImage = key" v-bind:class="{ miniactive : key == viewImage }">
              </div>
            </div>
            <div class="col-md-10">
              <img src="../assets/img/noimage.jpg" class="bigImage t2" width="100%" v-if="countImage == false">
              <transition-group name="fade">
              <img :src="image.image" class="bigImage t2" v-for="(image, index, key) in products.image" v-bind:key="image" v-if="key == viewImage">
              </transition-group>
            </div>
          </div>
          <div class="row component">
            <div class="col-md-2 mobile" v-if="countImage == false">
              <img src="../assets/img/noimage.jpg" class="miniImage miniactive t2" width="100%">
            </div>
            <div class="col-md-2 col-4 mobile" v-if="countImage == true" v-for="(image, index, key) in products.image">
              <img :src="image.image" class="miniImage t2"  v-on:click="viewImage = key" v-bind:class="{ miniactive : key == viewImage }">
            </div>
          </div>

          <div class="component" style="width: 100%;">
            <div class="optionBox">
              <div class="box" v-bind:class="{boxActive:optbox == 1}"
              v-on:click=" optbox = 1">
                รายละเอียด
              </div>
              <div class="box" v-bind:class="{boxActive:optbox == 2}"
              v-on:click=" optbox = 2">
                สเปกสินค้า
              </div>
            </div>
          </div>
          <div class="component">
          <transition name="fade">
            <div v-if="optbox == 1">
              รหัสสินค้า / item code : {{products.sku}}
              <br>
              {{products.detail}}
            </div>
            <div v-if="optbox == 2">
              <table class="specTable">
                <tr class="tableHead">
                  <td class="font2">ขนาด/size</td>
                  <td class="font4">ใหล่กว้าง</td>
                  <td class="font4">รักแร้</td>
                  <td class="font4">รอบอก</td>
                  <td class="font4">รอบเอว</td>
                  <td class="font4">สะโพกใหญ่</td>
                  <td class="font4">แขนยาว</td>
                  <td class="font4">เสื้อยาว</td>
                  <td class="font4">กระโปรงยาว</td>
                  <td class="font4">กางเกงยาว</td>
                  <td class="font4"">ปลายขายาว</td>
                </tr>
                <tr v-for="(size, index) in getSize" v-if="size.s1 || size.s2">
                  <td>{{index}}</td>
                  <td>{{size.s1}}<span v-if="size.s1">"</span></td>
                  <td>{{size.s2}}<span v-if="size.s2">"</span></td>
                  <td>{{size.s3}}<span v-if="size.s3">"</span></td>
                  <td>{{size.s4}}<span v-if="size.s4">"</span></td>
                  <td>{{size.s5}}<span v-if="size.s5">"</span></td>
                  <td>{{size.s6}}<span v-if="size.s6">"</span></td>
                  <td>{{size.s7}}<span v-if="size.s7">"</span></td>
                  <td>{{size.s8}}<span v-if="size.s8">"</span></td>
                  <td>{{size.s9}}<span v-if="size.s9">"</span></td>
                  <td>{{size.s10}}<span v-if="size.s10">"</span></td>
                </tr>
              </table>
              {{allsizes}}
            </div>
            </transition>
          </div>

        </div>

        <div class="col-md-4">
          <div class="productName">{{products.name}}</div>
          <div class="component">
            <div class="productCat">{{products.lv1}} - {{products.lv2}}</div>
          </div>
          <div class="productPrice" v-if="products.promotion == 0">฿ {{products.price}}</div>
          <div class="productPrice" v-if="products.promotion != 0">
            <div class="discount discountPrice">
              ฿ {{products.price}}
            </div>
            ฿ {{getDiscount}}
          </div>
          <div class="discountBox" v-if="products.promotion != 0">ลดราคา {{products.promotion}}%</div>
          <div class="Hrline"></div>
          
          <div class="component">
            <div class="Det">
              <div class="left">
                ขนาด / Size
              </div>
              <div class="right">
                <select class="selectSize" v-model="size" v-if="products.size">
                  <option value="">เลือกขนาด</option>
                  <option :value="index" v-for="(thissize, index) in products.size">
                    {{index}}
                  </option>
                </select>
                <select class="selectSize" v-model="size" v-if="!products.size">
                  <option value="">เลือกขนาด</option>
                  <option value="One size">มีขนาดเดียว</option>
                </select>
              </div>
            </div>
          </div>

          <div class="component">
            <div class="Det">
              <div class="left">
                จำนวน / Quantity
              </div>
              <div class="right">
                <div class="spinner">
                  <div class="left t2" v-on:click="qtyMinus">-</div>
                  <div class="center">{{qty}}</div>
                  <div class="right t2" v-on:click="qtyPlus">+</div>
                </div>
              </div>
            </div>
          </div>

          <div class="Hrline"></div>

          <div class="row">
            <div class="col-md-12">
              <button class="button1 t2" v-on:click="addtocart">เพิ่มในตะกร้า</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigate from '../components/Navigate.vue'
import db from '../modules/firebase.js'
export default {
  name: 'Viewproduct',
  data () {
    return {
      viewImage: 0,
      qty: 1,
      optbox: 1,
      size: ''
    }
  },
  firebase () {
    return {
      products: {
        source: db.database().ref('product/' + this.$route.params.productId),
        asObject: true
      },
      productsize: {
        source: db.database().ref('product/' + this.$route.params.productId + '/size')
      }
    }
  },
  methods: {
    addtocart () {
      var pushItem = []
      var randomText = ''
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (var i = 0; i < 10; i++) {
        randomText += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      if (this.countCart === 0) {
        this.$session.set('usercart', [])
        var cartitem = {
          size: this.size,
          date: Date.now(),
          qty: this.qty,
          productId: this.$route.params.productId,
          id: randomText
        }
        pushItem.push(cartitem)
      } else {
        pushItem = this.$session.get('usercart')
        var addcartItem = {
          size: this.size,
          date: Date.now(),
          qty: this.qty,
          productId: this.$route.params.productId,
          id: randomText
        }
        pushItem.push(addcartItem)
      }
      if (this.size === '') {
        alert('โปรดระบุขนาด')
      } else {
        this.$session.set('usercart', pushItem)
        location.reload()
        alert('เพิ่มสินค้าในตะกร้าแล้ว!')
      }
    },
    qtyMinus () {
      if (this.qty > 1) {
        this.qty--
      }
    },
    qtyPlus () {
      this.qty++
    }
  },
  computed: {
    countImage () {
      if (this.products.image) {
        return true
      } else {
        return false
      }
    },
    getsizeType () {
    },
    getSize () {
      var allsize = this.products.size
      return allsize
    },
    getDiscount () {
      var price = this.products.price
      var discount = this.products.promotion
      var total = (parseInt(price) * (100 - parseInt(discount))) / 100
      return total
    },
    countCart () {
      if (this.$session.has('usercart')) {
        return this.$session.get('usercart').length
      } else {
        return 0
      }
    }
  },
  components: {
    Navigate
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.miniImage
{
  border: 2px #eee solid;
  margin-top: 10px;
  width: 80%;
  margin: 10%;
}

.miniImage:hover
{
  border: 2px #ff8888 solid;
  margin-top: 10px;
  width: 90%;
  margin: 5%;
}

.miniactive
{
  border: 2px #ffc3cd solid;
  width: 100%;
  margin: 0%;
}

.miniactive:hover
{
  border: 2px #ffc3cd solid;
  width: 100% !important;
  margin: 0% !important;
}

.bigImage
{
  width: 100%;
  border: 2px #ffc3cd solid;
}

.productName
{
  font-family: font4;
  font-size: 1.8rem;
  line-height: 1.8rem;
  color:#651b28;
}

.productCat
{
  font-family: font2;
  color:#651b28;
  font-size: 1rem;
  line-height: 1rem;
  margin-top: 5px;
}

.productPrice
{
  font-family: font3;
  color:#651b28;
  font-size: 2rem;
  line-height: 2rem;
  margin-top: 5px;
}

.Hrline
{
  width: 100%;
  height: 2px;
  background-color: #ffc3cd;
  margin-top: 20px;
  margin-bottom: 20px;
}

.Det
{
  height: 40px;
  width: 100%;
}

.Det .left
{
    float: left;
    line-height: 40px;
    vertical-align: middle;
}
.Det .right
{
    float: right;
    line-height: 40px;
    vertical-align: middle;
}

.selectSize
{
  height: 40px;
  width: 130px;
  color:#651b28;
  border:2px #ffc3cd solid;
  border-radius:0px;
  background-color: transparent;
  font-family: font3;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  text-indent: 10px;
}

.button1
{
  width: 100%;
  height: 45px;
  border:2px #ec5781 solid;
  background-color: transparent;
  text-align: center;
  outline: none;
  cursor: pointer;
  color:#ec5781;
  font-family: font3;
  font-size: 1.2rem;
}

.button2
{
  width: 100%;
  height: 45px;
  background-color: #ec5781;
  border:0px;
  outline: none;
  cursor: pointer;
  color:#fff;
  text-align: center;
  font-family: font3;
  font-size: 1.2rem;
}

button:hover
{
  opacity: 0.5
}

.optionBox
{
  width: 100%;
  height: 45px;
}

.optionBox .box
{
  width: 50%;
  height: 45px;
  background-color: #eee;
  float: left;
  line-height: 45px;
  text-align: center;
  font-size: 1.1rem;
}

.boxActive
{ 
  background-color: #ffc3cd !important;
}

.specTable
{
  width: 100%;
  border: 2px #ffc3cd solid;
}

.specTable tr td
{
  border: 2px #ffc3cd solid;
  padding: 5px;
  text-align: center;
}

.tableHead
{
  background-color: #ffc3cd;
}

.discountPrice
{
  font-family: font2;
  font-size: 1.3rem;
}
.discountBox
{
  padding-left: 10px;
  padding-right: 10px;
  height: 35px;
  display: inline-block;
  background-color: #ff3c3c;
  margin-top: 10px;
  line-height: 35px;
  color: #fff;
  border-radius: 35px;
}
</style>
