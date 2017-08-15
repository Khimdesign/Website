<template>
	<div>
		<div class="Dashtitle">
			Payment Methods / ช่องทางชำระเงิน
		</div>
    <div class="component">
      <div class="ui raised segment">
    		<div class="ui form">
          <div class="ui input">
            <input type="text" class="font2" placeholder="ธนาคาร" v-model="bank">
          </div>
          <div class="ui input">
            <input type="text" class="font2" placeholder="เลขบัญชี" v-model="number">
          </div>
          <div class="ui input">
            <input type="text" class="font2" placeholder="ชื่อ - นามสกุล" v-model="name">
          </div>
          <button class="ui primary button" v-on:click="save">
            Save
          </button>
        </div>
      </div>
    </div>
    <div class="component">
      <div class="row">
        <div class="col-md-6" v-bind:key="pay" v-for="(pay, index) in pays">
          <div class="ui segment">
            ธนาคาร: {{pay.bank}}<br>
            เลขที่บัญชี: {{pay.number}}<br>
            ชื่อ-นามสกุล: {{pay.name}}<br>
            <button style="margin-top: 5px;" v-on:click="deletePay(pay['.key'])" class="ui button font2 red inverted">
              ลบ
            </button>
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
      bank: '',
      number: '',
      name: ''
    }
  },
  firebase () {
    return {
      pays: {
        source: db.database().ref('payment')
      }
    }
  },
  created () {
    this.aboutus = this.getabouts['.value']
  },
  methods: {
    save () {
      db.database().ref('payment').push({
        bank: this.bank,
        number: this.number,
        name: this.name,
        date: Date.now()
      })
    },
    deletePay (thiskey) {
      db.database().ref('payment/' + thiskey).remove()
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

