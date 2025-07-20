import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: localStorage.getItem('auth_token') || '',
  tokenHead: localStorage.getItem('auth_tokenHead') || 'Bearer',
  id: parseInt(localStorage.getItem('auth_id')) || null,
  userAccount: localStorage.getItem('auth_userAccount') || '',
  userRole: localStorage.getItem('auth_userRole') || '',
  userRealName: localStorage.getItem('auth_userRealName') || null
}

const mutations = {
  SET_AUTH_DATA(state, payload) {
    state.token = payload.token
    state.tokenHead = payload.tokenHead
    state.id = payload.id
    state.userAccount = payload.userAccount
    state.userRole = payload.userRole
    state.userRealName = payload.userRealName || null
    
    // 持久化存储到localStorage
    localStorage.setItem('auth_token', payload.token)
    localStorage.setItem('auth_tokenHead', payload.tokenHead)
    localStorage.setItem('auth_id', payload.id)
    localStorage.setItem('auth_userAccount', payload.userAccount)
    localStorage.setItem('auth_userRole', payload.userRole)
    if(payload.userRealName) {
      localStorage.setItem('auth_userRealName', payload.userRealName)
    }
  },
  CLEAR_AUTH_DATA(state) {
    // 清空state
    state.token = ''
    state.tokenHead = 'Bearer'
    state.id = null
    state.userAccount = ''
    state.userRole = ''
    state.userRealName = null
    
    // 清除localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_tokenHead')
    localStorage.removeItem('auth_id')
    localStorage.removeItem('auth_userAccount')
    localStorage.removeItem('auth_userRole')
    localStorage.removeItem('auth_userRealName')
  }
}

const getters = {
  isAuthenticated: state => !!state.token,
  authToken: state => `${state.tokenHead} ${state.token}`,
  userId: state => state.id,
  userRole: state => state.userRole,
  isExpert: state => state.userRole === 'EXPERT',
  isAdmin: state => state.userRole === 'ADMIN',
  // 添加其他角色判断...
  userInfo: state => ({
    id: state.id,
    account: state.userAccount,
    role: state.userRole,
    name: state.userRealName
  })
}

const actions = {
  login({ commit }, responseData) {
    const authData = {
      token: responseData.token,
      tokenHead: responseData.tokenHead,
      id: responseData.id,
      userAccount: responseData.userAccount,
      userRole: responseData.userRole,
      userRealName: responseData.userRealName
    }
    commit('SET_AUTH_DATA', authData)
  },
  logout({ commit }) {
    commit('CLEAR_AUTH_DATA')
  },
  // 初始化store时从localStorage恢复
  initializeStore({ commit }) {
    if (localStorage.getItem('auth_token')) {
      commit('SET_AUTH_DATA', {
        token: localStorage.getItem('auth_token'),
        tokenHead: localStorage.getItem('auth_tokenHead') || 'Bearer',
        id: parseInt(localStorage.getItem('auth_id')),
        userAccount: localStorage.getItem('auth_userAccount'),
        userRole: localStorage.getItem('auth_userRole'),
        userRealName: localStorage.getItem('auth_userRealName')
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}