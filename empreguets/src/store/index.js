import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    logged: false
  },
  mutations: {
    SET_LOGGED(state, status) {
      state.logged = status
    },
  },
  getters:{
    logged: state => state.logged
  },
  actions: {
  },
  modules: {
  }
})

export default store