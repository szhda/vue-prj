import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/layout/home'
import User from '@/views/layout/user'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import Layout from '@/views/layout'
import store from '@/store'

const Login = () => import('@/views/login')
const MyOrder = () => import('@/views/myOrder')
const Pay = () => import('@/views/pay')
const Prodetail = () => import('@/views/prodetail')
const Search = () => import('@/views/search/index')
const SearchList = () => import('@/views/search/list')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', component: Home },
      { path: 'user', component: User },
      { path: 'category', component: Category },
      { path: 'cart', component: Cart }
    ]
  },
  { path: '/login', component: Login },
  { path: '/order', component: MyOrder },
  { path: '/pay', component: Pay },
  { path: '/search', component: Search },
  { path: '/searchlist', component: SearchList },
  // 商品详情，需要动态获取数据来拉取页面
  { path: '/prodetail/:id', component: Prodetail }
]

const router = new VueRouter({
  routes
})
const routerArry = ['/pay', '/order']
router.beforeEach((to, from, next) => {
  // 在每次跳转的时候判断一下，是否跳转到权限页面
  if (!routerArry.includes(to.path)) {
    next()
    return
  }
  const token = store.getters.getToken || ''
  // 如果是权限页面就得考虑页面有权限-即token
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
