<template>
  <div>
    <div class="container page">
      <div style="margin-bottom: 30px;">
        <h3 class="font4">ORDER ID : {{orders.orderId}}</h3>
        <h5 class="font4">ORDER DATE : {{orders.date}}</h5>
        <h5 class="font4">ORDER STATUS : {{orders.status}}</h5>
      </div>
      <div class="productlist" v-for="list in orders.list">
        <Vieworderlist :data="list"></Vieworderlist>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="dataBox">
            <div class="dataTitle">
              ที่อยู่จัดส่ง
            </div>
            <div class="dataBody">
              {{orders.first}} {{orders.last}}<br>
              โทรศัพท์มือถือ : {{orders.mobile}}<br>
              โทรศัพท์บ้าน : {{orders.cell}}<br>
              {{orders.address}} 
              {{orders.province}} 
              {{orders.city}} 
              {{orders.district}} 
              {{orders.zipcode}} 
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="totalBox">ยอดสุทธิ : {{orders.total}}</div>
          <div class="row">
            <div class="col-md-6">
              <div class="deleteButt t3" v-on:click="deleteOrder">
                ลบออร์เดอร์นี้
              </div>
            </div>
            <div class="col-md-6">
              <div class="payButt t2" v-on:click="payment">
                ชำระเงิน
              </div>
            </div>
          </div>
        </div>
      </div>
   </div>
  </div>
</template>

<script>
import db from '../modules/firebase.js'
import Vieworderlist from '../components/Vieworderlist.vue'
export default {
  name: 'hello',
  data () {
    return {
    }
  },
  firebase () {
    return {
      orders: {
        source: db.database().ref('order/' + this.$route.params.orderid),
        asObject: true
      }
    }
  },
  methods: {
    deleteOrder () {
      db.database().ref('order/' + this.$route.params.orderid).remove()
      alert('ลบออร์เดอร์สำเร็จ')
      this.$router.push({
        name: 'User'
      })
    },
    payment () {
      this.$router.push({
        name: 'Payment',
        params: {
          orderid: this.$route.params.orderid
        }
      })
    }
  },
  components: {
    Vieworderlist
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.totalBox
{
  width: 100%;
  background-color: #fee1e1;
  font-family: font4;
  font-size: 1.4rem;
  line-height: 60px;
  height: 60px;
  text-align: center;
  border-radius: 4px;
}

.dataBox
{
  border: 2px #ffa1a1 solid;
}

.dataBody
{
  padding: 10px;
}
.dataTitle
{
  background-color: #ffa1a1;
  text-align: center;
  color: #fff;
  height: 40px;
  line-height: 40px;
}

.orderCon
{
  width: 100%;
  padding: 15px;
  border-radius: 4px;
  border:2px #ffa1a1 solid;
  cursor: pointer;
}
.orderCon:hover
{
  width: 100%;
  padding: 15px;
  border-radius: 4px;
  background-color: #ffe9e9;
  border:2px #ffa1a1 solid;
}
.orderTitle
{
  font-size: 1.2rem;
  font-family: font4;
  color: #ffa1a1;
}
.orderDet
{
  font-size: 1rem;
  color: #000;
  font-family: font3;
}
.deleteButt
{
  width: 100%;
  height: 45px;
  border:2px #ff5252 solid;
  text-align: center;
  line-height: 45px;
  margin-top: 20px;
  font-family: font4;
  cursor:pointer;
}

.deleteButt:hover
{
  background-color: #ff5252;
  color: #fff;
}

.payButt
{
  width: 100%;
  height: 45px;
  background-color: #ff9696;
  text-align: center;
  line-height: 45px;
  margin-top: 20px;
  font-family: font4;
  cursor:pointer;
}

.payButt:hover
{
  opacity: 0.7;
}
</style>
