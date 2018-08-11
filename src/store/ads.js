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
    ads: [
      {
        title: 'First ad',
        description: 'Hello i am description',
        promo: false,
        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        id: '123'
      },
      {
        title: 'Second ad',
        description: 'Hello i am description',
        promo: true,
        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        id: '1234'
      },
      {
        title: 'Third ad',
        description: 'Hello i am description',
        promo: true,
        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        id: '12345'
      }
    ]
  },
  mutations: {  // mutations - setters - Сущность mutations позволяет мутировать/изменять что-либо.
    createAd (state, payload) {
      state.ads.push(payload) // С помощью push(добавляем новый payload)
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
