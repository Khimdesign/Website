<template>
	<div v-if="product.name" class="element">
		<div class="productBox">
			<div class="deleteModal" v-if="deleteBut == true">
				<div class="front">
					<div class="butt">
						<button v-on:click="deleteBut = false" class="ui button font2">ยกเลิก</button>
						<button class="ui button red font2" v-on:click="deleteProduct">ลบ</button>
					</div>
				</div>
				<div class="back"></div>
			</div>
			<div class="row">
				<div class="col-md-3">
					<img src="../../../assets/img/noimage.jpg" width="100%" v-if="countImage == false">
					<div v-for="(img, index, key) in firstImage">
						<img width="100%" :src="img.image" v-if="key == 0" class="addBorder">
					</div>
				</div>
				<div class="col-md-9">
					<div class="productDetail">
						<span class="font3">ชื่อสินค้า :</span> 
						<span class="font2">{{product.name}} ({{product.sku}})</span>
					</div>
					<div class="productDetail">
					</div>
					<div class="productDetail">
						<span class="font3">หมวดหมู่หลัก :</span> 
						<span class="font2">{{product.lv1}}</span>
						,
						<span class="font3">หมวดหมู่ย่อย :</span> 
						<span class="font2">{{product.lv2}}</span>
					</div>
					<div class="element">
						<div class="inline field">
					      <div class="toggle" v-on:click="productShow">
					      	<transition name="fade">
					      	<div class="innerToggle" v-if="product.show == true"></div>
					      	</transition>
					      </div>
					      <div class="texttoggle">แสดงสินค้า</div>
					  </div>
					</div>
					<div class="element">
						<select class="font2 selectPro" v-model="promo" v-on:change="changePromo">
							<option value="0">ไม่มีโปรโมชัน</option>
							<option value="10">ลดราคา 10%</option>
							<option value="20">ลดราคา 20%</option>
							<option value="30">ลดราคา 30%</option>
							<option value="40">ลดราคา 40%</option>
							<option value="50">ลดราคา 50%</option>
							<option value="60">ลดราคา 60%</option>
							<option value="70">ลดราคา 70%</option>
							<option value="80">ลดราคา 80%</option>
							<option value="90">ลดราคา 90%</option>
						</select>
					</div>
					<div class="productDetail">
						<button v-on:click="deleteBut = true" class="ui button font2 red inverted">ลบ</button>
						<button class="ui button font2 primary" v-on:click="viewProduct">ดู/แก้ไข</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import db from '../../../modules/firebase.js'
export default {
  name: 'hello',
  data () {
    return {
      deleteBut: false,
      promo: 0
    }
  },
  props: ['product', 'getkey'],
  created () {
    this.promo = this.product.promotion
  },
  methods: {
    productShow () {
      db.database().ref('product/' + this.getkey + '/show').transaction(function (show) {
        show = !show
        return show
      })
    },
    changePromo () {
      var promo = this.promo
      db.database().ref('product/' + this.getkey + '/promotion').transaction(function (promotion) {
        promotion = promo
        return promotion
      })
    },
    deleteProduct (thiskey, thiscat) {
      db.database().ref('product/' + this.getkey).remove()
    },
    viewProduct () {
      this.$store.backViewProduct = this.getkey
    }
  },
  computed: {
    countImage () {
      if (this.product.image) {
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
    }
  },
  components: {
  }
}
</script>
<style scoped>
	.productBox
	{
		border:1px #bbb solid;
		padding: 10px;
		position: relative;
		overflow: hidden;
	}
	.product
	{
		margin-top: 10px;
		margin-bottom: 10px;
		border: 2px #bbb solid;
		padding: 10px;
	}
	.productDetail
	{
		margin-bottom: 5px;
		text-overflow: ellipsis;
		white-space: nowrap;
  		overflow: hidden;
	}
	.toggle
	{
		width: 18px;
		height: 18px;
		background-color: #fff;
		display: inline-block;
		vertical-align: middle;
		border:1px #aaa solid;
		border-radius: 4px;
	}
	.texttoggle
	{
		font-family: font2;
		display: inline-block;
		line-height: 20px;
		height: 20px;
	}
	.innerToggle
	{
		width: 12px;
		height: 12px;
		margin: 2px;
		border-radius: 3px;
		background-color: #ff738a;
	}
	.addBorder
	{
		border:1px #bbb solid;
	}
	.deleteModal
	{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 1000;
		margin-left: -9.5px;
		margin-top: -10px;
	}
	.deleteModal .front
	{
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 100;
	}
	.deleteModal .back
	{
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 10;
		background-color: #000;
		opacity: 0.5;
	}
		.butt
		{
			width: 100%;
			height: 45px;
			position: absolute;
			top: 50%;
			margin-top: -22.5px;
			text-align: center;
		}
	.selectPro
	{
		height: 40px;
		margin-bottom: 10px;
		outline: none;
	}
</style>
