import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    logged: false,
    token: ''
  },
  mutations: {
    SET_LOGGED(state, status) {
      state.logged = status
    },
    SET_TOKEN(state, status) {
      state.token = status
    },
  },
  getters:{
    logged: state => state.logged,
    token: state => state.token
  },
  actions: {
  },
  modules: {
  }
})

export default store