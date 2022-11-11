import Cookies from 'js-cookie'

const app = {
  state: {
    globalSidebar: {
      opened: !+Cookies.get('globalSidebarStatus'),
      withoutAnimation: false
    },
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    signInPopup: {
      opened: false,
      subscribe: false
    },
    device: 'desktop',
    burgerAllowed: true
  },
  getters: {
    globalSidebar: state => state.globalSidebar,
    sidebar: state => state.sidebar,
    signInPopup: state => state.signInPopup,
    device: state => state.device,
    burgerAllowed: state => state.burgerAllowed
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_GLOBAL_SIDEBAR: state => {
      if (state.globalSidebar.opened) {
        Cookies.set('globalSidebarStatus', 1)
      } else {
        Cookies.set('globalSidebarStatus', 0)
      }
      state.globalSidebar.opened = !state.globalSidebar.opened
      state.globalSidebar.withoutAnimation = false
    },
    CLOSE_GLOBAL_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('globalSidebarStatus', 1)
      state.globalSidebar.opened = false
      state.globalSidebar.withoutAnimation = withoutAnimation
    },
    OPEN_SIGN_IN_POPUP: (state, subscribe) => {
      state.signInPopup.opened = true
      state.signInPopup.subscribe = subscribe
    },
    CLOSE_SIGN_IN_POPUP: state => {
      state.signInPopup.opened = false
      state.signInPopup.subscribe = false
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    ENABLE_BURGER_ALLOWED: state => {
      state.burgerAllowed = true
    },
    DISABLE_BURGER_ALLOWED: state => {
      state.burgerAllowed = false
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleGlobalSideBar: ({ commit }) => {
      commit('TOGGLE_GLOBAL_SIDEBAR')
    },
    CloseGlobalSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_GLOBAL_SIDEBAR', withoutAnimation)
    },
    OpenSignInPopup({ commit }, { subscribe }) {
      commit('OPEN_SIGN_IN_POPUP', subscribe)
    },
    CloseSignInPopup({ commit }) {
      commit('CLOSE_SIGN_IN_POPUP')
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    EnableBurgerAllowed({ commit }) {
      commit('ENABLE_BURGER_ALLOWED')
    },
    DisableBurgerAllowed({ commit }) {
      commit('DISABLE_BURGER_ALLOWED')
    }
  }
}

export default app
