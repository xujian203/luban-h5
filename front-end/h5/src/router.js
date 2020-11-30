import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Home from './views/work-manager/index.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      redirect: '/work-manager/list',
      children: [
        {
          path: '/work-manager/list',
          name: 'work-manager-list',
          component: () => import('@/views/work-manager/list.vue')
        },
        {
          path: '/work-manager/templates',
          name: 'work-manager-templates',
          component: () => import('@/views/work-manager/templates.vue')
        },
        {
          path: '/work-manager/form-stat',
          name: 'form-stat',
          component: () => import('@/views/work-manager/form-stat/index.vue')
        },
        {
          path: '/work-manager/stat-detail/:id',
          name: 'stat-detail',
          component: () => import('@/views/work-manager/form-stat/detail.vue')
        }
      ]
    },
    {
      path: '/editor/:workId', // #!zh 编辑器页面，核心功能部分
      name: 'editor',
      component: () => import('./views/Editor.vue')
    },
    {
      path: '/preview/:id',
      name: 'preview',
      component: () => import('./views/preview.js')
    },
    {
      path: '/webapp/:id',
      name: 'webapp',
      component: () => import('./views/webApp/appMain.vue'),
      children: [
        {
          path: '',
          name: 'webap-login',
          component: () => import('@/views/webApp/login.vue')
        },
        {
          path: 'route/',
          name: 'web-app-route',
          component: () => import('@/views/webApp/masterPage.js'),
          children: [
            {
              path: ':pageId',
              name: 'dynamic-page',
              component: () => import('@/views/webApp/dynamicWebPage.js')
            }
            // {
            //   path: '',
            //   name: 'dynamic-home',
            //   component: () => import('@/views/webApp/dynamicWebPage.js')
            // }
          ]
        }
      ]
    }
  ]
})
