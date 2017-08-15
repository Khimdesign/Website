<template>
  <div>
    <div class="container">
      <div class="component">
        <div class="breadcrumbTop" v-if="this.$route.params.lv2">
          หน้าหลัก > 
          สินค้า > 
          {{this.$route.params.lv1}} > 
          {{this.$route.params.lv2}}
        </div>
        <div class="breadcrumbTop" v-if="!this.$route.params.lv2 && this.$route.params.lv1">
          หน้าหลัก > 
          สินค้า > 
          {{this.$route.params.lv1}}
        </div>
        <div class="breadcrumbTop" v-if="!this.$route.params.lv1 && !this.$route.params.lv2">
          หน้าหลัก > 
          สินค้า
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-3" v-for="(product,index) in newProduct" v-if="product.show == true">
            <div class="component">
              <Productbox :product="product"></Productbox>
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
import Productbox from '../components/Productbox'
import Navigate from '../components/Navigate.vue'
export default {
  name: 'hello',
  data () {
    return {
      lv1: '',
      lv2: ''
    }
  },
  firebase () {
    return {
      products: {
        source: db.database().ref('product/' + this.$store.backViewProduct)
      }
    }
  },
  created () {
    if (this.$route.params.lv1) {
      this.lv1 = this.$route.params.lv1
    }
    if (this.$route.params.lv2) {
      this.lv2 = this.$route.params.lv2
    }
  },
  computed: {
    newProduct () {
      return this.getCat.slice().reverse()
    },
    checkCat () {
      var lv1 = this.lv1
      var lv2 = this.lv2
      if (lv2 === '' && lv1 === '') {
        return 0
      } else if (lv2 === '' && lv1 !== '') {
        return 1
      } else {
        return 2
      }
    },
    getCat () {
      if (this.checkCat === 0) {
        return this.products
      } else if (this.checkCat === 1) {
        var lv1 = this.$route.params.lv1
        return this.products.filter(function (item) {
          return item['lv1'] === lv1
        })
      } else {
        var lv2 = this.$route.params.lv2
        return this.getLv2.filter(function (item) {
          return item['lv2'] === lv2
        })
      }
    },
    getLv2 () {
      var lv1 = this.$route.params.lv1
      return this.products.filter(function (item) {
        return item['lv1'] === lv1
      })
    }
  },
  components: {
    Navigate, Productbox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
