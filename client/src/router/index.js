import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Register from '@/views/Register'
import NotFound from '@/views/404'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/register'
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
