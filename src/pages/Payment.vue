<template>
  <div>
    <div class="container ui text page">
      <div class="layout">
        <div class="textBox" style="font-family: font4; font-size: 1.6rem;">ORDER ID : {{orders.orderId}}</div>
        <div class="textBox" style="font-family: font3; font-size: 1.1rem;">การชะระเงิน ท่านสามารถโอนเงินผ่านบัญชีธนาคารและส่งสลิปยืนยันการชำระเงินผ่าน line ของร้านหรือหากมีข้อสงสัยเกี่ยวกับการชำระเงินสามารถติดต่อร้านผ่านช่องทางการติดต่อได้จาก menu ของเว็บไซต์และแจ้งรหัส Order Id กับทางร้าน</div>
        <div class="textBox" style="font-family: font4; font-size: 1.2rem;">
          <div v-for="contact in contacts" v-if="contact.type == 'Line'">
            LINE ID : {{contact.data}}
          </div>
        </div>
      </div>

      <div class="layout">
        <div class="totalBox" style="font-family: font4; font-size: 1.6rem;">
          ยอดสุทธิ : {{orders.total}}
        </div>
      </div>

      <div class="layout">
        <div class="textBox" style="font-family: font4; font-size: 1.6rem;">
          ช่องทางชำระเงิน
        </div>
        <div v-for="pay in payments" class="layout">
          <div class="paymentBox">
            <div class="bankName">{{pay.bank}}</div>
            {{pay.name}}<br>
            {{pay.number}}
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
      },
      payments: {
        source: db.database().ref('payment')
      },
      contacts: {
        source: db.database().ref('contact')
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

.textBox
{
  width: 100%;
  text-align: center;
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

.paymentBox
{
  width: 100%;
  padding: 20px;
  border-radius: 4px;
  border:2px #ff9696 solid;
  font-family: font2
}

.bankName
{
  font-family: font4;
  font-size: 1.3rem;
}
</style>
