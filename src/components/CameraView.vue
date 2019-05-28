<template>
  <div class="camera-container">
    <div class="columns">
      <section class="section camera-modal">
        <video ref="video" class="camera-stream" :class="alreadyTakePicture ? 'hidden' : ''"/>
        <div class="camera-modal-container container">
          <!-- <canvas id="canvas" class='hidden'>
          </canvas> -->
          <div class="output">
            <img :class="!alreadyTakePicture ? 'hidden' : ''" id="photo" alt="The screen capture will appear in this box.">
          </div>
        </div>
        <div class="button-container">
          <span @click="capture" class="take-picture-button button is-danger">
            <i class="material-icons" v-if="!alreadyTakePicture">camera</i>
            <span v-else>Take again</span>
          </span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mediaStream: null,
      alreadyTakePicture: false
    }
  },
  mounted () {
    navigator.mediaDevices.getUserMedia({video: true})
      .then(mediaStream => {
        this.mediaStream = mediaStream
        this.$refs.video.srcObject = mediaStream
        this.$refs.video.play()
      })
      .catch(error => alert('getUserMedia() error', error))
  },
  destroyed () {
    const tracks = this.mediaStream.getTracks()
    tracks.map(track => track.stop())
  },
  methods: {
    capture () {
      if (this.alreadyTakePicture) {
        this.alreadyTakePicture = false
      } else {
        const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
        const imageCapture = new window.ImageCapture(mediaStreamTrack)
        var img = document.querySelector('img')

        return imageCapture.takePhoto().then(blob => {
          img.classList.remove('hidden')
          img.src = URL.createObjectURL(blob)
          this.alreadyTakePicture = true
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.camera-modal {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 10;
}
.camera-stream {
  width: 100%;
  max-height: 100%;
}
.button-container{
  position: absolute;
  bottom: 90px;
  z-index: 5;
  width: 100%;
  left: 0;
  text-align: center;
  .take-picture-button {

  }
}

.hidden{
  display: none
}
</style>
