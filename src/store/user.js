// npm i firebase -S - библиотека для оиправки Ajax запросов (-S - зависимость для продакшн сборки)

import * as fb from 'firebase'

class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {  // Состояние приложения
    user: null
  },
  mutations: {  // mutations - setters - Сущность mutations позволяет мутировать/изменять что-либо.
    setUser (state, payload) {
      state.user = payload  // Изменяем state.user на тот payload, который нам пришел
    }
  },
  actions: {  // Сущность actions нужны для работы с асинхронными действиями (серверами)
      // Необходимо обработать действия приходящих с различных страниц
    async registerUser ({commit}, {email, password}) {  // async - асинхронная функция
      commit('clearError')  // Очищение разных ошибок, которые придут с сервера и которые мы сможем показывать
      commit('setLoading', true)  // Статус загрузки (payload - true)

      // И после того, как нам ответит сервер
          // Первый вариант
      try {
        const user = await fb.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        commit('setLoading, false')
      } catch (error) {
        commit('setLoading, false')
        commit('setError, error.message')
        throw error
      }

          // Второй вариант
      // const user = await fb.auth().createUserWithEmailAndPassword(email, password)
      //     мы будем ожидать, что-нибудь асинхронное из данной функции и то, что вернется попадет в перем. user
      //  .then(user => {
      //     // Метод auth возвращает объект у которого будет много полей позволяющих работать с пользователем
      //     // Метод createUserWithEmailAndPassword возвращает промис, который мы может обработать в методе .then
      //   // uid - user id
      //   commit('setUser', new User(user.uid)) // Вызываем мутацию
      //   commit('setLoading, false') // Ответ сервера
      // })
      // .catch(error => {  // Обработчик событий
      //   commit('setLoading, false')
      //   commit('setError, error.message')
      // })
    },
    async loginUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
      // Сохранение авторизации пользователя после перезагрузки стр.
    autoLoginUser ({commit}, payload) {
      commit('setUser', new User(payload.uid))
    },
      // Выход пользователя
    logoutUser ({commit}) {
      fb.auth().signOut()   // Выход
      commit('setUser', null)   // Установка пользователя на ноль
    }
  },
  getters: {  // Сущность getters нужны для вычисления чего-либо.
    // Внутри getters находятся функции, которые что-то возвращают после вычисления, а в качестве параметра эти функции принимают сам state.
    user (state) {
      return state.user // Возвращаем нашего юзера
    },
    isUserLoggedIn (state) {
      return state.user !== null  // Если в state user не равняется нулю, то user уже зарегистрирован
    }
  }
}
