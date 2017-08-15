<template>
  <div class="navigate">
  	
  	<transition name="fade">
  	<div class="RmenuCon" v-if="Rmenu">
  		<div class="closeRmenu" v-on:click="Rmenu = false">
  			<i class="remove icon big"></i>
  		</div>
  		<div class="RmenuBody">
			<router-link to="/" class="nlink">
				<div class="RmenuBox">หน้าหลัก</div>
			</router-link>
			<router-link to="/category" class="nlink">
				<div class="RmenuBox">สินค้า</div>
			</router-link>
			<router-link to="/contact" class="nlink">
				<div class="RmenuBox">ติดต่อเรา</div>
			</router-link>
			<router-link to="/webboard" class="nlink">
				<div class="RmenuBox">เว็บบอร์ด</div>
			</router-link>
		</div>
  	</div>
  	</transition>

  	<transition name="fade">
  	<div class="megamenu" v-if="megamenu == true" v-on:mouseleave="megamenu = false">
  		<div class="container">
		<div class="row">
			<div class="megamenuCon shadow4">
				<div class="row">
					<div class="LV1">
						<div v-for="category in categorys">
							<div v-on:click="viewLv1(category['.key'])" class="LV1box t3"
							v-bind:class="{ LV1active : category['.key'] == lv1 }" v-on:mouseover="lv1 = category['.key']">
								{{category['.key']}}
							</div>
						</div>
					</div>
					<div class="LV2">
						<MegamenuLV2 :cat="lv1"></MegamenuLV2>
					</div>
				</div>
			</div>
		</div>
		</div>
  	</div>
  	</transition>
  	<div class="head">
  		<div class="container">
  			<div class="left">
  			</div>
  			<div class="right">
  				<div v-if="!this.$session.has('uid')">
  					<router-link to="/login" class="nlink" style="color:#333">ลงชื่อเข้าใช้</router-link>
  				</div>
  				<div v-if="this.$session.has('uid')" class="desktop">
  					<span class="font2">ยินดีต้อนรับคุณ</span>
  					<span class="font4">
	  					<Getuser :userId="this.$session.get('uid')" data="first"></Getuser> 
	  					<Getuser :userId="this.$session.get('uid')" data="last"></Getuser>
  					</span>
  					|
  					<router-link to="/user" class="nlink" style="color:#333">
  						ดูข้อมูลของคุณ
  					</router-link>
  					|
  					<span v-on:click="Logout" class="nlink" style="color:#333">
  						ออกจากระบบ
  					</span>
  				</div>

  				<div v-if="this.$session.has('uid')" class="mobile">
  					<router-link to="/user" class="nlink" style="color:#333">
  					<span class="font4">
	  					<Getuser :userId="this.$session.get('uid')" data="first"></Getuser> 
	  					<Getuser :userId="this.$session.get('uid')" data="last"></Getuser>
  					</span>
  					</router-link>
  					|
  					<span v-on:click="Logout" class="nlink" style="color:#333">
  						ออกจากระบบ
  					</span>
  				</div>
  			</div>
  		</div>
  	</div>
  	<div class="body">
    	<div class="container">
    		<div class="mobile R-menu">
    			<i class="sidebar icon big" v-on:click="Rmenu = true"></i>
    		</div>
    		<div class="menu desktop">
	    		<router-link to="/" class="nlink">
	    			<div class="box">หน้าหลัก</div>
	    		</router-link>
	    		<router-link to="/category" class="nlink">
	    			<div class="box" v-on:mouseover="megamenu = true">สินค้า</div>
	    		</router-link>
	    		<router-link to="/contact" class="nlink">
	    			<div class="box">ติดต่อเรา</div>
	    		</router-link>
	    		<router-link to="/webboard" class="nlink">
	    			<div class="box">เว็บบอร์ด</div>
	    		</router-link>
    		</div>


    		<!-- ++++++++ logo ++++++++ -->
    		<router-link to="/" class="nlink">
    		<div class="logo t3">
    			<img src="../assets/img/logo.png" width="100%">
    		</div>
    		</router-link>


    		<router-link to="/cart" class="nlink">
	    		<div class="cart t3">
	    			<i class="shop icon large"></i>
	    			<span>{{countCart}}</span>
	    		</div>
    		</router-link>
    	</div>
    </div>
    </div>
  </div>
</template>

