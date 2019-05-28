<template>
  <div class="columns">
    <section class="column candidate section">
      <div class="container is-fluid">
        <img src="../assets/house-of-cebong.png" alt="">
        <div class="candidate-count-wrapper">
          <p class="candidat-count">{{totalCebong}}%</p>
        </div>
      </div>
    </section>
    <section class="column candidate section">
      <div class="container is-fluid">
        <img src="../assets/house-of-kampret.png" alt="">
        <div class="candidate-count-wrapper">
          <p class="candidat-count">{{totalKampret}}%</p>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
import { mapState, mapGetters } from 'vuex'
import store from '../store'

export default {
  data () {
    return {
      cacheCebong: JSON.parse(localStorage.getItem('localCebong')),
      cacheKampret: JSON.parse(localStorage.getItem('localKampret'))
    }
  },
  computed: {
    ...mapState({
      cebong: state => state.survey.cebong,
      kampret: state => state.survey.kampret
    }),
    ...mapGetters({
      getTotalData: 'getTotalData',
      getKampretPercent: 'getKampretPercent',
      getCebongPercent: 'getCebongPercent'
    }),
    totalKampret () {
      if (navigator.onLine) {
        return this.getKampretPercent
      } else {
        if (this.cacheCebong.total > 0 || this.cacheKampret.total > 0) {
          return ((this.cacheKampret.total / (this.cacheCebong.total + this.cacheKampret.total)) * 100).toFixed(2)
        } else {
          return 0
        }
      }
    },
    totalCebong () {
      if (navigator.onLine) {
        return this.getCebongPercent
      } else {
        if (this.cacheCebong.total > 0 || this.cacheKampret.total > 0) {
          return ((this.cacheCebong.total / (this.cacheCebong.total + this.cacheKampret.total)) * 100).toFixed(2)
        } else {
          return 0
        }
      }
    }
  },
  created () {
  },
  mounted () {
    if (navigator.onLine) {
      store.dispatch('getCebongData')
    } else {
      store.dispatch('getCacheData')
    }
  }
}
</script>

<style lang="less" scoped>
.candidate {
  position: relative;
  .candidate-count-wrapper{
    background-color: whitesmoke;
    opacity: 0.7;
    position: absolute;
    bottom: 0;
    color: gray;
    width: 100%;
    height: 16%;
    transition: height 0.5s ease-in;
    -webkit-transition: height 0.5s ease-in;
    .candidat-count {
      text-align: right;
      font-size: 50px;
      color: black;
      position: absolute;
      top: 0;
      right: 0;
      @media only screen and (max-width: 600px){
        font-size: 2rem;
      }
    }
  }
    .candidate-count-wrapper{
       &:hover{
        height: 100%;
      }
    }
    img{
      width: 100%;
      height: auto;
    }
}

</style>

