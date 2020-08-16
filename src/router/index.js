import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import MapIndex from '../views/example/Index'

  const routes = [

    {
      path: '/mapindex',
      component: MapIndex
    },
]

const router = new VueRouter({
  routes
})

export default router
