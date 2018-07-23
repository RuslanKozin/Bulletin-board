<template>
  <v-container>
    <v-layout row>	<!-- row - выравнивает по строке -->
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Добавление нового объявления</h1>
        <v-form v-model="valid" ref="form" validation class="mb-3">
          <!-- ref="form" - локальная референция к форме
            Директива validation нужна для валидации внутренних элементов форм
           -->
          <v-text-field
            name="title" 
            label="Введите заголовок объявления" 
            type="text"
            v-model="title"
            required
            :rules="[v => !!v || 'Введите заголовок объявления / Title is required']"
          ></v-text-field>
            <!-- v-model="email" - привязываем данные из script к форме -->
          
          <v-text-field
            name="description" 
            label="Добавьте описание объявления" 
            type="text"
            v-model="description"
            multi-line
            :rules="[v => !!v || 'Добавьте описание объявления / Description is required']"
          ></v-text-field>
          <!-- :counter="6" - пароль должен состоять не меньше, чем из 6 символов -->
        </v-form>

        <v-layout row class="mb-3">
          <v-flex xs12>
              <!-- https://vuetifyjs.com/ru/components/buttons -->
            <v-btn class="warning">
              Загрузить
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <!-- <img src="" height="150"> -->
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <img src="" height="100">
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <v-switch
              label="Добавить в слайдер"
              v-model="promo"
              color="primary"
            ></v-switch>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              class="success" 
              @click="createAd"
            >Добавить</v-btn>
          </v-flex>
        </v-layout>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate()) { // Если форма валидна
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo
        }

        this.$store.dispatch('createAd', ad)
      }
    }
  }
}
</script>
