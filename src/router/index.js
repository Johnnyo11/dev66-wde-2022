import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/admin/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '', component: () => import('@/views/home/index'), hidden: true },
  { path: '/legal', component: () => import('@/views/legal/legal'), hidden: true },
  { path: '/privacy', component: () => import('@/views/legal/privacy'), hidden: true },
  { path: '/cookie', component: () => import('@/views/legal/cookie'), hidden: true },
]

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
  mode: 'history'
})

export const unconfirmedRouterMap = [
  { path: '/dashboard', component: () => import('@/views/unconfirmed/index'), hidden: true }
]

export const approvedRouterMap = [
  { path: '/dashboard', component: () => import('@/views/unconfirmed/index'), hidden: true }
]

export const rejectedRouterMap = [
  { path: '/dashboard', component: () => import('@/views/unconfirmed/rejected'), hidden: true }
]

export const asyncRouterMap = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: 'dashboard',
    name: 'Dashboard',
    meta: { title: 'Dashboard' },
    children: [{
      path: '',
      component: () => import('@/views/admin/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'el-icon-monitor' }
    },
    {
      path: 'instance',
      component: () => import('@/views/admin/dashboard/index'),
      name: 'New Instance',
      meta: { title: 'New Instance' },
      hidden: true
    }]
  }
]

export const authenticatedRouterMap = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: 'dashboard',
    name: 'Dashboard',
    meta: { title: 'Dashboard' },
    children: [{
      path: '',
      component: () => import('@/views/admin/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'el-icon-monitor' }
    },
    {
      path: 'instance',
      component: () => import('@/views/admin/dashboard/index'),
      name: 'New Instance',
      meta: { title: 'New Instance' },
      hidden: true
    }]
  }
]
