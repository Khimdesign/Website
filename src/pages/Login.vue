<template>
  <div>
  <div class="container page">
    <div class="col-md-10 offset-md-1">
      <div class="row">
        <div class="col-md-6">
          <h4 class="font4">
            ลงชื่อเข้าใช้
          </h4>
          <form>
            <div class="element">
              <label>E-mail Address</label>
              <input type="text" class="inputText t2" v-model="email">
            </div>
            <div class="element">
              <label>Password</label>
              <input type="password" class="inputText t2" v-model="pass">
            </div>
            <div class="component rightText">
              <button class="inputButton t2" v-on:click="login">ลงชื่อเข้าใช้งาน</button>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <h4 class="font4">
            สมัครสมาชิก
          </h4>
          <div class="element">
            สมัครสมาชิก เพื่อเป็นเพิ่มประวัติการจัดส่งสินค้าได้ง่ายและรวดเร็วยิ่งขึ้น
          </div>
          <div class="component rightText">
            <router-link to="register">
              <button class="inputButton outline t2">สมัครสมาชิก</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
  </template>
</template>

<script>
import Navigate from '../components/Navigate.vue'
import db from '../modules/firebase.js'
export default {
  name: 'hello',
  data () {
    return {
      email: '',
      pass: '',
      uid: ''
    }
  },
  methods: {
    login () {
      db.auth().signInWithEmailAndPassword(this.email, this.pass).then(function () {
      }).catch(function (error) {
        var errorCode = error.message
        console.log(errorCode)
      })
      this.$session.start()
      var user = db.auth().currentUser
      if (user) {
        this.$session.set('uid', user.uid)
        alert('ทำการ login สำเร็จ')
        this.$router.push({
          name: 'Home'
        })
      } else {
        alert('ทำการ login ไม่สำเร็จ')
      }
    },
    setuid (uid) {
      // if (uid) {
      //   this.$session.start()
      //   this.$session.set('fbid', uid)
      //   alert('Login สำเร็จ!')
      //   this.$router.push({
      //     name: 'Home'
      //   })
      // } else {
      //   alert('Login ไม่สำเร็จ')
      // }
      alert(uid)
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
