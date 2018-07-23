<template>
  <v-container>
    <v-layout row>	<!-- row - выравнивает по строке -->
      <v-flex xs12>
        <v-card>
            <!-- v-card-media - для вставки медиа-файлов(картинок, видео) -->
              <!-- :src="ad.imageSrc" - динамический вывод данных адреса картинки из Vue.js в шаблон -->
          <v-card-media
            :src="ad.imageSrc"
            height="300px"
          ></v-card-media>
          <v-card-text>
            <h1 class="text--primary">{{ ad.title }}</h1>
            <p>{{ ad.description }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="warning" flat>Редактивароть</v-btn>
            <v-btn class="success">Купить</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],  // Получение id из router/index.js
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    }
  }
}
</script>
