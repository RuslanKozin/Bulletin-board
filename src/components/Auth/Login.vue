<template>
    <!-- https://vuetifyjs.com/ru/examples/layouts/centered -->
  <v-container fluid fill-height>
        <v-layout align-center justify-center>  <!-- центрируем по ширине и по высоте -->
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">		<!-- elevation - box-shadow - тень -->
              <v-toolbar dark color="teal lighten-0">
                <v-toolbar-title>Вход</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form" validation>
                  <!-- ref="form" - локальная референция к форме
                    Директива validation нужна для валидации внутренних элементов форм
                   -->
                  <v-text-field 
                    prepend-icon="person"
                    name="email" 
                    label="Введите свой email" 
                    type="email"
                    v-model="email"
                    :rules="emailRules"
                  ></v-text-field>
                    <!-- v-model="email" - привязываем данные из script к форме -->
                  <v-text-field
                    prepend-icon="lock" 
                    name="password" 
                    label="Введите свой пароль" 
                    type="password"
                    :counter="6"
                    v-model="password"
                    :rules="passwordRules"
                  ></v-text-field>
                  <!-- :counter="6" - пароль должен состоять не меньше, чем из 6 символов -->
                </v-form>
              </v-card-text>
              <v-card-actions>  <!-- секция для кнопок -->
                <v-spacer></v-spacer>
                <v-btn 
                  color="primary"
                  @click="onSubmit"
                  :loading="loading"
                  :disabled="!valid || loading"
                >Войти</v-btn>
                  <!-- :disabled="!valid" - блокировать кнопку если форма не валидна -->
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      valid: false,
      emailRules: [
        v => !!v || 'Введите свой e-mail / E-mail is required',   // Если значение возвращает false, т.е. значения в поле нет, выводить ошибку! а если значение возвращает true, то ошибки не будет и начнется проверка email
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Некорректный e-mail / E-mail must be valid'  // Если значение возвращает true, то это email и с ним все в порядке, а если значение вернет false, то появится сообщение об ошибке.
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Пароль должен состоять из 6 и более символов / Password must be equal or more than 6 characters.'
      ]
    }
  },
  computed: {
    loading () {  // Достает значение state по loading'у
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit () { // Логика для кнопки отправки данных формы
      if (this.$refs.form.validate()) { // Обращаемся к локальной референции form - она есть в нашей форме 'ref="form"' (если форма валидированна)
        const user = {
          email: this.email,
          password: this.password
        }
          // Обработка логина пользователя
        this.$store.dispatch('loginUser', user)   // Вызываем у store метод dispatch/login с объектом user
          .then(() => {
            this.$router.push('/')  // Переходим на главную страницу после успешного входа(логина) пользователя
          })
          .catch(() => {})
      }
    }
  },
  created () {
    if (this.$route.query['loginError']) { // Если у текущего роута есть параметр loginError
      this.$store.dispatch('setError', 'Пожалуйста, авторизуйтесь, чтобы получить доступ к этой странице')
    }
  }
}
</script>
