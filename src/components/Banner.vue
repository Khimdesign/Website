<template>
  <div class="bannerCon">
  	<div class="text">
  		{{banners.text}}
  	</div>
    <img :src="banners.image" width="100%">
  </div>
</template>

<script>
import db from '../modules/firebase.js'
export default {
  name: 'Banner',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  firebase () {
    return {
      banners: {
        source: db.database().ref('banner'),
        asObject: true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bannerCon
{
	position: relative;
}
.text
{
	font-family: font4;
	color:#fff;
	position: absolute;
	font-size: 1.7rem;
	left: 30px;
	bottom: 20px;
}
</style>
