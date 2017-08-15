<template>
  <div>
    <div class="Dashtitle">
      Contact Methods / ช่องทางติดต่อ
    </div>
    <div class="component">
      <div class="ui raised segment">
        <div class="ui form">
          <div class="ui input">
            <select class="ui dropdown font2" v-model="type">
              <option value="">ช่องทางที่ต้องการเพิ่ม</option>
              <option value="Facebook">Facebook</option>
              <option value="Line">Line</option>
              <option value="Email">Email</option>
              <option value="เบอร์โทรศัพท์มือถือ">เบอร์โทรศัพท์มือถือ</option>
              <option value="เบอร์โทรศัพท์บ้าน">เบอร์โทรศัพท์บ้าน</option>
            </select>
          </div>
          <div class="ui input">
            <input type="text" class="font2" placeholder="ข้อมูล" v-model="data">
          </div>
          <button class="ui primary button" v-on:click="save">
            Save
          </button>
        </div>
      </div>
    </div>
    <div class="component">
        <div v-bind:key="contact" class="element" v-for="(contact, index) in contacts">
          <div class="ui segment">
            <span class="font4">{{contact.type}} :</span> {{contact.data}} 
            <button style="margin-top: 5px;" v-on:click="deletePay(contact['.key'])" class="ui button font2 red inverted">
              ลบ
            </button>
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
      type: '',
      data: ''
    }
  },
  firebase () {
    return {
      contacts: {
        source: db.database().ref('contact')
      }
    }
  },
  created () {
    this.aboutus = this.getabouts['.value']
  },
  methods: {
    save () {
      db.database().ref('contact').push({
        type: this.type,
        data: this.data,
        date: Date.now()
      })
    },
    deletePay (thiskey) {
      db.database().ref('contact/' + thiskey).remove()
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

