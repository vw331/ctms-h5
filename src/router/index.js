import { createRouter, createWebHistory } from 'vue-router'
import globalInterceptor, { afterEnterInterceptor, projectInterceptor } from './interceptor'

const routes = [
  {
    path: '/',
    name: 'Index',
    meta: { title: '登录', requiresAuth: true },
    component: () => import('@/views/index/Index'),
    redirect: '/projectList',
    children: [
      {
        path: 'projectList',
        name: 'ProjectList',
        meta: {
          title: '项目列表',
          showNavBar: true
        },
        component: () => import('@/views/index/ProjectList')
      }, {
        path: 'todo',
        name: 'Todo',
        meta: {
          title: '待办事项',
          showNavBar: true
        },
        component: () => import('@/views/index/Todo')
      }, {
        path: 'message',
        name: 'Message',
        meta: {
          title: '消息中心',
          showNavBar: true
        },
        component: () => import('@/views/index/Message')
      }, {
        path: 'me',
        name: 'Me',
        meta: {
          title: '我的',
          showNavBar: false
        },
        component: () => import('@/views/index/Me')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录', requiresAuth: false },
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/project/:projectId',
    name: 'paoject',
    component: () => import('@/views/project/Index'),
    props: true,
    meta: { title: '项目', requiresAuth: true, transition: 'van-slide-up' },
    beforeEnter: [projectInterceptor],
    redirect: { name: 'projectWorkspace' },
    children: [
      {
        path: 'workspace',
        name: 'projectWorkspace',
        meta: { title: '工作台' },
        component: () => import('@/views/project/WorkSpace')
      },
      {
        path: 'info',
        name: 'projectInfo',
        meta: { title: '消息' },
        component: () => import('@/views/project/Info')
      },
      {
        path: 'doc',
        name: 'projectDoc',
        meta: { title: '文档' },
        redirect: { name: 'projectDocList' },
        component: () => import('@/views/project/doc/Index'),
        children: [
          {
            path: 'list',
            name: 'projectDocList',
            meta: { title: '文档列表', keepAliveDoc: true },
            component: () => import('@/views/project/doc/List')
          },
          {
            path: ':id',
            name: 'projectDocFolder',
            meta: { title: '文件夹详情', keepAliveDoc: false },
            props: true,
            component: () => import('@/views/project/doc/Detail')
          }
        ]
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    meta: { title: '关于我们', requiresAuth: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(globalInterceptor)
router.afterEach(afterEnterInterceptor)

router.onError(err => {
  console.log(`路由出错了:`, err)
})

export default router
