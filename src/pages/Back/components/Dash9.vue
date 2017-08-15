<template>
	<div>
		<div class="Dashtitle">
			เปลี่ยนรหัสผ่าน
		</div>
    <div class="component">
      <label>username: </label><br>
      <div class="ui input">
        <input type="text" v-model="user">
      </div>
      <br>
      <label>password: </label><br>
      <div class="ui input">
        <input type="password" v-model="pass1">
      </div>
      <br>
      <label>confirm password: </label><br>
      <div class="ui input">
        <input type="password" v-model="pass2">
      </div>
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
      user: '',
      pass1: '',
      pass2: ''
    }
  },
  firebase () {
    return {
      admins: {
        source: db.database().ref('admin'),
        asObject: true
      }
    }
  },
  created () {
    this.user = this.admins.user
  },
  methods: {
    saveUser () {
      if (this.pass1 !== this.pass2) {
        alert('โปรดใส่ password ให้ตรงกัน')
      } else if (this.pass1.length <= 4) {
        alert('password ต้องมากกว่า 4 ตัวอักษร')
      } else if (this.user.length <= 4) {
        alert('username ต้องมากกว่า 4 ตัวอักษร')
      } else {
        db.database().ref('admin').set({
          user: this.user,
          pass: this.pass1
        })
        alert('เปลี่ยนรหัสผ่านแล้ว')
        this.pass1 = ''
        this.pass2 = ''
        this.user = this.admins.user
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

