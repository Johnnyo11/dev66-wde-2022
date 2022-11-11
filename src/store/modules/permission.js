import { asyncRouterMap, unconfirmedRouterMap, authenticatedRouterMap, constantRouterMap } from '@/router'

/**
 * meta role
 * @param roles
 * @param route
 */
function hasPermission(role, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.indexOf(role) >= 0
  } else {
    return true
  }
}
function hasCompany(company, route) {
  if (route.meta && route.meta.company) {
    if (company) {
      return true
    }
    return false
  } else {
    return true
  }
}

/**
 * filter
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, role, company) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(role, route) && hasCompany(company, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, role)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  getters: {
    permission_routers: state => state.routers,
    addRouters: state => state.addRouters
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    RESET_ROUTERS: (state) => {
      state.addRouters = []
      state.routers = constantRouterMap
    }
  },
  actions: {
    GenerateRoutes({ commit }, { role, confirmed, awakRole, userData }) {
      return new Promise(resolve => {
        let accessedRouters
        switch (role) {
          case 'generalmanager': {
            accessedRouters = filterAsyncRouter(asyncRouterMap, role)
            break
          }
          default: {
            switch (awakRole) {
              default: {
                accessedRouters = filterAsyncRouter(authenticatedRouterMap, role)
                break
              }
            }
            break
          }
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    ResetRoutes({ commit }) {
      return new Promise(resolve => {
        commit('RESET_ROUTERS')
        resolve()
      })
    }
  }
}

export default permission
