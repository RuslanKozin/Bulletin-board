<template>
  <v-container>
    <v-layout row>	<!-- row - выравнивает по строке -->
      <v-flex xs12 sm6 offset-sm3>
        <!-- xs12 - на очень маленьких на всю ширину
             sm6 - на маленьких делить отображение на 2 
             offset-sm3 - на маленьких экранах будет офсет по середине-->
          
          <!-- https://vuetifyjs.com/ru/layout/spacing ->mb-3 -->
        <h1 class="text--secondary mb-3">Заказы</h1>

          <!-- https://vuetifyjs.com/ru/components/lists -->
        <v-list two-line subheader>
          <v-list-tile 
            avatar
            v-for="order in orders"
            :key="order.id"
          >
            <v-list-tile-action>
                <!-- https://vuetifyjs.com/ru/components/selection-controls -> color="success" -->
              <v-checkbox
                color="success"
                :input-value="order.done"
                @change="markDone(order)"
              ></v-checkbox>
                <!-- @change - прослушка событий при изменении -->
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{order.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{order.phone}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <!-- :to="'/ad/' + order.adId" - ссылка, которая ведет на страницу ad -->
              <v-btn
                :to="'/ad/' + order.adId"
                class="primary"
              >Открыть</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      orders: [
        {
          id: 'sdf3',
          name: 'Vahalbey',
          phone: '8 904 23 43 234',
          adId: '123',   // id того объявления по которому сделали заказ
          done: false
        }
      ]
    }
  },
  methods: {
    markDone (order) {
      order.done = true
    }
  }
}
</script>
