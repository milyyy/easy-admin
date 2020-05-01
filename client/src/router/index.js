import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Register from '@/views/Register'
import NotFound from '@/views/404'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Profile from '@/views/Profile'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout,
    children: [
      {path: "", component: Home},
      {path: "/home", name: 'home', component: Home},
      {path: "/profile", name: 'profile', component: Profile},
    ]
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

router.beforeEach((to,from,next) => {
  const isLogin = localStorage.getItem('token') ? true:false;
  if(to.path == '/login' || to.path == '/register') {
    next();
  } else {
    isLogin ? next() : next('/login');
  }
})


export default router
