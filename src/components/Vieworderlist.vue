<template>
  <div class="orderBox">
    <div class="row">
      <div class="col-md-2">
        <img src="../assets/img/noimage.jpg" class="cartImage t2" v-if="countImage == false">
        <div v-if="countImage == true">
          <img :src="image.image" class="cartImage t2" v-for="(image, index, key) in products.image" v-bind:key="image" v-if="key == 0">
        </div>
      </div>
      <div class="col-md-4">
        <div class="productName">{{products.name}}</div>
        รหัส SKU : {{products.sku}}
        <br>
        ไซส์ : {{data.size}}
      </div>
      <div class="col-md-2">
        ราคาต่อชิ้น<br>
        <div class="discount">{{data.price}}</div>
        <div class="redfont">{{((100 - parseInt(data.promotion))/100)*parseInt(data.price)}}</div>
      </div>
      <div class="col-md-2">
        จำนวน<br>
        {{data.qty}}
      </div>
      <div class="col-md-2">
        ราคารวม<br>
        {{(((100 - parseInt(data.promotion))/100)*parseInt(data.price)) * parseInt(data.qty)}}
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
    }
  },
  firebase () {
    return {
      products: {
        source: db.database().ref('product/' + this.data.pid),
        asObject: true
      }
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
    subTotal () {
      if (this.products.promotion) {
        var price = ((100 - parseInt(this.products.promotion)) / 100) * parseInt(this.products.price)
        return parseInt(price) * parseInt(this.product.qty)
      } else {
        return parseInt(this.products.price) * parseInt(this.product.qty)
      }
    }
  },
  props: ['data']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.orderBox
{
  width: 100%;
  border: 2px #ffa1a1 solid;
  margin-bottom: 20px;
  padding: 10px;
}
.productName
{
  font-size: 1.2rem;
  font-family: font4;
}
</style>
