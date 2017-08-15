<template>
	<div class="element">
		<button class="ui labeled icon button font3" v-on:click="back">
		  <i class="left arrow icon"></i>
		  ย้อนกลับ
		</button>

		<div>
			<div class="component">
				<div class="title">รูปภาพ</div>
			</div>
			<div class="row">
				<div class="col-md-3" v-for="(image, index) in products.image">
					<img :src="image.image" class="imgQuery" v-on:click="deleteImage(index)">
				</div>
				<div class="col-md-3">
					<label for="filUploadImage">
						<img src="../../../assets/img/addImg.jpg" class="imgAdd">
					</label>
					<input type="file" name="filUploadImage" id="filUploadImage" class="hidden" v-on:change="onFileChange" style="display: none;">
				</div>
			</div>
		</div>
		<hr>
		<div>
			<div class="component">
				<div class="title">ข้อมูล</div>
			</div>
			<div class="element">
				<div class="ui form">
					<div class="field">
					    <label>รหัสสินค้า</label>
					    <input type="text" class="font2" v-model="sku">
					</div>
					<div class="field">
					    <label>ชื่อสินค้า</label>
					    <input type="text" class="font2" v-model="name">
					</div>
					<div class="field">
					    <label>ราคา</label>
					    <input type="number" class="font2" v-model="price">
					</div>
					<div class="field">
						<label>รายละเอียดสินค้า</label>
						<textarea class="font2" v-model="detail"></textarea>
					</div>
					<div class="two fields">
						<div class="field">
						    <label>หมวดหมู่หลัก</label>
						    <select class="ui dropdown font2" v-model="lv1">
						    	<option v-for="category in categorys">
						    		{{category['.key']}}
						    	</option>
						    </select>
						</div>
						<div class="field">
						    <label>หมวดหมู่ย่อย</label>
						    <select class="ui dropdown font2" v-model="lv2">
						    	<option v-for="(subcat, index) in getlv2">
						    		{{index}}
						    	</option>
						    </select>
						</div>
					</div>
					<div class="field">
						<button class="ui primary button font3" v-on:click="saveproduct">บันทึก</button>
					</div>
				</div>
			</div>
		</div>
		<hr>
		<div>
			<div class="component">
				<div class="title">ขนาด</div>
			</div>
			<div class="element">
				<table class="ui celled table">
				  <thead>
				    <tr class="headTitle">
				    	<th> </th>
					    <th>ใหล่กว้าง</th>
					    <th>รักแร้</th>
					    <th>รอบอก</th>
					    <th>รอบเอว</th>
					    <th>สะโพกใหญ่</th>
					    <th>แขนยาว</th>
					    <th>เสื้อยาว</th>
					    <th>กระโปรงยาว</th>
					    <th>กางเกงยาว</th>
					    <th>ปลายขายาว</th>
				  	</tr>
				  </thead>
				  <tbody>
				    <tr v-for="(size, index) in sizes">
				      <td>{{size['.key']}} 
						<i class="erase icon" v-on:click="deleteSize(size['.key'])"></i></td>
				      <td>
				      	<sizeBound :size="size['.key']" sof="s1"></sizeBound>
				      </td>
				      <td>
				      	<sizeBound :size="size['.key']" sof="s2"></sizeBound>
				      </td>
				      <td>
				      <sizeBound :size="size['.key']" sof="s3"></sizeBound>
				      </td>
				      <td>
				      	<sizeBound :size="size['.key']" sof="s4"></sizeBound>
				      </td>
				      <td>
				      	<sizeBound :size="size['.key']" sof="s5"></sizeBound>
				      </td>
				      <td>
				      	<sizeBound :size="size['.key']" sof="s6"></sizeBound>
				      </td>
				      <td>
				      	<sizeBound :size="size['.key']" sof="s7"></sizeBound>
				      </td>
				      <td>
				      	<sizeBound :size="size['.key']" sof="s8"></sizeBound>
				      </td>
				      <td>
				      	<sizeBound :size="size['.key']" sof="s9"></sizeBound>
				      </td>
				      <td>
				      	<sizeBound :size="size['.key']" sof="s10"></sizeBound>
				      </td>
				    </tr>
				  </tbody>
				  <tfoot>
				    <tr>
				    	<th colspan="10">
				    		<div class="ui action input font3">
				    			<select class="ui dropdown font2" v-model="thisSize">
								  <option value="">ขนาด</option>
								  <option value="SSS">SSS</option>
								  <option value="SS">SS</option>
								  <option value="S">S</option>
								  <option value="M">M</option>
								  <option value="L">L</option>
								  <option value="XL">XL</option>
								  <option value="XXL">XXL</option>
								  <option value="XXXL">XXXL</option>
								  <option value="Freesize">Freesize</option>
								  <option value="อื่นๆ">อื่นๆ</option>
								</select>
								<button v-on:click="createSize" class="ui button font3">เพิ่มขนาด</button>
							</div>
				    	</th>
				  	</tr>
				  </tfoot>
				</table>
			</div>
		</div>


	</div>
