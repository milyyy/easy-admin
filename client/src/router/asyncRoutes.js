import Layout from '@/views/Layout'

const asyncRoutes = [
  {
    path: '/',
    name: '资金管理',
    component: Layout,
    children: [
      {
        path: 'fundlist',
        name: '资金明细',
        component: resolve => require(['@/views/Founlist'], resolve)
      }
    ]
  },
  {
    path: '/',
    name: '信息管理',
    component: Layout,
    children: [
      {
        path: 'profile',
        name: '个人信息',
        component: resolve => require(['@/views/Profile'], resolve)
      }
    ]
  }
]
export default asyncRoutes
/*
const funsRoutes = {
  path: '/fund',
  name: '资金管理',
  component: Layout,
  children: [
    {
      path: 'fundlist',
      name: '资金明细'
    }
  ]
}
const profileRoutes = {
  path: '/info',
  name: '信息管理',
  component: Layout,
  children: [
    {
      path: 'profile',
      name: '个人信息'
    }
  ]
}

export {
  asyncRoutes,
  profileRoutes
}

*/