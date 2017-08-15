<template>
  <div class='Webboardcon t2' v-on:click="addView">
    <div class="title">{{data.title}}</div>
    <div class="body">{{data.content}}</div>
    <div class="foot">
      <div style="float: left;">
        <i class="comment outline icon"></i>{{countComment}} 
        <i class="unhide icon"></i>{{data.view}}
      </div>
      <div style="float: right; font-family: font4;">
        อ่านเพิ่มเติม <i class="chevron right icon t2"></i>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../modules/firebase.js'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  firebase () {
    return {
      webboardCom: {
        source: db.database().ref('webboard/' + this.data['.key'] + '/comment')
      }
    }
  },
  props: ['data'],
  methods: {
    addView () {
      db.database().ref('webboard/' + this.data['.key'] + '/view').transaction(function (view) {
        view++
        return view
      })
      this.$router.push({
        name: 'Viewwebboard',
        params: {
          id: this.data['.key']
        }
      })
    }
  },
  computed: {
    countComment () {
      return this.webboardCom.length
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Webboardcon
{
  width: 100%;
  border:2px #ff9bad solid;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  margin-bottom: 15px;
}
.Webboardcon:hover
{
  -webkit-box-shadow: 0px 15px 30px -2px rgba(0,0,0,0.30);
  -moz-box-shadow: 0px 15px 30px -2px rgba(0,0,0,0.30);
  box-shadow: 0px 15px 30px -2px rgba(0,0,0,0.30);
  cursor: pointer;
}
.Webboardcon:hover .chevron
{
  margin-left: 10px;
}

.title
{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  font-family: font4;
  font-size: 1.1rem;
  padding: 10px;
  padding-bottom: 0px;
}
.body
{
  width: 100%;
  height: 4rem;
  font-family: font2;
  font-size: 1rem;
  overflow: hidden;
  padding: 10px;
  margin-bottom: 10px;
}
.foot
{
  width: 100%;
  height: 45px;
  line-height: 45px;
  border-top: 2px #ff9bad solid;
  padding-right: 10px;
  padding-left: 10px;
  text-align: right;
}
</style>
