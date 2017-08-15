<template>
  <div>
    <div class="container">
      <div class="component">
        <h4 class="font4">Checkout / ออร์เดอร์สินค้า</h4>
        <div class="conponents">
          items / จำนวนสินค้า : {{countCart}}
        </div>
      </div>
      <div class="component">
        <Steptitle text="รายการ / Order Detail"></Steptitle>
      </div>
      
      <div class="row">
        <div class="col-md-12">
          <div class="listHeader">
              <div class="row">
                <div class="col-md-2">
                  สินค้า
                </div>
                <div class="col-md-4">
                  รายละเอียด
                </div>
                <div class="col-md-2">
                  ราคาต่อหน่วย
                </div>
                <div class="col-md-2">
                  จำนวน
                </div>
                <div class="col-md-2">
                  <div class="rightText">ราคารวม</div>
                </div>
              </div>
          </div>
        </div>
        <div class="col-md-12">
          <div v-for="cart in this.$session.get('usercart')">
            <Productlistbox :product="cart" remove="false">
            </Productlistbox>
          </div>
        </div>
      </div>


      <div class="row">
        <div class="col-md-6">
          <div class="component">
            <Steptitle text="การจัดส่ง / Shipping Methods"></Steptitle>
          </div>
          <div class="component">

            <div class="row component">
              <div class="col-md-6">
                <input type="text" class="inputText" v-model="first" placeholder="ชื่อ">
              </div>
              <div class="col-md-6">
                <input type="text" class="inputText" v-model="last" placeholder="นามสกุล">
              </div>
            </div>

            <div class="row component">
              <div class="col-md-12">
                <input type="text" class="inputText" v-model="mobile" placeholder="โทรศัพท์มือถือ">
              </div>
            </div>

            <div class="row component">
              <div class="col-md-12">
                <input type="text" class="inputText" v-model="cell" placeholder="โทรศัพท์บ้าน">
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
          <!--   <input type="checkbox">
            <label>บันทึกที่อยู่ใหม่</label> -->
            <div class="addButAddress t2" v-on:click="sameAddress">
              ใช้ที่อยู่ปัจจุบัน
            </div>

          </div>
        </div>
        <div class="col-md-6">
          <div class="component">
            <Steptitle text="ช่องทางการชำระเงิน / Payment Methods"></Steptitle>
          </div>
          <div class="component">
            <h5 style="font-family: font4">ชำระเงินผ่านบัญชีธนาคาร</h5>
            ท่านสามารถชำระเงินผ่านบัญชีธนาคารหลังจากทำการยืนยันออร์เดอร์แล้ว โดยทำตามขั้นตอนการจัดส่งสินค้า
          </div>
        </div>
      </div>

      <div class="component">
        <Steptitle text="สรุปรายการสินค้า / Order Summary"></Steptitle>
      </div>
      <div class="row">
        <div class="offset-md-8 col-md-4">
          <div class="summary">
            <div class="left">รวม</div>
            <div class="right">฿ {{total}}</div>
          </div>
          <div class="summary">
            <div class="left">ค่าขนส่ง</div>
            <div class="right">฿ {{fees.fee}}</div>
          </div>
          <div class="summary">
            <div class="left">ยอดสุทธิ</div>
            <div class="right">฿ {{parseInt(fees.fee) + parseInt(total)}}</div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <button class="button2 t2" v-on:click="objProduct">ออร์เดอร์สินค้า</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Navigate from '../components/Navigate.vue'
