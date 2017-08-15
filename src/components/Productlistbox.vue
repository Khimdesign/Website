<template>
  <div class="productListBox">
    <div class="delete t3" v-on:click="deleteThis" v-if="remove == 'true'">
      <i class="trash outline large icon"></i>
      ลบสินค้า
    </div>
    <div class="row">
      <div class="col-md-2">
        <img src="../assets/img/noimage.jpg" class="cartImage t2" v-if="countImage == false">
        <div v-if="countImage == true">
          <img :src="image.image" class="cartImage t2" v-for="(image, index, key) in products.image" v-bind:key="image" v-if="key == 0">
        </div>
      </div>
      <div class="col-md-4">
        <div class="cartName">{{products.name}}</div>
        รหัสสินค้า /item code : {{products.sku}}<br>
        ขนาด /size : {{product.size}}
      </div>
      <div class="col-md-2">
        <div v-if="!products.promotion || products.promotion == 0">
          ฿ {{products.price}}
        </div>
        <div v-if="products.promotion > 0">
          <div class="discount">฿ {{products.price}}</div>
          <div class="redfont">฿ {{((100-products.promotion)*products.price)/100}}</div>
        </div>
      </div>
      <div class="col-md-2">
        <!-- <div class="spinner">
          <div class="left t2" v-on:click="qtyMinus">-</div>
          <div class="center">{{product.qty}}</div>
          <div class="right t2" v-on:click="qtyPlus">+</div>
        </div> -->
        {{product.qty}} ชิ้น
      </div>
      <div class="col-md-2">
        <div class="rightText">฿ {{subTotal}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../modules/firebase.js'
export default {
  name: 'hello',
  data () {
    return {
      productId: this.product.productId
    }
  },
  firebase () {
    return {
      products: {
        source: db.database().ref('product/' + this.productId),
        asObject: true
      }
    }
  },
  components: {
  },
  methods: {
    deleteThis () {
      this.$session.set('usercart', '')
      location.reload()
    },
    qtyMinus () {
      if (this.product.qty > 1) {
        var thisproduct = this.product
        var newQty = thisproduct.qty
        if (newQty !== 1) {
          newQty--
          var cartitem = {
            size: thisproduct.size,
            date: thisproduct.date,
            qty: newQty,
            productId: thisproduct.productId,
            id: thisproduct.id
          }
          var whole = this.$session.get('usercart')
          var copyObj = []
          for (var i = 0; i < whole.length; i++) {
            if (whole[i].id === this.product.id) {
              copyObj.push(cartitem)
            } else {
              copyObj.push(whole[i])
            }
          }
          this.$session.set('usercart', copyObj)
          location.reload()
        }
      }
    },
    qtyPlus () {
      var thisproduct = this.product
      var newQty = thisproduct.qty
      newQty++
      var cartitem = {
        size: thisproduct.size,
        date: thisproduct.date,
        qty: newQty,
        productId: thisproduct.productId,
        id: thisproduct.id
      }
      var whole = this.$session.get('usercart')
      var copyObj = []
      for (var i = 0; i < whole.length; i++) {
        if (whole[i].id === this.product.id) {
          copyObj.push(cartitem)
        } else {
          copyObj.push(whole[i])
        }
      }
      this.$session.set('usercart', copyObj)
      location.reload()
    }
  },
  props: ['product', 'remove'],
  computed: {
    countImage () {
      if (this.products.image) {
        return true
      } else {
        return false
      }
    },
    subTotal () {
      if (this.products.promotion) {
        var price = ((100 - parseInt(this.products.promotion)) / 100) * parseInt(this.products.price)
        return parseInt(price) * parseInt(this.product.qty)
      } else {
        return parseInt(this.products.price) * parseInt(this.product.qty)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.delete
{
  width: 110px;
  height: 45px;
  position: absolute;
  z-index: 100;
  right: 0px;
  bottom: 20px;
  border: 2px #ffc3cd solid;
  line-height: 45px;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
}
.delete:hover
{
  background-color: #ffc3cd;
  color:#651b28;
  cursor: pointer;
}
</style>
