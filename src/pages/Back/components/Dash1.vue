<template>
	<div>
		<div class="Dashtitle">
			Orderทั้งหมด
		</div>
		<div class="component">
			<div v-for="order in orders">
				<Backorderlist :data = "order"></Backorderlist>
			</div>
		</div>
	</div>
</template>

<script>
import db from '../../../modules/firebase.js'
import Backorderlist from '../../Back/components/Backorderlist.vue'
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
      orders: {
        source: db.database().ref('order')
      }
    }
  },
  methods: {
    pushProduct () {
    }
  },
  components: {
    Backorderlist
  }
}
</script>
<style scoped>
</style>
