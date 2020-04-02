import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Main from '../components/Main.vue'
// import CreatEssay from '../components/CreatEssay.vue'
// import MyEssays from '../components/MyEssays.vue'
// import EssayContent from '../components/EssayContent.vue'
// import UEssays from '../components/UEssays.vue'
// import Resume from '../components/Resume.vue'

Vue.use(VueRouter)

const routes = [

  { path: '/',
    component: Home,
    name: 'blogs',
    redirect: '/home',
    children: [
      { path: '/home', name: 'home', component: () => import('../components/Main.vue') },
      { path: '/add', name: 'add', component: () => import('../components/CreatEssay.vue') },
      { path: '/myessays', name: 'myessays', component: () => import('../components/MyEssays.vue') },
      { path: '/post/:essayid', component: () => import('../components/EssayContent.vue') },
      { path: '/userpost/:uid', component: () => import('../components/UEssays.vue') }
      // { path: '/resume', component: Resume }
    ] }

]
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next（）放行 next('/')强制跳转到该路径

  if (to.path !== '/myessays' && to.path !== '/add') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/')
  next()
})

export default router
