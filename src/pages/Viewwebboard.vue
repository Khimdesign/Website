<template>
  <div>
    <div class="container page">
      <router-link to="/webboard" class="nlink">
        <div class="wBack">
          <i class="chevron left icon t2"></i> 
          กลับสู่ Webboard
        </div>
      </router-link>
      <div class="ui segment">
        <div class="title">
          {{webboards.title}}
        </div>
        <div class="body">
          {{webboards.content}}
          <div style="font-style: italic; margin-top: 10px;">โพสเมื่อ : {{webboards.date}}</div>
          <div style="font-style: italic;">โพสโดย : {{webboards.postBy}}</div>
        </div>
      </div>
      <div class="ui segment">
        <div class="title">
          เขียนคอมเมนต์
          <textarea class="commentArea" spellcheck="false" v-model="content"></textarea>
          <input spellcheck="false" type="text" class="commentPoster" placeholder="ชื่อผู้โพส" v-model="Poster">
          <button class="commentButt t2" v-on:click="comment">คอมเมนต์</button>
        </div>
      </div>
      <div class="ui segment" v-for="comment in webboards.comment">
        <q>{{comment.content}}</q>
        <div style="font-style: italic; font-family: font2;">
          {{comment.postBy}} ( โพสเมื่อ: {{comment.date}} )
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigate from '../components/Navigate.vue'
import db from '../modules/firebase.js'
export default {
  name: 'hello',
  data () {
    return {
      Poster: '',
      date: '',
      content: ''
    }
  },
  firebase () {
    return {
      webboards: {
        source: db.database().ref('webboard/' + this.$route.params.id),
        asObject: true
      }
    }
  },
  created () {
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = dd + '/' + mm + '/' + yyyy
    this.date = today
  },
  methods: {
    comment () {
      db.database().ref('webboard/' + this.$route.params.id + '/comment').push({
        content: this.content,
        date: this.date,
        postBy: this.Poster
      })
      alert('คอมเมนต์สำเร็จ')
      this.content = ''
      this.Poster = ''
    }
  },
  computed: {
  },
  components: {
    Navigate
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
  width: 100%;
  font-family: font4;
  font-size: 1.1rem;
  padding: 10px;
  padding-bottom: 0px;
}
.body
{
  width: 100%;
  font-family: font2;
  font-size: 1rem;
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
.commentArea
{
  width: 100%;
  height: 100px;
  border-radius: 4px;
  border:1px #ff9e9e solid;
  padding: 10px;
  outline: none;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: font2;
}
.commentButt
{
  height: 45px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #ff9e9e;
  color: #333;
  font-family: font4;
  border:0px;
  border-radius: 4px;
  margin-bottom: 10px;
  outline: none;
  cursor: pointer;
}
.commentButt:hover
{
  opacity: 0.7;
}
.commentPoster
{
  width: 100%;
  height: 40px;
  border:1px #ff9e9e solid;
  margin-bottom: 10px;
  text-indent: 10px;
  outline: none;
  font-family: font2;
}
.wBack
{
  padding-left: 10px;
  padding-right: 10px;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #ffd5d5;
  border-radius: 3px;
  cursor: pointer;
  color: #333;
}
</style>
