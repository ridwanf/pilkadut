<template>
  <div class="add-count-content">
    <div class="columns">
      <section class="section candidate-wrapper column">
        <div class="container is-fluid">
          <div class="icon-wrapper">
            <img src="../assets/house-of-cebong.png" alt="">
          </div>
          <div class="count-wrapper">
            <div class="field">
              <div class="control">
                <input class="input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="candidate1Score" v-model="total1" placeholder="Cebong">
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section candidate-wrapper column">
        <div class="container is-fluid">
          <div class="icon-wrapper">
            <img src="../assets/house-of-kampret.png" alt="">
          </div>
          <div class="count-wrapper">
            <div class="field">
              <div class="control">
                <input class="input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="candidate2Score" v-model="total2" placeholder="kampret">
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="">
      <!-- Raised button with ripple -->
      <button class="btn btn-primary" @click.prevent="addSurvey">
        ADD
      </button>
    </div>
  </div>
</template>

<script>
import store from '../store'

export default {
  data () {
    return {
      total1: '',
      total2: ''
    }
  },
  mounted () {

  },
  methods: {
    addSurvey () {
      store.dispatch('updateData', {totalCebong: this.total1, totalKampret: this.total2}).then(() => {
        this.resetPage()
      }).catch(err => {
        alert(err.message)
      })
    },
    resetPage () {
      this.total1 = ''
      this.total2 = ''
      this.$router.push({name: 'Home'})
    }
  }

}
</script>
<style lang="less" scoped>
.add-count-content{
  text-align: center;
  .candidate-wrapper {
    text-align: left;
    .icon-wrapper{
      margin: 0;
      img {
        width: 100%;
      }
    }
    .count-wrapper {
      .label-wrapper {
        .label-candidate {
          font-size: 30px;
        }
      }
    }
  }

  @media only screen and (max-width: 600px){
    .candidate-wrapper {
      margin: 0 8px;
      .count-wrapper {
        .label-wrapper {
          .label-candidate {
           margin: 0;
            font-size: 3rem;
          }
        }
      }
    }

  }
}
</style>
