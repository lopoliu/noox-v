import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/resource/'
    },
    {
      path: '/resource',
      name: 'resource',
      redirect: '/resource/list',
      component: () => import('@/views/layout/view.vue'),
      children: [
        {
          path: '/resource/list',
          name: 'list',
          component: ()=>import('@/views/resource/ResourceList.vue'),
          meta:{
            showLeft : true,
            showRight: true,
            title: '资源列表'
          }
        },
        {
          path: '/resource/details',
          name: 'details',
          component: () =>import('@/views/resource/ResourceDetails.vue'),
          meta:{
            showLeft : true,
            showRight: true,
            title: '资源详情'
          }
        }
      ]
    },
    {
      path: '/user',
      name: "user",
      redirect: '/user/login',
      component: () =>import('@/views/layout/view.vue'),
      children: [
        {
          path: '/user/login',
          name: 'userLogin',
          component: ()=>import('@/views/user/UserLogin.vue'),
          meta: {
            showLeft: true,
            showRight: false,
            title: '登录'
          }
        }
      ]
    }
  ]
})

export default router
