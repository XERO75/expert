import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var state = {
  currentView: 'delivery-address'
}

const mutations = {
  changeCurrentView (state, currentView) {
    state.currentView = currentView
  }
}

const getters = {
}

const actions = {
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})