import Vue from 'vue'
import VueRouter from 'vue-router'
// import LineChart from '@/components/LineChart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views'),
    children: [
      {
        path: '/',
        component: () => import('../views/Home.vue')
      }
    ]
  },
  {
    path: '/webgl',
    component: () => import('../views/webgl/webgl.vue')
  },
  {
    path: '/LineChart',
    component: () => import('../components/LineChart.vue')
  }
  // {
  //   path: '/lineChart/free',
  //   name: 'LineChart',
  //   component: LineChart
  // },
  // {
  //   path: '/views/src/free',
  //   name: 'App',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/src/App.vue')
  // }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
