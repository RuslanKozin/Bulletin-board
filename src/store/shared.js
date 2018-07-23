// Данный store отвечает за какие-то общие вещи, например (вывод ошибок, показ стайта лодинга - т.е. что что-то происходит с сервером)

export default {
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    setLoading ({commit}, payload) {
      commit('setLoading', payload)
    },
    setError ({commit}, payload) {
      commit('setError', payload)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
  // Теперь у нас специальные методы, которые будут говорить нашему приложению о том, что мы можем показывать какие-то ошибки и лоадинг
}
