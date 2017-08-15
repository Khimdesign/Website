<template>
	<div>
		<div class="ui form" style="width: 100%">
			<label>หัวข้อกระทู้</label>
			<div class="field">
				<input type="text" v-model="title">
			</div>
			<label>เนื้อหา</label>
			<div class="field">
				<textarea spellcheck="false" v-model="content"></textarea>
			</div>
			<div class="field">
				<button class="ui labeled icon button font4" v-on:click="pushW">
				  <i class="right plus icon"></i>
				  เพิ่มกระทู้
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import db from '../../../modules/firebase.js'
export default {
  name: 'Addwebboard',
  data () {
    return {
      title: '',
      content: '',
      date: ''
    }
  },
  created () {
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = dd + '/' + mm + '/' + yyyy
    this.date = today
  },
  methods: {
    pushW () {
      if (this.title === '' || this.content === '') {
        alert('โปรดกรอกข้อมูลให้ถูกต้อง')
      } else {
        db.database().ref('webboard').push({
          title: this.title,
          content: this.content,
          date: this.date,
          postBy: 'Admin',
          view: 0
        })
        alert('เพิ่มข้อมูลสินค้าสำเร็จ')
        this.title = ''
        this.content = ''
      }
    }
  }
}
</script>
