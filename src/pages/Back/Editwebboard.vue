<template>
  <div>
    <div class="backendCon">
      <div class="container layout">
        <div class="ui inverted menu">
          <router-link to="/dashboard" class="item font3">
            แดชบอร์ด
          </router-link>
          <router-link to="/backwebboard" class="active item font3">
            หลังบ้านเว็บบอร์ด
          </router-link>
          <router-link to="/" class="item font3">เว็บไซต์</router-link>
          <a class="item font3" v-on:click="Adminlogout">
            ออกจากระบบ
          </a>
        </div>

        <router-link to="/backwebboard" class="nlink">
          <div class="wBack">
            <i class="chevron left icon t2"></i> 
            ย้อนกลับ
          </div>
        </router-link>
        <div class="ui segment">
          <div class="title">
            <label>หัวข้อ</label>
            <input type="text" v-model="title" class="inputBoxText">
          </div>
        <div class="body">
          <label>เนื้อหา</label>
          <textarea v-model="content"></textarea>
          <div style="font-style: italic; margin-top: 10px;">โพสเมื่อ : {{webboards.date}}</div>
          <div style="font-style: italic;">โพสโดย : {{webboards.postBy}}</div>
            <button v-on:click="save" class="ui primary button">
              บันทึกข้อมูล
            </button>
        </div>
      </div>
      <div class="ui segment" v-for="(comment, index) in webboards.comment">
        <q>{{comment.content}}</q>
        <div style="font-style: italic; font-family: font2;">
          {{comment.postBy}} ( โพสเมื่อ: {{comment.date}} )
        </div>
        <a v-on:click="deleteComment(index)" class="DeleteLink">Delete</a>
      </div>
    </div>

      </div>
    </div>
  </div>
</template>

<script>
import db from '../../modules/firebase.js'
export default {
  name: 'Allwebboard',
  data () {
    return {
      title: '',
      content: ''
    }
  },
  created () {
    this.$session.start()
    if (this.$session.get('admin') !== true) {
      this.$router.push({
        name: 'Homepage'
      })
    }
    this.title = this.webboards['title']
    this.content = this.webboards['content']
  },
  firebase () {
    return {
      webboards: {
        source: db.database().ref('webboard/' + this.$route.params.webboardid),
        asObject: true
      }
    }
  },
  methods: {
    deleteComment (thiskey) {
      db.database().ref('webboard/' + this.$route.params.webboardid + '/comment/' + thiskey).remove()
      alert('ลบข้อมูลสำเร็จ')
    },
    save () {
      db.database().ref('webboard/' + this.$route.params.webboardid).set({
        content: this.content,
        title: this.title,
        postBy: this.webboards.postBy,
        date: this.webboards.date,
        view: this.webboards.view
      })
      alert('บันทึกข้อมูลสำเร็จ!')
    }
  }
}
</script>
<style scoped>
.DeleteLink
{
  cursor: pointer;
  color: #ff4359 !important;
}

.EditLink
{
  cursor: pointer;
  color: #9cee44 !important;
}

.break
{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}

.inputBoxText
{
  width: 100%;
  height: 45px;
  border-radius: 3px;
  border: 1px #eee solid;
  font-family: font2;
  text-indent: 15px;
  outline: none;
  margin-bottom: 10px;
}

textarea
{
  width: 100%;
  height: 250px;
  border-radius: 3px;
  border: 1px #eee solid;
  font-family: font2;
  padding: 15px;
  outline: none;
}

</style>

