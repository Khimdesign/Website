<template>
	<div>
		<!-- <a href="https://croppola.com/" target="_blank">Crop Image</a> -->
		<div class="Dashtitle">
			เพิ่มสินค้า
		</div>
		<div>
			<div class="ui form" style="width: 100%">
				<table class="ui very basic collapsing celled table" style="width: 100%">
					<tbody>
						<tr>
							<td width="25%">
								<h4 class="ui image header font2">
								  รหัสสินค้า
								</h4>
							</td>
							<td>
								<div class="field">
									<input type="text" v-model="sku">
								</div>
							</td>
						</tr>
						<tr>
							<td width="25%">
								<h4 class="ui image header font2">
								  ชื่อสินค้า
								</h4>
							</td>
							<td>
								<div class="field">
									<input type="text" v-model="name">
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<h4 class="ui image header font2">
								  หมวดหมู่หลัก
								</h4>
							</td>
							<td>
								<div class="field">
									<select v-model="lv1" class="font2" v-on:change="lv2=''">
										<option :value="index" v-for="(category, index) in categorys">
											{{index}}
										</option>
									</select>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<h4 class="ui image header font2">
								  หมวดหมู่ย่อย
								</h4>
							</td>
							<td>
								<div class="field">
									<select v-model="lv2" class="font2">
										<option :value="index" v-for="(cat2, index) in categorys[lv1]">
											{{index}}
										</option>
									</select>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<h4 class="ui image header font2">
								  รายละเอียดสินค้า
								</h4>
							</td>
							<td>
								<div class="field">
									<textarea spellcheck="false" v-model="detail"></textarea>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<h4 class="ui image header font2">
								  ราคา
								</h4>
							</td>
							<td>
								<div class="field">
									<input type="number" v-model="price">
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<button v-on:click="pushProduct" class="ui right labeled icon button font4" type="submit">
				  <i class="right plus icon"></i>
				  เพิ่มสินค้า
				</button>
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
      lv1: '',
      lv2: '',
      name: '',
      detail: '',
      price: 0,
      sku: ''
    }
  },
  firebase () {
    return {
      categorys: {
        source: db.database().ref('category'),
        asObject: true
      }
    }
  },
  methods: {
    pushProduct () {
      if (this.lv1 === '' || this.lv1 === '.key') {
        alert('โปรดกรอกข้อมูลหมวดหมู่หลักให้ถูกต้อง')
      } else if (this.lv2 === '' || this.lv2 === '.key') {
        alert('โปรดกรอกข้อมูลหมวดหมู่ย่อยให้ถูกต้อง')
      } else if (this.lv2 === 'ยังไม่มีข้อมูล') {
        alert('หมวดหมู่นี้ยังไม่มีหมวดหมู่ย่อย ไม่สามารถเลือกได้')
      } else {
        db.database().ref('product').push({
          lv1: this.lv1,
          lv2: this.lv2,
          name: this.name,
          date: Date.now(),
          detail: this.detail,
          feature: false,
          price: this.price,
          show: true,
          sku: this.sku
        })
        alert('เพิ่มข้อมูลสินค้าสำเร็จ')
      }
    }
  },
  components: {
  }
}
</script>
