import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '이세돌 핫클립'
    }
  },
  {
    path: '/afterlogin',
    name: 'afterlogin',
    meta: {
      title: '이세돌 핫클립'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "afterlogin" */ '../views/AfterLoginView.vue')
  },
  {
    path: '/broadcaster/:id',
    name: 'broadcaster',
    meta: {
      title: '이세돌 핫클립'
    },
    component: () => import(/* webpackChunkName: "broadcaster" */ '../views/BroadcasterView.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      title: '이세돌 핫클립'
    },
    component: () => import(/* webpackChunkName: "search" */ '../views/SearchResultView.vue')
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      title: '이세돌 핫클립'
    },
    component: () => import(/* webpackChunkName: "test" */ '../views/TestView.vue')
  },
  {
    path: '/category',
    name: 'category',
    meta: {
      title: '이세돌 핫클립'
    },
    component: () => import(/* webpackChunkName: "category" */ '../views/CategoryView.vue')
  },
  {
    path: '/favorite',
    name: 'favorite',
    meta: {
      title: '이세돌 핫클립'
    },
    component: () => import(/* webpackChunkName: "favorite" */ '../views/FavoriteView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
