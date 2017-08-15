<template>
	<div>
		<div class="Dashtitle">
			Category / หมวดหมู่
		</div>
		<div class="component">
			<div class="font3" style="margin-bottom: 10px;">
			เพิ่มหมวดหมู่
			</div>
			<div class="ui input">
				<input type="text" placeholder="ชื่อหมวดหมู่" class="font3" v-model="category">
				<button class="ui primary button font3" style="margin-left: 10px;" v-on:click="pushCat">
				  เพิ่ม
				</button>
			</div>
		</div>

		<transition-group name="fade">
		<div class="ui segments" v-bind:key="category" v-for="category in categorys">
			<div class="ui segment" style="height: 45px;">
			  <div class="left">
			  	<p>{{category['.key']}}</p>
			  </div>
			  <div class="right">
			    <div class="eraseBox t1">
			      <i class="erase icon" v-on:click="deleteCat(category['.key'])"></i>
			    </div>
			  </div>
			</div>
			<div class="ui segment">
				<div v-for="(subcat, index) in category">- {{index}}
				<i v-if="index != 'ยังไม่มีข้อมูล'" class="erase icon" v-on:click="deleteSubcat(index, category['.key'])"></i></div>
			  <div class="ui input" style="background-color: #fff; padding-top: 20px; margin-top: -20px;">
			    <input type="text" placeholder="ชื่อหมวดหมู่ย่อย" class="font3" v-on:keyup.enter="pushSubcat(category['.key'], $event.target.value)">
			  </div>
			  <div style="margin-top: 5px;">* กดปุ่ม Enter เพื่อเพิ่มหมวดหมู่ย่อย</div>
			</div>
		</div>
		</transition-group>
	</div>
</template>

<script>
import db from '../../../modules/firebase.js'
export default {
  name: 'hello',
  data () {
    return {
      category: ''
    }
  },
  firebase () {
    return {
      categorys: {
        source: db.database().ref('category')
      }
    }
  },
  methods: {
    pushCat () {
      if (this.category !== '') {
        db.database().ref('category/' + this.category).set({
          ยังไม่มีข้อมูล: 'null'
        })
      }
    },
    deleteSubcat (thiskey, thiscat) {
      db.database().ref('category/' + thiscat + '/' + thiskey).remove()
    },
    deleteCat (thiskey) {
      db.database().ref('category/' + thiskey).remove()
    },
    pushSubcat (thiskey, value) {
      db.database().ref('category/' + thiskey + '/ยังไม่มีข้อมูล').remove()
      db.database().ref('category/' + thiskey + '/' + value).set({
        data: 'null'
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

