import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
// import getters from './getters'
// import mutations from './mutations'
// import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  modules: {
    app,
    user,
    permission
  },
  // getters,
  // mutations,
  // actions,
  strict: false,
  plugins: [createPersistedState({
    key: process.env.COOKIE,
    paths: ['user']
  })]
})

export default store
