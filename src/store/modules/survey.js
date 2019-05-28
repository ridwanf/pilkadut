import firebase from '../../service/firebase'

const state = {
  cebong: {
    name: '',
    total: 0,
    no: 0
  },
  kampret: {
    name: '',
    total: 0,
    no: 0
  }
}

const mutations = {
  setCebong: (state, data) => {
    state.cebong = data
  },
  setKampret: (state, data) => {
    state.kampret = data
  }
}

const actions = {
  getCebongData ({commit}) {
    return new Promise((resolve, reject) => {
      firebase.database.ref('pilkadut').once('value')
        .then(
          res => {
            if (res) {
              commit('setCebong', res.child('0').val())
              commit('setKampret', res.child('1').val())
              localStorage.setItem('localCebong', JSON.stringify(Object.assign({}, res.child('0').val())))
              localStorage.setItem('localKampret', JSON.stringify(Object.assign({}, res.child('1').val())))
              resolve(res.val())
            }
          }
        )
        .catch((e) => {
          console.log(e)
          reject(e)
        })
    })
  },
  getCacheData ({commit}) {
    return new Promise((resolve, reject) => {
      let cacheCebong = JSON.parse(localStorage.getItem('localCebong'))
      let cacheKampret = JSON.parse(localStorage.getItem('localKampret'))
      if (cacheCebong && cacheKampret) {
        commit('setCebong', cacheCebong)
        commit('setKampret', cacheKampret)
        resolve([{...cacheCebong}, {...cacheKampret}])
      } else {
        resolve(false)
      }
    })
  },
  updateData ({commit},
    {totalCebong = 0, totalKampret = 0}) {
    return new Promise((resolve, reject) => {
      firebase.database.ref('pilkadut').once('value', (survey) => {
        var updates = {...survey.val()}
        const newCebong = {...updates[0], total: parseInt(updates[0].total) + parseInt(totalCebong)}

        const newKampret = {...updates[1], total: parseInt(updates[1].total) + parseInt(totalKampret)}

        const updateData = [{...newCebong}, {...newKampret}]

        firebase.database.ref('pilkadut').set(updateData)
          .then(() => {
            resolve(updateData)
          })
          .catch((err) => {
            reject(err)
          })
      })
    })
  }
}
const getters = {
  getTotalData: state => {
    return state.cebong.total + state.kampret.total
  },
  getCebongPercent: state => {
    if (state.cebong.total > 0 || state.kampret.total > 0) {
      return ((state.cebong.total / (state.cebong.total + state.kampret.total)) * 100).toFixed(2)
    } else {
      return 0
    }
  },
  getKampretPercent: state => {
    if (state.cebong.total > 0 || state.kampret.total > 0) {
      return ((state.kampret.total / (state.cebong.total + state.kampret.total)) * 100).toFixed(2)
    } else {
      return 0
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