import Steptitle from '../components/Steptitle.vue'
import Productlistbox from '../components/Productlistbox.vue'
import db from '../modules/firebase.js'
export default {
  name: 'hello',
  data () {
    return {
      total: 0,
      first: '',
      last: '',
      cell: '',
      mobile: '',
      address: '',
      province: '',
      city: '',
      district: '',
      zipcode: '',
      item: [],
      date: ''
    }
  },
  components: {
    Navigate, Productlistbox, Steptitle
  },
  firebase () {
    return {
      products: {
        source: db.database().ref('product'),
        asObject: true
      },
      fees: {
        source: db.database().ref('fee'),
        asObject: true
      },
      orders: {
        source: db.database().ref('order')
      },
      users: {
        source: db.database().ref('user/' + this.$session.get('uid')),
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
    if (this.$session.get('usercart')) {
      var whole = this.$session.get('usercart')
      var getTotal = 0
      var discount = 0
      for (var i = 0; i < whole.length; i++) {
        var price = this.products[whole[i].productId].price
        if (this.products[whole[i].productId].promotion) {
          discount = this.products[whole[i].productId].promotion
        } else {
          discount = 0
        }
        var totalprice = ((100 - discount) / 100) * price
        getTotal += whole[i].qty * totalprice
      }
      this.total = getTotal
    }
  },
  methods: {
    objProduct () {
      if (this.products === '' || this.total === '' || this.first === '' || this.last === '' || this.cell === '' || this.mobile === '' || this.address === '' || this.province === '' || this.city === '' || this.district === '' || this.zipcode === '') {
        alert('โปรดกรอกข้อมูลให้ครบถ้วน')
      } else {
        var productIncart = this.$session.get('usercart')
        this.$session.remove('usercart')
        var product = []
        for (var b = 0; b < productIncart.length; b++) {
          var productId = productIncart[b].productId
          var thisProduct = this.products[productId]
          var addItem = {
            pid: productId,
            promotion: thisProduct.promotion,
            price: thisProduct.price,
            qty: productIncart[b].qty,
            size: productIncart[b].size
          }
          product.push(addItem)
        }
        var ordercount = this.orders.length + 1
        var orderId = 'KH-' + ordercount
        var total = parseInt(this.total) + parseInt(this.fees.fee)
        db.database().ref('order').push({
          list: product,
          uid: this.$session.get('uid'),
          date: this.date,
          ordercode: '',
          orderId: orderId,
          fee: this.fees.fee,
          total: total,
          first: this.first,
          last: this.last,
          cell: this.cell,
          mobile: this.mobile,
          address: this.address,
          province: this.province,
          city: this.city,
          district: this.district,
          zipcode: this.zipcode,
          status: 'รอชำระเงิน'
        })
        alert('เพิ่มข้อมูลสินค้าสำเร็จ')
        window.location.href = '/#/user'
      }
    },
    sameAddress () {
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
    addTotal (id, qty) {
      this.total += (parseInt(this.products[id].price) * parseInt(qty)) / 102
    }
  },
  computed: {
    countCart () {
      if (this.$session.has('usercart')) {
        return this.$session.get('usercart').length
      } else {
        return 0
      }
    },
    getProduct (productId) {
      return this.products.productId
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .listHeader
  {
    border-bottom: 2px #ffc3cd solid;
    width: 100%;
    margin-bottom: 20px;
    line-height: 40px;
    height: 40px;
    font-family: font1;
    font-size: 1rem;
  }

  .summary
  {
    width: 100%;
    height: 40px;
    vertical-align: middle;
    line-height: 40px;
  }
  .summary .left
  {
    float: left;
  }
  .summary .right
  {
    float: right;
  }
  
  .button1
  {
    width: 100%;
    height: 45px;
    border:2px #ec5781 solid;
    background-color: transparent;
    text-align: center;
    outline: none;
    cursor: pointer;
    color:#ec5781;
    font-family: font3;
    font-size: 1.2rem;
  }

  .button2
  {
    width: 100%;
    height: 45px;
    background-color: #ec5781;
    border:0px;
    outline: none;
    cursor: pointer;
    color:#fff;
    text-align: center;
    font-family: font3;
    font-size: 1.2rem;
  }

  button:hover
  {
    opacity: 0.5
  }

  .addButAddress
  {
    padding-left: 20px;
    padding-right: 20px;
    height: 35px;
    background-color: #ffbcbc;
    display: inline-block;
    line-height: 35px;
    border-radius: 4px;
    cursor: pointer;
  }

  .addButAddress:hover
  {
    opacity: 0.7
  }
</style>
