import Vue from 'vue'
import Vuex from 'vuex'
import api from '../service/menu'
import axios from '../utils/axios'

let shopStore = {
  state: {
    MENU_TREE: [],
    RETRY_REQUEST: [],
    RETRY: false
  },
  getters: {
    menuTree: (state) => {
      return state.MENU_TREE
    },
    retryRequest: (state) => {
      return state.RETRY_REQUEST
    },
    retry: (state) => {
      return state.RETRY
    }
  },
  mutations: {
    UPDATE_MENU_TREE (state, menuTree) {
      state.MENU_TREE = menuTree
    },
    PUSH_REQUEST (state, item) {
      state.RETRY = true
      state.RETRY_REQUEST.push(item)
    }
  },
  actions: {
    updateMenuTree ({ commit }) {
      api.getMenuTree().then(res => {
        commit('UPDATE_MENU_TREE', res)
      })
    },
    pushREQUEST ({ commit }, item) {
      commit('PUSH_REQUEST', item)
    },
    retryRequest ({ state, dispatch }) {
      if (state.RETRY_REQUEST.length === 0) {
        state.RETRY = false
        return
      }
      let { option, resolve, reject } = state.RETRY_REQUEST.shift()
      axios(option).then(res => {
        if (!res.data) {
          resolve(res)
        } else {
          resolve(res.data)
        }
        dispatch('retryRequest')
      }).catch(error => {
        reject(error)
      })
    }
  }
}

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    shopStore
  }
})
export default store
