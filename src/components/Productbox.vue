<template>
  <div class="productCon t2" v-on:click="viewThisProduct">
    <div class="promotion shadow4" v-if="product.promotion!=0">
      -{{product.promotion}}%
    </div>
    <img src="../assets/img/noimage.jpg" width="100%" v-if="countImage == false">
    <div v-for="(img, index, key) in firstImage">
      <img width="100%" :src="img.image" v-if="key == 0">
    </div>
    <div class="Content">
      <div class='productPrice' v-if="product.promotion == 0">฿ {{product.price}}</div>
      <div class='productPrice' v-if="product.promotion != 0">
        <div class="discountPrice discount">
          ฿ {{product.price}}
        </div>
        ฿ {{discountPrice}}
      </div>
      <div class='productName'>{{product.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Productbox',
  data () {
    return {
    }
  },
  props: ['product'],
  computed: {
    countImage () {
      if (this.product['image']) {
        return true
      } else {
        return false
      }
    },
    firstImage () {
      if (this.product.image) {
        var imageObj = this.product['image']
        return imageObj
      } else {
        return ''
      }
    },
    discountPrice () {
      var price = parseInt(this.product.price)
      var percent = parseInt(this.product.promotion)
      var total = price * (100 - percent) / 100
      return total
    }
  },
  methods: {
    viewThisProduct () {
      this.$router.push({
        name: 'Viewproduct',
        params: {
          productId: this.product['.key']
        }
      })
    }
  }
}
</script>

<style scoped>
.productCon
{
  width: 100%;
  border:2px #ff9bad solid;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  margin-bottom: 15px;
}

.productCon:hover
{
  -webkit-box-shadow: 0px 15px 30px -2px rgba(0,0,0,0.30);
  -moz-box-shadow: 0px 15px 30px -2px rgba(0,0,0,0.30);
  box-shadow: 0px 15px 30px -2px rgba(0,0,0,0.30);
}

img{
  border-bottom:2px #ff9bad solid;
}
.Content
{
  padding: 15px;
}
.productName
{
  width: 100%;
  color:#651b28;
  text-align: center;
  font-family: font3;
  font-size: 1.1rem;
  line-height: 1.1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.productPrice
{
  width: 100%;
  text-align: center;
  font-family: font4;
  font-size: 1.4rem;
  color:#651b28;
}
.discountPrice
{
  font-family: font2;
  font-size: 1.2rem;
}
.promotion
{
  position: absolute;
  height: 40px;
  background-color: #ff5050;
  margin-top: 10px;
  right: 10px;
  line-height: 40px;
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
  color: #fff;
  font-family: font3;
  font-size: 1.2rem;
  border-radius: 3px;
}
</style>
