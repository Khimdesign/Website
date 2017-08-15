<template>
  <div id="app">
    <keep-alive><Navigate></Navigate></keep-alive>
    <router-view></router-view>
    <keep-alive><Footerbottom></Footerbottom></keep-alive>
  </div>
</template>

<script>
import Navigate from './components/Navigate.vue'
import Footerbottom from './components/Footerbottom.vue'
export default {
  name: 'app',
  components: {
    Navigate, Footerbottom
  }
}
</script>

<style>

.redfont { color: #ff4949 }
.pinkfont {color: #ff7088 }

.backendCon
{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10000000000000;
  background-color: #fff;
  top: 0px;
}

.spinner
{
  height: 42px;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
}
.spinner .left
{
  height: 40px;
  width: 40px;
  background-color: #ffc3cd;
  float: left;
  text-align: center;
  line-height: 36px;
  font-family: font1;
  font-size: 3rem;
  color:#651b28;
  cursor: pointer;
}

.spinner .center
{
  height: 40px;
  width: 50px;
  float: left;
  text-align: center;
  line-height: 40px;
  border:2px #ffc3cd solid;
}

.spinner .right
{
  height: 40px;
  width: 40px;
  background-color: #ffc3cd;
  float: left;
  text-align: center;
  line-height: 36px;
  font-family: font1;
  font-size: 3rem;
  color: #651b28;
  cursor: pointer;
}

.spinner .right:hover
{
  opacity: 0.5
}

.spinner .left:hover
{
  opacity: 0.5
}

.cartName
{
  font-family: font4;
  font-size: 1.4rem;
  color:#651b28;
}
.cartImage
{
  border: 2px #ffc3cd solid;
  width: 100%;
}
.productListBox
{
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px #ffc3cd solid;
  margin-bottom: 20px;
  position: relative;
}

.breadcrumbTop
{
  font-family: font2;
  font-size: 1rem;
}
.mobile
{
  display: none;
}

.desktop
{
  display: block
}

@media screen and (max-width: 768px) {
    .mobile
    {
      display: block;
    }

    .desktop
    {
      display: none;
    }
}

textarea
{
  resize: none;
}

body
{
  font-family: font3;
}

.inputText
{
  width: 100%;
  border:2px #ffa5c1 solid;
  height: 45px;
  font-family: font2;
  font-size: 1.1rem;
  text-indent: 10px;
  outline: none;
  border-radius: 4px;
}

.inputText:focus
{
  background-color: #ffe4ec
}

.inputButton
{
  padding-left: 25px;
  padding-right: 25px;
  height: 50px;
  background-color: #ffa5c1;
  border:0px;
  color: #7e4557;
  font-family: font4;
  font-size: 1.1rem;
  outline: none;
  border-radius: 4px;
}

.inputButton.outline
{
  border:2px #ffa5c1 solid;
  background-color: transparent;
}

label
{
  line-height: 0.9rem;
}

.inputButton:hover
{
  opacity: 0.6;
  outline: none;
}

.nlink
{
  text-decoration: none;
  cursor: pointer;
}
.nlink:hover
{
  text-decoration: none;
}
.nlink:active
{
  text-decoration: none;
}
.nlink:visited
{
  text-decoration: none;
}


.element
{
  padding-top: 5px;
  padding-bottom: 5px;
}

.component
{
  padding-top: 10px;
  padding-bottom: 10px;
}

.layout
{
  padding-top: 20px;
  padding-bottom: 20px;
}

.page
{
  padding-top: 40px;
  padding-bottom: 40px;
}

.centerText
{
  width: 100%;
  text-align: center;
}

.leftText
{
  width: 100%;
  text-align: left;
}

.rightText
{
  width: 100%;
  text-align: right;
}

.left
{
  float: left;
}
.right
{
  float: right;
}

@font-face {
font-family: font1;
    src: url('assets/fonts/kanit/Kanit-Thin.ttf');
}
@font-face {
font-family: font2;
    src: url('assets/fonts/kanit/Kanit-ExtraLight.ttf');
}
@font-face {
font-family: font3;
    src: url('assets/fonts/kanit/Kanit-Light.ttf');
}
@font-face {
font-family: font4;
    src: url('assets/fonts/kanit/Kanit-Regular.ttf');
}

.font1 { font-family: font1 !important; }
.font2 { font-family: font2 !important; }
.font3 { font-family: font3 !important; }
.font4 { font-family: font4 !important; }

.shadow1
{
  -webkit-box-shadow: 0px 20px 50px -19px rgba(0,0,0,0.62);
  -moz-box-shadow: 0px 20px 50px -19px rgba(0,0,0,0.62);
  box-shadow: 0px 20px 50px -19px rgba(0,0,0,0.62);
}

.shadow2
{
  -webkit-box-shadow: 0px 0px 20px 2px rgba(36,202,238,0.50);
  -moz-box-shadow: 0px 0px 20px 2px rgba(36,202,238,0.50);
  box-shadow: 0px 0px 20px 2px rgba(36,202,238,0.50);
}

.shadow3
{
  -webkit-box-shadow: 0px 0px 15px 2px rgba(36,202,238,0.50);
  -moz-box-shadow: 0px 0px 15px 2px rgba(36,202,238,0.50);
  box-shadow: 0px 0px 15px 2px rgba(36,202,238,0.50);
}

.shadow4
{
  -webkit-box-shadow: 0px 10px 25px -5px rgba(0,0,0,0.42);
  -moz-box-shadow: 0px 10px 25px -5px rgba(0,0,0,0.42);
  box-shadow: 0px 10px 25px -5px rgba(0,0,0,0.42);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to{
  opacity: 0
}


.t1
{
  -webkit-transition: all 0.1s ease-out;
  -moz-transition: all 0.1s ease-out;
  -o-transition: all 0.1s ease-out;
  transition: all 0.1s ease-out;
}
.t2
{
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -o-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}
.t3
{
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}
.t4
{
  -webkit-transition: all 0.4s ease-out;
  -moz-transition: all 0.4s ease-out;
  -o-transition: all 0.4s ease-out;
  transition: all 0.4s ease-out;
}
.discount
{
  text-decoration:line-through
}
</style>
