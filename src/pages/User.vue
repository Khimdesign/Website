<template>
  <div>
    <div class="ui text container page">
      <div class="opt">
        <div class="optbox t1" v-on:click="menu = 2" v-bind:class="{ optboxActive : menu == 2}">ประวัติการสั่งซื้อ</div>
        <div class="optbox t1" v-on:click="menu = 1" v-bind:class="{ optboxActive : menu == 1}">ข้อมูลส่วนตัว</div>
      </div>

      <div v-if="menu == 1">
        <div class="layout">
          <div class="component">
            <Steptitle text="ข้อมูลส่วนตัว"></Steptitle>
          </div>
          <div class="component">
            E-mail : {{users.email}}
          </div>
          <div class="component">
            <input type="text" class="inputText" v-model="pass1" placeholder="Password">
          </div>
          <div class="component">
            <input type="text" class="inputText" v-model="pass2" placeholder="Confirm Password">
          </div>
          <div class="font2 element">
            *ช่อง Password และ Confirm password สำหรับเมื่อต้องการเปลี่ยน Password เท่านั้น
          </div>
          <div class="buttsave" v-on:click="changePass">
            บันทึก
          </div>
        </div>

        <div class="layout">
          <div class="component">
            <Steptitle text="ข้อมูล / ที่อยู่"></Steptitle>
          </div>
          <div v-if="changeData == true">
            <div class="row component">
              <div class="col-md-6">
                <input type="text" class="inputText" placeholder="ชื่อ" v-model="first">
              </div>
              <div class="col-md-6">
                <input type="text" class="inputText" placeholder="นามสกุล" v-model="last">
              </div>
            </div>

            <div class="row component">
              <div class="col-md-12">
                <input type="text" class="inputText" placeholder="โทรศัพท์มือถือ" v-model="mobile">
              </div>
            </div>

            <div class="row component">
              <div class="col-md-12">
                <input type="text" class="inputText" placeholder="โทรศัพท์บ้าน" v-model="cell">
              </div>
            </div>

            <div class="row component">
              <div class="col-md-12">
                <input type="text" class="inputText" v-model="address" placeholder="ที่อยู่">
              </div>
            </div>

            <div class="row component">
              <div class="col-md-6">
                <input type="text" class="inputText" v-model="province" placeholder="จังหวัด">
              </div>
              <div class="col-md-6">
                <input type="text" class="inputText" v-model="city" placeholder="เมือง">
              </div>
            </div>

            <div class="row component">
              <div class="col-md-6">
                <input type="text" class="inputText" v-model="district" placeholder="เขค">
              </div>
              <div class="col-md-6">
                <input type="text" class="inputText" v-model="zipcode" placeholder="รหัสไปรษณีย์">
              </div>
            </div>
            <div class="row component">
              <div class="col-md-6">
                <div class="buttsave" v-on:click="changeData=false" style="background-color: #bbb">
                  ยกเลิก
                </div>
              </div>
              <div class="col-md-6" style="text-align: right;">
                <div class="buttsave" v-on:click="saveData">
                  บันทึก
                </div>
              </div>
            </div>
          </div>

          <div v-if="changeData == false">
            <div class="row component">
              <div class="col-md-4">
                <div class="textLabel">ชื่อ</div>
                <div class="textData">{{users.first}}</div>
              </div>
              <div class="col-md-4">
                <div class="textLabel">นามสกุล</div>
                <div class="textData">{{users.last}}</div>
              </div>
              <div class="col-md-4">
                <div class="buttsave" v-on:click="changeData=true">change</div>
              </div>
            </div>
            <div class="row component">
              <div class="col-md-4">
                <div class="textLabel">โทรศัพท์มือถือ</div>
                <div class="textData">{{users.mobile}}</div>
              </div>
              <div class="col-md-4">
                <div class="textLabel">โทรศัพท์บ้าน</div>
                <div class="textData">{{users.cell}}</div>
              </div>
              <div class="col-md-4">
              </div>
            </div>
            <div class="row component">
              <div class="col-md-8">
                <div class="textLabel">ที่อยู่</div>
                <div class="textData">{{users.address}}</div>
              </div>
              <div class="col-md-4">
              </div>
            </div>
            <div class="row component">
              <div class="col-md-4">
                <div class="textLabel">จังหวัด</div>
                <div class="textData">{{users.province}}</div>
              </div>
              <div class="col-md-4">
                <div class="textLabel">เมือง</div>
                <div class="textData">{{users.city}}</div>
              </div>
              <div class="col-md-4">
              </div>
            </div>
            <div class="row component">
              <div class="col-md-4">
                <div class="textLabel">เขต</div>
                <div class="textData">{{users.district}}</div>
              </div>
              <div class="col-md-4">
                <div class="textLabel">รหัสไปรษณีย์</div>
                <div class="textData">{{users.zipcode}}</div>
              </div>
              <div class="col-md-4">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="menu == 2">
        <div class="layout">
          <div class="component">
            <Steptitle text="ประวัติการสั่งซื้อ"></Steptitle>
          </div>
          <div class="component" v-for="order in userOrder">
            <Orderlist :data="order"></Orderlist>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Steptitle from '../components/Steptitle.vue'
