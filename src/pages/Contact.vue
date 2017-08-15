<template>
  <div>
  <div class="container page">
    <div class="layout">
      <div class="centerText">
        <h2 class="font4">เกี่ยวกับเรา</h2>
      </div>
      <div class="ui text container">
        <div class="about">
          <h5 class="font3">{{abouts.about}}</h5>
        </div>
      </div>
    </div>

    <div class="layout">
      <div class="centerText">
        <h2 class="font4">ติดต่อเรา</h2>
      </div>
      <div class="ui text container">
       
        <div class="contact">
          <div class="contactTitle">
            Facebook
          </div>
          <div v-for="contact in contacts">
            <div v-if="contact.type == 'Facebook'">
              <i class="facebook square icon large"></i> {{contact.data}}
            </div>
          </div>
        </div>

        <div class="contact">
          <div class="contactTitle">
            Line
          </div>
          <div v-for="contact in contacts">
            <div v-if="contact.type == 'Line'">
              <i class="comments icon large"></i> {{contact.data}}
            </div>
          </div>
        </div>

        <div class="contact">
          <div class="contactTitle">
            Email
          </div>
          <div v-for="contact in contacts">
            <div v-if="contact.type == 'Email'">
              <i class="mail icon large"></i> {{contact.data}}
            </div>
          </div>
        </div>

        <div class="contact">
          <div class="contactTitle">
            เบอร์โทรศัพท์มือถือ
          </div>
          <div v-for="contact in contacts">
            <div v-if="contact.type == 'เบอร์โทรศัพท์มือถือ'">
              <i class="mobile icon large"></i> {{contact.data}}
            </div>
          </div>
        </div>

        <div class="contact">
          <div class="contactTitle">
            เบอร์โทรศัพท์บ้าน
          </div>
          <div v-for="contact in contacts">
            <div v-if="contact.type == 'เบอร์โทรศัพท์บ้าน'">
              <i class="phone icon large"></i> {{contact.data}}
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
  </div>
</template>

<script>
import Navigate from '../components/Navigate.vue'
import Banner from '../components/Banner'
import Productbox from '../components/Productbox'
import Homewebboard from '../components/Homewebboard'
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
      contacts: {
        source: db.database().ref('contact')
      },
      abouts: {
        source: db.database().ref('about'),
        asObject: true
      }
    }
  },
  methods: {
    viewLv1 (thiskey) {
      this.$router.push({
        name: 'Category',
        params: {
          lv1: thiskey
        }
      })
    }
  },
  computed: {
    newComment () {
      return this.webboards.slice().reverse().slice()
    }
  },
  components: {
    Banner, Navigate, Productbox, Homewebboard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about
{
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  border: 2px #ff8b8b solid;
  margin-top: 20px;
  text-align: center;
  font-size: 1.1rem;
}

.contact
{
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  border: 2px #ff8b8b solid;
  margin-top: 20px;
  text-align: left;
  font-size: 1.1rem;
}

.contactTitle
{
  width: 100%;
  font-family: font4;
  font-size: 1.4rem;
}

i
{
  color: #ff8b8b
}
</style>
