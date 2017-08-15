<template>
  <div>
    <div class="container">
      <div class="component">
        <h4 class="font4">Cart / สินค้าในตะกร้า</h4>
        <div class="conponents">
          items / จำนวนสินค้า : {{countCart}}
        </div>
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
            <Productlistbox :product="cart" remove = "true">
            </Productlistbox>
          </div>
        </div>
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
              <button class="button2 t2" v-on:click="buynow">ออร์เดอร์สินค้า</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigate from '../components/Navigate.vue'
import Productlistbox from '../components/Productlistbox.vue'
import db from '../modules/firebase.js'
export default {
  name: 'hello',
  data () {
    return {
      total: 0
    }
  },
  components: {
    Navigate, Productlistbox
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
      }
    }
  },
  created () {
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
    addTotal (id, qty) {
      this.total += (parseInt(this.products[id].price) * parseInt(qty)) / 102
    },
    buynow () {
      this.$session.start()
      if (!this.$session.has('uid')) {
        alert('โปรดลงชื่อเข้าใช้ก่อน')
      } else if (parseInt(this.countCart) === 0) {
        alert('ท่านยังไม่มีสินค้าในตะกร้า')
      } else {
        var cart = this.$session.get('usercart')
        for (var i = 0; i < cart.length; i++) {
        }
        this.$router.push({
          name: 'Checkout'
        })
      }
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
</style>
