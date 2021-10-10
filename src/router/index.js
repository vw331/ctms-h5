import { createRouter, createWebHistory } from 'vue-router'
import globalInterceptor, { projectInterceptor } from './interceptor'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/index/Index'),
    redirect: '/projectList',
    children: [
      {
        path: 'projectList',
        name: 'ProjectList',
        meta: {
          title: '项目列表'
        },
        component: () => import('@/views/index/ProjectList')
      },{
        path: 'todo',
        name: 'Todo',
        meta: {
          title: '待办事项'
        },
        component: () => import('@/views/index/Todo')
      },{
        path: 'message',
        name: 'Message',
        meta: {
          title: '消息中心'
        },
        component: () => import('@/views/index/Message')
      },{
        path: 'me',
        name: 'Me',
        meta: {
          title: '我的'
        },
        component: () => import('@/views/index/Me')
      }, 
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/project/:projectId',
    name: 'paoject',
    component: () => import('@/views/project/Index'),
    props: true,
    beforeEnter: [ projectInterceptor ],
    redirect: { name: 'projectWorkspace' },
    children: [
      {
        path: 'workspace',
        name: 'projectWorkspace',
        component: () => import('@/views/project/WorkSpace')
      },
      {
        path: 'info',
        name: 'projectInfo',
        component: () => import('@/views/project/Info')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
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

export default router
