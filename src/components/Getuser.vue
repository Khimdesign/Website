<template>
	<span>
    {{usersData['.value']}}
  </span>
</template>

<script>
import db from '../modules/firebase.js'
export default {
  name: 'getUserData',
  data () {
    return {
    }
  },
  firebase () {
    return {
      usersData: {
        source: db.database().ref('user/' + this.userId + '/' + this.data),
        asObject: true
      }
    }
  },
  props: ['userId', 'data']
}
</script>

<style scoped>
  
</style>
