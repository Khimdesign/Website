<template>
	<div>
		<div class="Dashtitle">
			สินค้าทั้งหมด
		</div>
		<div class="component">
			<div v-for="(product, index) in products">
				<productList :product = "product" :getkey="index"></productList>
			</div>
		</div>
	</div>
</template>

<script>
import db from '../../../modules/firebase.js'
import productList from '../../Back/components/productList.vue'
export default {
  name: 'hello',
  data () {
    return {
      lv1: '',
      lv2: '',
      name: '',
      detail: ''
    }
  },
  firebase () {
    return {
      products: {
        source: db.database().ref('product'),
        asObject: true
      }
    }
  },
  methods: {
    pushProduct () {
    }
  },
  components: {
    productList
  }
}
</script>
<style scoped>
</style>
