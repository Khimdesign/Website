<template>
  <div>
  <div class="container page">
    <div class="col-md-6 offset-md-3">
        <h4 class="font4">
          สมัครสมาชิก
        </h4>
        <form>
          <div class="element">
            <label>E-mail Address / อีเมล*</label>
            <input type="text" class="inputText t2" v-model="email">
          </div>
          <div class="element">
            <label>Password / พาสเวิร์ด*</label>
            <input type="password" class="inputText t2" v-model="pass1">
          </div>
          <div class="element">
            <label>Confirm Password / ยืนยันพาสเวิร์ด*</label>
            <input type="password" class="inputText t2" v-model="pass2">
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="element">
                <label>Firstname / ชื่อจริง*</label>
                <input type="text" class="inputText t2" v-model="first">
              </div>
            </div>
            <div class="col-md-6">
              <div class="element">
                <label>Lastname / นามสกุล*</label>
                <input type="text" class="inputText t2" v-model="last">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="element">
                <label>Mobile Phone / เบอร์โทรศัพท์มือถือ*</label>
                <input type="number" class="inputText t2" v-model="mobile">
              </div>
            </div>
            <div class="col-md-6">
              <div class="element">
                <label>Cell Phone / เบอร์โทรศัพท์บ้าน</label>
                <input type="number" class="inputText t2" v-model="cell">
              </div>
            </div>
          </div>
          <div class="component rightText">
            <button class="inputButton t2" v-on:click="Register">สมัครสมาชิก</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Navigate from '../components/Navigate.vue'
import db from '../modules/firebase.js'
export default {
  name: 'hello',
  data () {
    return {
      email: '',
      pass1: '',
      pass2: '',
      first: '',
      last: '',
      mobile: '',
      cell: ''
    }
  },
  methods: {
    Register () {
      if (this.first === '' && this.last === '') {
        alert('โปรดกรอกชื่อหรือนามสกุลให้ครบถ้วน')
      } else if (this.mobile === '') {
        alert('โปรดกรอกโทรศัพท์มือถือให้เป็นตัวเลข')
      } else if (this.pass1 !== this.pass2) {
        alert('โปรดยืนยันพาสเวิร์ดให้ถูกต้อง')
      } else {
        this.PushUser(this.email, this.pass1, this.first, this.last, this.mobile, this.cell)
      }
    },
    PushUser: function (email, password, first, last, mobile, cell) {
      db.auth().createUserWithEmailAndPassword(email, password).then(function () {
        var user = db.auth().currentUser
        console.log(user)
        db.database().ref('user/' + user.uid).set({
          email: email,
          first: first,
          last: last,
          mobile: mobile,
          cell: cell,
          address: '',
          province: '',
          city: '',
          district: '',
          zipcode: ''
        }).then(function () {
          alert('สมัครสมาชิกสำเร็จ')
          window.location.href = '/'
        })
      }).catch(function (error) {
        var errorCode = error.message
        alert('สมัครสมาชิกไม่สำเร็จ' + errorCode)
      })
    }
  },
  components: {
    Navigate
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head
{
  font-family: font4;
}
</style>