import Orderlist from '../components/Orderlist.vue'
import Navigate from '../components/Navigate.vue'
import Productlistbox from '../components/Productlistbox.vue'
import db from '../modules/firebase.js'
export default {
  name: 'hello',
  data () {
    return {
      changeEmail: false,
      changeData: false,
      pass1: '',
      pass2: '',
      menu: 2,
      email: '',
      first: '',
      last: '',
      mobile: '',
      cell: '',
      address: '',
      province: '',
      city: '',
      district: '',
      zipcode: ''
    }
  },
  components: {
    Navigate, Productlistbox, Steptitle, Orderlist
  },
  created () {
    this.first = this.users.first
    this.last = this.users.last
    this.mobile = this.users.mobile
    this.cell = this.users.cell
    this.address = this.users.address
    this.city = this.users.city
    this.district = this.users.district
    this.province = this.users.province
    this.zipcode = this.users.zipcode
  },
  firebase () {
    return {
      users: {
        source: db.database().ref('user/' + this.$session.get('uid')),
        asObject: true
      },
      orders: {
        source: db.database().ref('order')
      }
    }
  },
  methods: {
    changePass () {
      if (this.pass1 === this.pass2) {
        var user = db.auth().currentUser
        var newPassword = this.pass1
        user.updatePassword(newPassword).then(function () {
          alert('เปลี่ยนรหัสสำเร็จ!')
        }, function (error) {
          alert(error)
        })
      } else {
        alert('โปรดยืนยันรหัสผ่านให้ถูกต้อง')
      }
    },
    saveData () {
      if (this.first === '' || this.province === '' || this.last === '' || this.mobile === '' || this.cell === '' || this.address === '' || this.city === '' || this.district === '' || this.zipcode === '') {
        alert('ข้อมูลห้ามเว้นว่าง')
      } else {
        var item = {
          email: this.users.email,
          first: this.first,
          last: this.last,
          mobile: this.mobile,
          cell: this.cell,
          address: this.address,
          city: this.city,
          province: this.province,
          district: this.district,
          zipcode: this.zipcode
        }
        this.$firebaseRefs.users.set(item)
        alert('บันทึกสำเร็จ')
        this.changeData = false
      }
    }
  },
  computed: {
    userOrder () {
      var uid = this.$session.get('uid')
      return this.orders.filter(function (list) {
        return list['uid'] === uid
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .opt
  {
    height: 45px;
    background-color: #eee;
    display: inline-block;
    line-height: 45px;
  }
  .optbox
  {
    width: 200px;
    height: 45px;
    float: left;
    text-align: center;
    font-family: font4;
    cursor: pointer;
  }
  .optboxActive
  {
    background-color: #f89696 !important;
    color: #fff;
  }
  .buttsave
  {
    padding-left: 20px;
    padding-right: 20px;
    background-color: #ff9aab;
    height: 45px;
    border-radius: 4px;
    display: inline-block;
    line-height: 45px;
    font-family: font4;
    color: #fff;
    cursor: pointer;
  }
  .textLabel
  {
    width: 100%;
    font-family: font2;
    font-size: 1rem;
    line-height: 1rem;
  }
  .textData
  {
    width: 100%;
    font-family: font3;
    font-size: 1.1rem;
    color: #ff9aab
  }
</style>
