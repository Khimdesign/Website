<template>
 <div>
 	<div class="LV2box t3" v-for="(cat2,index) in categorys[cat]" v-on:click="viewLv2(index)">
 		{{index}}
 	</div>
 </div>
</template>

<script>
import db from '../modules/firebase.js'
export default {
  name: 'app',
  data () {
    return {
      lv1: ''
    }
  },
  props: ['cat'],
  firebase () {
    return {
      categorys: {
        source: db.database().ref('category'),
        asObject: true
      }
    }
  },
  methods: {
    viewLv2 (thiskey) {
      this.$router.push({
        name: 'Category',
        params: {
          lv1: this.cat,
          lv2: thiskey
        }
      })
    }
  },
  computed: {
    getData () {
    }
  }
}
</script>

<style scoped>
.LV2box
{
	width: 100%;
	text-align: center;
	height: 30px;
	line-height: 30px;
	cursor: pointer;
}

.LV2box:hover
{
	width: 100%;
	text-align: center;
	height: 30px;
	line-height: 30px;
	background-color: #ffe4ec;
}
</style>
