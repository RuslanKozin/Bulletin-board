import store from '../store'  // Подключаем store, чтобы понять какое состояние сейчас у юзера

export default function (to, from, next) {  // Функция next позволяет делать навигацию между роутами
  if (store.getters.user) { // Если user не равняется нулю, то выполняем функцию next
    next()
  } else {  // Иначе переадресуем на страницу авторизации
    next('/login?loginError=true')
  }
}