</template>
<script>
import db from '../../../modules/firebase.js'
import sizeBound from '../components/sizeBound.vue'
import fire from 'firebase'
export default {
  name: 'hello',
  data () {
    return {
      name: '',
      detail: '',
      lv1: '',
      lv2: '',
      image: '',
      sku: '',
      size: '',
      price: 0,
      thisSize: '',
      priority: 0
    }
  },
  created () {
    this.name = this.products.name
    this.detail = this.products.detail
    this.lv1 = this.products.lv1
    this.lv2 = this.products.lv2
    this.price = this.products.price
    this.sku = this.products.sku
  },
  firebase () {
    return {
      products: {
        source: db.database().ref('product/' + this.$store.backViewProduct),
        asObject: true
      },
      sizes: {
        source: db.database().ref('product/' + this.$store.backViewProduct + '/size').orderByChild('priority')
      },
      categorys: {
        source: db.database().ref('category')
      }
    }
  },
  computed: {
    getlv1 () {
      var lv1 = this.lv1
      return this.categorys.filter(function (item) {
        return item['.key'] === lv1
      })
    },
    getlv2 () {
      return this.getlv1[0]
    }
  },
  methods: {
    deleteImage (thisImagekey) {
      db.database().ref('product/' + this.$store.backViewProduct + '/image/' + thisImagekey).remove()
    },
    createSize () {
      if (this.thisSize !== '') {
        if (this.thisSize === 'SSS') {
          this.priority = 1
        } else if (this.thisSize === 'SS') {
          this.priority = 2
        } else if (this.thisSize === 'S') {
          this.priority = 3
        } else if (this.thisSize === 'M') {
          this.priority = 4
        } else if (this.thisSize === 'L') {
          this.priority = 5
        } else if (this.thisSize === 'XL') {
          this.priority = 6
        } else if (this.thisSize === 'XXL') {
          this.priority = 7
        } else if (this.thisSize === 'XXXL') {
          this.priority = 8
        } else if (this.thisSize === 'Freesize') {
          this.priority = 9
        } else {
          this.priority = 10
        }
        db.database().ref('product/' + this.$store.backViewProduct + '/size/' + this.thisSize).set({
          date: Date.now(),
          s1: '',
          s2: '',
          s3: '',
          s4: '',
          s5: '',
          s6: '',
          s7: '',
          s8: '',
          s9: '',
          s10: '',
          priority: this.priority
        })
      } else {
        alert('กรุณาระบุขนาดก่อน')
      }
    },
    deleteSize (sizekey) {
      db.database().ref('product/' + this.$store.backViewProduct + '/size/' + sizekey).remove()
    },
    back () {
      this.$store.backViewProduct = ''
    },
    saveproduct () {
      if (this.products.image) {
        var item
        item = {
          sku: this.sku,
          name: this.name,
          detail: this.detail,
          lv1: this.lv1,
          lv2: this.lv2,
          price: this.price,
          date: this.products.date,
          feature: this.products.feature,
          show: this.products.show,
          image: this.products.image,
          size: this.products.size,
          promotion: this.products.promotion
        }
      } else {
        item = {
          sku: this.sku,
          name: this.name,
          detail: this.detail,
          lv1: this.lv1,
          lv2: this.lv2,
          price: this.price,
          date: this.products.date,
          feature: this.products.feature,
          show: this.products.show,
          size: this.products.size,
          promotion: this.products.promotion
        }
      }
      this.$firebaseRefs.products.set(item)
      alert('บันทึกสำเร็จ')
    },
    uploadMoomImage: function (type) {
      this.uploadTask(this.$store.backViewProduct)
    },
    uploadTask: function (pkey) {
      this.$session.start()
      var file = document.getElementById('filUploadImage').files[0]
      var randomText = ''
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (var i = 0; i < 20; i++) {
        randomText += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      var fileName = 'product_' + randomText
      var storageRef = fire.storage().ref()
      var imageRef = storageRef.child('product/' + fileName)
      var uploadTask = imageRef.put(file)
      uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
      }, function (error) {
        console.log(error)
      }, function () {
        var downloadURL = uploadTask.snapshot.downloadURL
        fire.database().ref('product/' + pkey + '/image').push({
          image: downloadURL,
          date: Date.now()
        })
        alert('ลงรูปสำเร็จ')
      })
      this.image = ''
      this.imageModal = false
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0])
      this.uploadMoomImage()
    },
    createImage (file) {
      var image = new Image()
      console.log(image)
      var reader = new FileReader()
      var vm = this
      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (e) {
      this.image = ''
    }
  },
  components: {
    sizeBound
  }
}
</script>
<style scoped>
	.productBox
	{
		border:1px #bbb solid;
		padding: 10px;
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
	}
	textarea
	{
		resize: none !important;
	}
	.title
	{
		font-family: font4;
		font-size: 1.8rem;
	}
	.imgAdd
	{
		border-radius: 5px;
		width: 100%;
	}
	.imgQuery
	{
		border-radius: 5px;
		width: 100%;
		border:2px #ec5781 solid;
	}
	hr
	{
		background-color: #ec5781
	}
	.inputSize
	{
		width: 50px;
		outline: none;
		border:1px #eee solid;
	}
	.inputSize:focus
	{
		background-color: #eee;
	}
	.headTitle th
	{
		font-size: 0.9rem;
	}
</style>
