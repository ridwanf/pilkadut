<template>
  <div class="" id="app">
     <header class="header">
      <div class="navbar is-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link :to="{name: 'Home'}" class="navbar-item">
            <span >Pilkadut</span>
          </router-link>
          <router-link :to="{name: 'Add'}" class="navbar-burger burger">
            <i class="material-icons">add</i>
          </router-link>
        </div>
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-end">
            <router-link :to="{name: 'Add'}" class="navbar-item">
            <i class="material-icons">add</i>
          </router-link>
          </div>
        </div>

      </div>

    </header>
    <main class="">
      <div class="page-content">
        <router-view></router-view>
        <router-link
        :to="{name: 'Camera'}" class="camera-menu">
        <i class="material-icons">camera_alt</i>
      </router-link>
      </div>
    </main>
  </div>
</template>

<script>
import 'bulma/css/bulma.css'
import {urlBase64ToUint8Array} from './utility'
export default {
  name: 'app',
  created () {
  },
  mounted () {
    this.notify()
  },
  methods: {
    notify () {
      Notification.requestPermission(function (result) {
        console.log('User Choice', result)
        if ('serviceWorker' in navigator) {
          var options = {
            body: 'success subscribe to our notification',
            icon: '/img/icons/cropchat-icon-64x64.png',
            image: 'img/icons/cropchat-icon-128x128.png',
            dir: 'ltr',
            lang: 'en-US',
            vibrate: [100, 50, 200],
            badge: 'img/icons/favicon-32x32.png',
            tag: 'confirm-notification',
            renotify: true,
            actions: [
              { action: 'confirm', title: 'Okay', icon: 'img/icons/cropchat-icon.64x64.png' },
              { action: 'cancel', title: 'Cancel', icon: 'img/icons/cropchat-icon.64x64.png' }
            ]
          }
          navigator.serviceWorker.ready
            .then((swreg) => {
              swreg.showNotification('Successfully subsribe from sw', options)
            })
        }
      })
    },
    displayConfirmNotification () {
      console.log('displayConfirmNotification')
      if ('serviceWorker' in navigator) {
        var options = {
          body: 'success subscribe to our notification',
          icon: '/img/icons/cropchat-icon-64x64.png',
          image: 'img/icons/cropchat-icon-128x128.png',
          dir: 'ltr',
          lang: 'en-US',
          vibrate: [100, 50, 200],
          badge: 'img/icons/favicon-32x32.png'
        }
        navigator.serviceWorker.ready
          .then((swreg) => {
            swreg.showNotification('Successfully subsribe from sw', options)
          })
      }
    },
    configurePushSub () {
      if (!('serficeWOrker' in navigator)) {
        return
      }
      var reg
      navigator.serviceWorker.ready
        .then((swreg) => {
          return swreg.pushManager.getSubscription()
        })
        .then((sub) => {
          if (sub === null) {
            // create a new subscription
            var vapidPublicKey = 'BF6JlyA4vz1DIkIsn8tNhZYBEK9TTrW-voYuEn4-hHr9f53xooJagP0maCOBkKuKSQLgSqBIvjRpgHe46xAm0CU'

            var convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey)

            reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidPublicKey
            })
          } else {

          }
        })
    }
  }
}
</script>

<style lang="less">
.navbar {
  .btn-add {
    min-width: 30px;
    margin-right: 0;
    color: black;
    height: 30px;
    width: 30px;
  }
  .navbar-brand {
    color: #ffffff;
  }
  .navbar-burger {
    padding: 12px;
  }
}
.btn {

  @media only screen and (max-width: 600px){
    width: 100%;
  }
  width: 400px;
  min-height: 40px;
  &.btn-primary{
    background: black;
    color: #FFF;
    text-transform: uppercase;
  }
  &:active {
    background: lighten(black, 20%);
    color: #ffffff;
  }
}


.camera-menu {
  position: fixed;
  right: 24px;
  bottom: 15px;
  z-index: 5;
  &.router-link-exact-active {
    display: none
  }
}



</style>

