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
    createAd ({commit}, payload) {  // Первый параметр объект, которого хранится различные полезные св-ва
      payload.id = 'rte'

      commit('createAd', payload) // createAd - мутация
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
