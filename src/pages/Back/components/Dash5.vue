<template>
	<div>
		<div class="Dashtitle">
			About Us / เกี่ยวกับเรา
		</div>
    <div class="component">
      {{getabouts['.value']}}
    </div>
    <div class="component">
		<div class="ui form">
      <div class="field">
        <label>อัพเดทข้อมูล</label>
        <textarea class="font2" v-model="aboutus"></textarea>
      </div>
      <div class="field">
          <button class="ui primary button font3" v-on:click="save">บันทึก</button>
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
      aboutus: ''
    }
  },
  firebase () {
    return {
      getabouts: {
        source: db.database().ref('about/about'),
        asObject: true
      }
    }
  },
  created () {
    this.aboutus = this.getabouts['.value']
  },
  methods: {
    save () {
      db.database().ref('about').set({
        about: this.aboutus,
        date: Date.now()
      })
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

