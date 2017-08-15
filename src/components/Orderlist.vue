<template>
  <div class="orderCon t2" v-on:click="viewOrder">
    <div class="orderTitle">รหัสออร์เดอร์ : {{data.orderId}}</div>
    <div class="orderDet">วันที่ออร์เดอร์ : {{data.date}}</div>
    <div class="orderDet">สถานะ : {{data.status}}</div>
    <div class="orderDet">เลขที่ติดตาม : {{data.ordercode}}</div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
    }
  },
  methods: {
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
</style>
