<template>
	<div>
		<div class="Dashtitle">
			Shipping Fee / ค่าจัดส่งสินค้า
		</div>
    <div class="component">
      <label>ค่าจัดส่งสินค้าต่อครัง: {{fees.fee}} บาท</label><br>
      <div class="ui input">
        <input type="text" v-model="fee" placeholder="เปลี่ยนราคาค่าจัดส่ง">
      </div>
      <br>
    </div>
    <div class="component">
      <button class="ui primary button" v-on:click="saveUser">
        Save
      </button>
    </div>
	</div>
</template>

<script>
import db from '../../../modules/firebase.js'
export default {
  name: 'hello',
  data () {
    return {
      fee: ''
    }
  },
  firebase () {
    return {
      fees: {
        source: db.database().ref('fee'),
        asObject: true
      }
    }
  },
  created () {
    this.fee = this.fees.fee
  },
  methods: {
    saveUser () {
      if (this.pass1 !== this.pass2) {
        alert('โปรดใส่ password ให้ตรงกัน')
      } else {
        db.database().ref('fee').set({
          fee: this.fee
        })
        alert('บันทึกแล้ว')
        this.fee = this.fees.fee
      }
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Dashtitle
  {
    width: 100%;
    font-family: font4;
    font-size: 1.6rem;
  }
  .eraseBox
  {
    cursor: pointer;
  }
  .eraseBox:hover
  {
    opacity: 0.5
  }
</style>

