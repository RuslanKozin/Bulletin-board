import * as fb from 'firebase'  // Подключаем нашу базу данных

class Ad {
  constructor (title, description, ownerId, imageSrc = '', promo = false, id = null) {
      // Приватные поля
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {  // Состояние приложения
    ads: []
  },
  mutations: {  // mutations - setters - Сущность mutations позволяет мутировать/изменять что-либо.
    createAd (state, payload) {
      state.ads.push(payload) // С помощью push(добавляем новый payload)
    },
    loadAds (state, payload) {  // В данную мутацию передаем массив готовых объявлений (загрузка с сервера)
      state.ads = payload   // Обращаемся к state.ads и говорим, что он будет равняться новому payload'у
    }
  },
  actions: {  // Сущность actions нужны для работы с асинхронными действиями (серверами)
      // Для работы с базой данных используем async
    async createAd ({commit, getters}, payload) {  // Первый параметр объект, которого хранится различные полезные св-ва
      // payload.id = 'rte'
      commit('clearError')  // Очищаем всякие ошибки
      commit('setLoading', true)  // Загрузка с сервера

      // Блок try-catch для работы с асинхронными событиями
      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          payload.imageSrc,
          payload.promo
        )

        const ad = await fb.database().ref('ads').push(newAd)  // Подключаемся к базе данных и ее таблице ads.  Метод push для создания нового элемента в этой базе данных

        commit('setLoading', false)  // Загрузка закончилась
        commit('createAd', {
          ...newAd,  // Тут разворачиваем тот объект, который получили
            // Далее обновляем некоторые поля у данного объекта
          id: ad.key   // ad - объект, который мы получили из базы данных. key - это id из базы данных

        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)   // Загрузка закончена
        throw error
      }

      // commit('createAd', payload) // createAd - мутация
    },

      // Получение постов из базы данных
    async fetchAds ({commit}) {
      commit('clearError')  // Очищаем ошибки, если они есть
      commit('setLoading', true)

      const resultAds = []  // Данный массив заполняется всеми объявлениями из базы данных

      try {
        const fbVal = await fb.database().ref('ads').once('value')  // Обращаемся к база данных и ее таблице ads
          // Метод once забираем все данные
        const ads = fbVal.val()   // Метод val позволяет получить нужные данные из объекта fbVal

        Object.keys(ads).forEach(key => {   // Пробегаем по ключам объекта ads и на каждой итерации будем получать новый объект key, который будет являться нужным id-шником нужного нам объявления
          const ad = ads[key]   // В переменной ad хранятся данные, относящиеся к выбранному по id объявлению
          resultAds.push(   // Добавляем новый элемент рекламы
            new Ad(ad.title, ad.description, ad.ownerId, ad.imageSrc, ad.promo, key)
              // key - является id-шником нужного нам объявления
          )
        })

        commit('loadAds', resultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {  // Сущность getters нужны для вычисления чего-либо.
      // Внутри getters находятся функции, которые что-то возвращают после вычисления, а в качестве параметра эти функции принимают сам state.
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => {
        // return ad.promo === true
          // или сокр. вариант
        return ad.promo
      })
    },
    myAds (state) {
      return state.ads
    },
    adById (state) {  // через Замыкание
      return adId => {
        return state.ads.find(ad => ad.id === adId) // Если в id в переменной ad совпадает id с тем, который передали в функцию adId, то в таком случае будем возвращать нужный нам ad из всего массива
      }
    }
  }
}
