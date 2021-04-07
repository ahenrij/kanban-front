import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import authModule from './modules/auth'
import dataModule from './modules/data'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
      auth: authModule,
      data: dataModule
  },
  plugins: [createPersistedState()],
  strict: debug
})

export default store