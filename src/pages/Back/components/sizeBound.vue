<template>
  <div>
      <input type="text" v-model="getSize" class="sizeInput" v-on:change="updateSize($event.target.value)">
  </div>
</template>

<script>
import db from '../../../modules/firebase.js'
export default {
  name: 'Productbox',
  data () {
    return {
      getSize: ''
    }
  },
  firebase () {
    return {
      sizes: {
        source: db.database().ref('product/' + this.$store.backViewProduct + '/size/' + this.size + '/' + this.sof),
        asObject: true
      }
    }
  },
  methods: {
    updateSize (data) {
      db.database().ref('product/' + this.$store.backViewProduct + '/size/' + this.size + '/' + this.sof).transaction(function (value) {
        value = data
        return value
      })
    }
  },
  created () {
    this.getSize = this.sizes['.value']
  },
  computed: {
  },
  props: ['size', 'sof']
}
</script>

<style scoped>
.sizeInput
{
  width: 50px;
  height: 35px;
  border: 1px #aaa solid;
  outline: none;
  text-indent: 10px;
}
</style>
