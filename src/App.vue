<template>
    <!-- https://vuetifyjs.com/ru/layout/pre-defined -->
  <v-app>
      <!-- https://vuetifyjs.com/ru/components/navigation-drawers -->
    <v-navigation-drawer app 
                         temporary
                         v-model="drawer"
    > <!-- всплывающая менюшка, слева
        Директива app - свойство, которое необходимо для структуры поведения
        Параметр temporary - по-умолчанию скрывать элемент, вызывать при условии
             v-model -  -->

          <!-- https://vuetifyjs.com/ru/components/lists -->
        <v-list>
          <v-list-tile v-for="link of links"
                      :key="link.title"
                      :to="link.url"
          >   <!-- Директива @click с пустым значением добавляет определенные стили наведения -->
            <v-list-tile-action>
              <v-icon>{{link.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="link.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            v-if="isUserLoggedIn"
            @click="onLogout"
          >
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="'Выход'"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>   <!-- всплывающая менюшка, слева -->
    
      <!-- https://vuetifyjs.com/ru/components/toolbars -->
    <v-toolbar app dark color="teal lighten-0">     <!-- вверхняя часть нашего приложения -->
        <!-- dark - темная тема, цвет текста будет белый-->

          <!-- class="hidden-md-and-up" - скрывать данную иконку, когда экран md и выше -->
      <v-toolbar-side-icon @click="drawer = !drawer"
                           class="hidden-md-and-up"
      ></v-toolbar-side-icon>   <!-- иконка вызывающая дровер -->

      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Доска объявлений</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>   <!-- растояние между левой частью меню и правой -->
      
      <v-toolbar-items class="hidden-sm-and-down">    <!-- навигационные ссылки -->
        <v-btn v-for="link in links"
              :key="link.title"
              :to="link.url"
               flat
        >    
            <!-- https://vuetifyjs.com/ru/components/icons -->
              <!-- v-btn flat - кнопка -->
          <v-icon left>{{link.icon}}</v-icon>  <!-- Директива left - иконка слева от слова
            bug_report - если название иконка состоит из двух и более слов, то пишем через '_' -->
          {{link.title}}
        </v-btn>
        <v-btn
          @click="onLogout"
          flat
          v-if="isUserLoggedIn"
        >
          <v-icon left>exit_to_app</v-icon>
          Выход
        </v-btn>
      </v-toolbar-items>    <!-- навигационные ссылки -->
    </v-toolbar>    <!-- вверхняя часть нашего приложения -->

    <v-content>

        <router-view></router-view>

    </v-content>
    
      <!-- https://vuetifyjs.com/ru/components/snackbars -->
    <template v-if="error"> <!-- Показывать данный snackbar при ошибке -->
      <v-snackbar
        :timeout="5000"
        :multi-line="true"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{error}}
        <v-btn flat dark @click.native="closeError">Закрыть</v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false // По умолчанию дровер/левое меня не видно
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
      // Изменяем меня в зависимости от переменной isUserLoggedIn
    links () {
      if (this.isUserLoggedIn) {
        return [  // Если пользователь залогинен, вызываем один массив
          {title: 'Заказы', icon: 'bookmark_border', url: '/orders'},
          {title: 'Добавить', icon: 'note_add', url: '/new'},
          {title: 'Список объявлений', icon: 'list', url: '/list'}
        ]
      }
      return [  // Если пользователь не залогинен
        {title: 'Войти', icon: 'lock', url: '/login'},
        {title: 'Регистрация', icon: 'face', url: '/registration'}
      ]
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')  // При закрытии snackbar'а очищаем ошибку
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')  // Вернуться на главную страницу после выхода
    }
  }
}
</script>

<style scoped>  /*scoped - стиль предназначенный только для этого компонента*/
  .pointer{
    cursor: pointer;
  }
</style>
