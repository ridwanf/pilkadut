import Vue from 'vue'
import Router from 'vue-router'
import QuickCountView from '@/components/QuickCountView'
import AddCountView from '@/components/AddCountVIew'
import CameraView from '@/components/CameraView'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: QuickCountView
    },
    {
      path: '/add',
      name: 'Add',
      component: AddCountView
    },
    {
      path: '/camera',
      name: 'Camera',
      component: CameraView
    }
  ]
})
