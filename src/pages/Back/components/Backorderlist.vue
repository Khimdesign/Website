<template>
  <div class="orderCon t2">
        <div class="orderTitle">รหัสออร์เดอร์ : {{data.orderId}}</div>
        <div class="orderDet">วันที่ออร์เดอร์ : {{data.date}}</div>
        <label class="orderDet">สถานะ :</label>
        <select class="font2 selectPro" v-model="changestatus" v-on:change="change">
          <option value="รอชำระเงิน">รอชำระเงิน</option>
          <option value="อยู่ระหว่างการจัดส่ง">อยู่ระหว่างการจัดส่ง</option>
          <option value="จัดส่งสินค้าแล้ว">จัดส่งสินค้าแล้ว</option>
          <option value="ยกเลิกสินค้า">ยกเลิกสินค้า</option>
        </select>
        <br>
        <label class="orderDet">เลขที่ติดตาม :</label>
        <div class="ui labeled icon input">
          <input type="text" placeholder="รหัส EMS" v-model="ems">
          <a class="ui label" v-on:click="saveEms">
            บันทึก
          </a>
        </div>
        <br>
        <br>
        <button class="ui primary button font3" v-on:click="viewOrder">
          ดูข้อมูล
        </button>
  </div>
</template>

<script>
import db from '../../../modules/firebase.js'
export default {
  name: 'hello',
  data () {
    return {
      changestatus: '',
      ems: ''
    }
  },
  created () {
    this.ems = this.orders.ordercode
    this.changestatus = this.orders.status
  },
  firebase () {
    return {
      orders: {
        source: db.database().ref('order/' + this.data['.key']),
        asObject: true
      }
    }
  },
  methods: {
    saveEms () {
      var ems = this.ems
      db.database().ref('order/' + this.data['.key'] + '/ordercode').transaction(function (ordercode) {
        ordercode = ems
        return ordercode
      })
      alert('บันทึกรหัสติดตามแล้ว')
    },
    change () {
      var changestatus = this.changestatus
      db.database().ref('order/' + this.data['.key'] + '/status').transaction(function (status) {
        status = changestatus
        return status
      })
    },
    viewOrder () {
      this.$router.push({
        name: 'Vieworder',
        params: {
          orderid: this.data['.key']
        }
      })
    }
  },
  props: ['data']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.orderCon
{
  width: 100%;
  padding: 15px;
  border-radius: 4px;
  border:2px #ffa1a1 solid;
  cursor: pointer;
  margin-bottom: 10px;
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
.selectPro
  {
    height: 40px;
    margin-bottom: 10px;
    outline: none;
  }
</style>
