import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
// import Layout from './views/layout/Layout'
// import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// const whiteList = ['/login']// no redirect whitelist
router.beforeEach((to, from, next) => {
  document.title = 'IDE'
  NProgress.start() // start progress bar

  if (localStorage[process.env.COOKIE]) {
    if (JSON.parse(localStorage[process.env.COOKIE]).user.token) { // determine if there has token
      /* has token*/
      if (to.path === '/login' || to.path === '/') {
        next({ path: '/dashboard' })
        NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
      } else {
        if (!store.getters.permission_routers) {
          store.dispatch('GetInfo').then(res => { // user_info
            store.dispatch('GenerateRoutes', { role: res.role.type, confirmed: res.confirmed, awakRole: res.awakRole, userData: res.userData }).then(() => { // roles
              router.addRoutes(store.getters.addRouters)
              // console.log('...to', ...to)
              next({ ...to, replace: true }) // hack addRoutes ,set the replace: true so the navigation will not leave a history record
              // next()
            })
          }).catch((err) => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || 'Verification failed, please login again')
              next({ path: '/dashboard' })
            })
          })
        } else {
          next()
        }
      }
    } else {
      /* has no token*/
      if ((/\/dashboard/g).test(to.path)) {
        // next('/login')
        next('/')
        NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if ((/\/dashboard/g).test(to.path)) {
      // next('/login')
      next('/')
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
