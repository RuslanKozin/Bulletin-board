import Vue from 'vue'
import Vuex from 'vuex'
import ads from './ads'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({   // Экспортируем по-умолчанию новый экземпляр класса Vuex.Store
  modules: {  // Подключение нескольких сущностей/модулей, которые будут в приложении
    ads, user, shared
  }
})