<script>
import db from '../modules/firebase.js'
import MegamenuLV2 from '../components/MegamenuLV2.vue'
import Getuser from '../components/Getuser.vue'
export default {
  name: 'app',
  data () {
    return {
      lv1: '',
      megamenu: false,
      Rmenu: false,
      login: false,
      uid: ''
    }
  },
  firebase () {
    return {
      categorys: {
        source: db.database().ref('category')
      }
    }
  },
  mounted () {
  },
  methods: {
    viewLv1 (thiskey) {
      this.$router.push({
        name: 'Category',
        params: {
          lv1: thiskey
        }
      })
    },
    Logout: function () {
      db.auth().signOut().then(function () {
      }).catch(function (error) {
        alert(error)
      })
      this.$session.destroy()
      alert('ออกจากระบบแล้ว')
      window.location.href = '/'
    }
  },
  computed: {
    countCart () {
      if (this.$session.has('usercart')) {
        return this.$session.get('usercart').length
      } else {
        return 0
      }
    }
  },
  components: {
    MegamenuLV2, Getuser
  }
}
</script>

<style scoped>
	.LV1
	{
		float: left;
		width: 50%;
	}
	.LV2
	{
		float: left;
		width: 50%;
		border-left: 1px #ff8888 solid;
		padding-top: 10px;
		padding-bottom: 10px;
	}
	.LV1box
	{
		width: 100%;
		height: 40px;
		line-height: 40px;
		cursor: pointer;
		text-align: center;
	}
	.LV1box:hover
	{
		background-color: #ffe4ec;
	}
	.LV1active
	{
		background-color: #ff8888;
	}
	.megamenu
	{
		position: absolute;
		width: 100%;
		z-index: 1000;
		top: 110px;
	}
		.megamenuCon
		{
			width: 600px;
			background-color: #fff;
			position: absolute;
			border:1px #ff8888 solid;
			border-radius: 5px;
			overflow: hidden;
		}
	.logo
	{
		position: absolute;
		width: 140px;
		left: 50%;
		margin-left: -70px;
		text-align: center;
		height: 100px;
		line-height: 100px;
		background-color: #444;
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
		z-index: 100;
		background-size: cover;
		background:url('../assets/img/logoBg.gif');
		-webkit-box-shadow: 0px 17px 25px -5px rgba(0,0,0,0.5);
		  -moz-box-shadow: 0px 17px 25px -5px rgba(0,0,0,0.5);
		  box-shadow: 0px 17px 25px -5px rgba(0,0,0,0.5);
		 cursor: pointer;
	}

	.logo:hover
	{
		height: 130px;
		line-height: 130px;
	}

	.logo img
	{
		width: 90px;
	}

	.navigate
	{
		width: 100%;
	}
	.navigate .head
	{
		width: 100%;
		height: 40px;
		line-height: 40px;
		border-bottom:1px #ff8888 solid;
	}
	.navigate .body
	{
		width: 100%;
		height: 80px;
		line-height: 80px;
		background-color: #ffdddd;
		background:url('../assets/img/fadePink.png');
		background-repeat: repeat-x;
		position: relative;
	}
	.menu
	{
		float: left;
	}
		.menu .box
		{
			float: left;
			margin-right: 30px;
			color: #7e4557;
			font-size: 1.1rem;
			cursor: pointer;
		}
	.cart
	{
		float: right;
		border:2px #ffa5c1 solid;
		border-radius: 100px;
		height: 40px;
		margin-top: 20px;
		line-height: 36px;
		width: 80px;
		text-align: center;
		color: #ffa5c1;
		cursor: pointer;
	}
	.cart:hover
	{
		float: right;
		background-color: #ffa5c1;
		color: #fff;
	}
	.cart i
	{
		color: #7e4557;
		vertical-align: middle;
	}
	.cart span
	{
		font-family: font4;
		font-size: 1.2rem;
		vertical-align: middle;
	}
	.R-menu
	{
		position: absolute;
		margin-left: 5px;
		color: #ff8b8b;
	}

	.RmenuCon
	{
		width: 100%;
		height: 100%;
		position: fixed;
		overflow-x: hidden;
		background-color: #fff;
		z-index: 100000000;
	}
	.closeRmenu
	{
		position: absolute;
		margin-left: 15px;
		margin-top: 15px;
		color: #ff8b8b;
	}
	.RmenuBody
	{
		width: 80%;
		margin-top: 70px;
		margin-left: 10%;
		border-top:2px #ff8b8b solid;
	}
	.RmenuBox
	{
		width: 100%;
		height: 45px;
		line-height: 45px;
		text-align: center;
		border-bottom:2px #ff8b8b solid;
		color: #ff8b8b;
	}
</style>
