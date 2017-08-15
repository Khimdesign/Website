<template>
  <div class="Intro">
    <div class="front">
        <div class="title">Admin Login</div>
        <input type="text" v-model="user">
        <input type="password" v-model="pass">
        <div class='row'>
          <div class='col-md-6'>
            <router-link to="/">
              <button class="t2">Back</button>
            </router-link>
          </div>
          <div class='col-md-6'>
            <button class="t2" v-on:click="loginAdmin">Login</button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import db from '../../modules/firebase.js'
export default {
  name: 'hello',
  data () {
    return {
      user: '',
      pass: ''
    }
  },
  firebase () {
    return {
      admin: {
        source: db.database().ref('admin'),
        asObject: true
      }
    }
  },
  created () {
    // this.$session.start()
    // this.$session.set('admin', true)
    // this.$router.push({
    //   name: 'Dashboard'
    // })
  },
  methods: {
    loginAdmin () {
      if (this.user === this.admin.user && this.pass === this.admin.pass) {
        this.$session.start()
        this.$session.set('admin', true)
        this.$router.push({
          name: 'Dashboard'
        })
      } else {
        alert('โปรดกรอก Username และ Password ให้ถูกต้อง')
      }
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Intro
{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100000000;
  background-color: #fff;
  text-align: center;
  top: 0px;
}
.front
{
  width: 350px;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -200px;
  margin-left: -175px;
  background-color: #ffc0c7;
}

input
{
  width: 100%;
  border:0px;
  border-radius: 3px;
  margin-bottom: 10px;
  height: 45px;
  text-align: center;
}

.title
{
  width: 100%;
  margin-bottom: 10px;
  font-family: font4;
  font-size: 1.3rem;
}

button
{
  width: 100%;
  height: 45px;
  background-color: #f87282;
  border: 0px;
  border-radius: 4px;
  color: #fff;
  margin-top:10px;
  outline: none;
}

button:hover
{
  opacity: 0.5;
}
</style>
