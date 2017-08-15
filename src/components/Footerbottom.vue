<template>
  <div class="footerCon">
    <div class="container">
    	<div class="row">
    		<div class="col-md-2">
    			<div class="font4">Khim Design</div>
    		</div>
    		<div class="col-md-2">
    			<div class="font4">Stay Connected</div>
    			<a href="https://www.facebook.com/Khimdesign/" style="color:#333" class="nlink"><div class="font2">Facebook</div></a>
    		</div>
    		<div class="col-md-2">
    			<div class="font4">Site Map</div>
    			<router-link to="/" class="nlink" style="color:#333">
    				<div class="font2">Homepage</div>
    			</router-link>
    			<router-link to="/category" class="nlink" style="color:#333">
    				<div class="font2">Categories</div>
    			</router-link>
    			<router-link to="/" class="nlink" style="color:#333">
    				<div class="font2">Webboard</div>
    			</router-link>
    			<router-link to="/" class="nlink" style="color:#333">
    				<div class="font2">Contact Us</div>
    			</router-link>
    		</div>
    		<div class="col-md-2 offset-md-4">
    			Produce by Squeze-th team
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footer',
  components: {
  }
}
</script>
<style>
	.footerCon
	{
		width: 100%;
		padding-top: 20px;
		padding-bottom: 20px;
		background-color: #ffd3d3;
		margin-top: 100px;
	}
</style>
