<template>
  <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">		<!-- elevation - box-shadow - тень -->
              <v-toolbar dark color="teal lighten-0">
                <v-toolbar-title>Регистрация</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form" lazy-validation>
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
                  <v-text-field
                    prepend-icon="lock" 
                    name="confirm-password" 
                    label="Подтвердите пароль" 
                    type="password"
                    :counter="6"
                    v-model="confirmPassword"
                    :rules="confirmPasswordRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  color="primary"
                  @click="onSubmit"
                  :loading="loading"
                  :disabled="!valid || loading"
                >Зарегистрироваться</v-btn>
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
      confirmPassword: '',
      valid: false,
      emailRules: [
        v => !!v || 'Введите свой e-mail / E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Некорректный e-mail / E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Пароль должен состоять из 6 и более символов / Password must be equal or more than 6 characters.'
      ],
      confirmPasswordRules: [
        v => !!v || 'Password is required',
        v => v === this.password || 'Пароль не соответствует / Password should match'
        // Если значение, которое сейчас в текстовом импуте для confirmPassworda(подтверждения пароля) совпадает со значением поля password, то будет true
        // А если не совпадает, то будет выведена ошибка.
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
          // Обработка регистрации пользователя
        this.$store.dispatch('registerUser', user)
        .then(() => {
          this.$router.push('/')  // Переходим на главную страницу после регистрации пользователя
        })
        .catch(() => {})

        // В методе dispatch получаем ответ promise, поэтому можем обратиться к нему через метод then или через метод catch
      }
    }
  }
}
</script>
