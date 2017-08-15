<template>
  <div>
    <table class="ui celled table">
      <thead>
        <tr>
          <th>วันที่</th>
          <th width="60%">หัวข้อกระทู้</th>
          <th>โพสโดย</th>
          <th>จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="webboard in webboards">
          <td>{{webboard.date}}</td>
          <td width="70%">{{webboard.title}}</td>
          <td>{{webboard.postBy}}</td>
          <td>
            <a v-on:click="EditRow(webboard['.key'])" class="EditLink">
              Edit
            </a>
            |
            <a v-on:click="DeleteRow(webboard['.key'])" class="DeleteLink">
              Delete
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import db from '../../../modules/firebase.js'
export default {
  name: 'Allwebboard',
  data () {
    return {
      title: '',
      content: ''
    }
  },
  firebase () {
    return {
      webboards: {
        source: db.database().ref('webboard')
      }
    }
  },
  created () {
    this.$session.start()
    if (this.$session.get('admin') !== true) {
      this.$router.push({
        name: 'Homepage'
      })
    }
  },
  methods: {
    DeleteRow (thiskey) {
      db.database().ref('webboard/' + thiskey).remove()
      alert('ลบข้อมูลสำเร็จ')
    },
    EditRow (thiskey) {
      this.$router.push({
        name: 'Editwebboard',
        params: {
          webboardid: thiskey
        }
      })
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
</style>

