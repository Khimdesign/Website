<template>
	<div>
		<div class="Dashtitle">
			เปลี่ยน Banner
		</div>
    <div class="component">
      <div class="row">
        <div class="col-md-6">
         <img :src="banners.image" width="100%">
        </div>
        <div class="col-md-6">
          <label>
            คำอธิบายภาพ
          </label><br>
          <div class="ui input">
           <input type="text" placeholder="คำอธิบาย" v-model="text">
          </div>
          <div class="element">
            <label>
              รูปภาพ
            </label><br>
            <div class="ui input">
              <input type="file" name="filUploadImage" id="filUploadImage">
            </div>
            <br>
            ** แนะนำขนาด 1700 X 630
          </div>
        </div>
      </div>
      <div class="row component">
        <div class="col-md-12">
          <div style="width:100%; border-top:1px #bbb solid" class="component">
            <button class="ui primary button" style="float:right" v-on:click="uploadMoomImage">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import db from '../../../modules/firebase.js'
import fire from 'firebase'
export default {
  name: 'hello',
  data () {
    return {
      image: '',
      text: ''
    }
  },
  firebase () {
    return {
      banners: {
        source: db.database().ref('banner'),
        asObject: true
      }
    }
  },
  created () {
    this.text = this.banners.text
  },
  methods: {
    uploadMoomImage: function (type) {
      this.uploadTask(this.text)
    },
    uploadTask: function (text) {
      this.$session.start()
      var file = document.getElementById('filUploadImage').files[0]
      var fileName = 'Bigbanner'
      var storageRef = fire.storage().ref()
      var imageRef = storageRef.child('banner/' + fileName)
      var uploadTask = imageRef.put(file)
      uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
      }, function (error) {
        console.log(error)
      }, function () {
        var downloadURL = uploadTask.snapshot.downloadURL
        fire.database().ref('banner/').set({
          image: downloadURL,
          date: Date.now(),
          text: text
        })
        alert('ลงรูปสำเร็จ')
      })
      this.image = ''
      this.imageModal = false
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0])
      this.uploadMoomImage()
    },
    createImage (file) {
      var image = new Image()
      console.log(image)
      var reader = new FileReader()
      var vm = this
      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (e) {
      this.image = ''
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Dashtitle
  {
    width: 100%;
    font-family: font4;
    font-size: 1.6rem;
  }
  .eraseBox
  {
    cursor: pointer;
  }
  .eraseBox:hover
  {
    opacity: 0.5
  }
</style>

