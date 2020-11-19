import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    logged: false,
    token: '',
    userData: null,
    profileData: null,
    authenticated: true
  },
  mutations: {
    SET_LOGGED(state, status) {
      state.logged = status
    },
    SET_TOKEN(state, status) {
      state.token = status
    },
    SET_USER_DATA(state, status) {
      state.userData = status
    },
    SET_PROFILE_DATA(state, status) {
      state.profileData = status
    },
    SET_AUTHENTICATED(state, status) {
      state.authenticated = status
    },
  },
  getters:{
    logged: state => state.logged,
    token: state => state.token,
    userData: state => state.userData,
    profileData: state => state.profileData,
    authenticated: state => state.authenticated,
  },
  actions: {
  },
  modules: {
  }
})

export default store