<template>

  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Главная страница
          </v-card-title>
          <v-card-text>
            Информация о проекте можно посмотреть
            <router-link to="/about-the-project">тут</router-link>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Test charts
          </v-card-title>
          <v-card-text>
            <apexchart class="pa-5" width="100%" height="300" :series="series" :options="options"/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      options: {
        stroke: {
          curve: 'straight',
        },
        chart: {
          id: 'vuechart-example',
        },
        markers: {
          size: 4,
        },
        xaxis: {
          type: "datetime",
          title: {
            text: "Время"
          }
        },
        yaxis: {
          title: {
            text: "Пользователи"
          }
        }
      },
      series: [{
        name: 'Подписка',
        data: [
          {
            x: new Date(2022, 10, 10).getTime(),
            y: 10
          },
          {
            x: new Date(2022, 10, 12).getTime(),
            y: 11
          },
          {
            x: new Date(2022, 10, 13).getTime(),
            y: 12
          },
          {
            x: new Date(2022, 10, 20).getTime(),
            y: 15
          },
          {
            x: new Date(2022, 10, 21).getTime(),
            y: 10
          },
          {
            x: new Date(2022, 10, 22).getTime(),
            y: 20
          },
          {
            x: new Date(2022, 10, 23).getTime(),
            y: 14
          },
        ]
      }]
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>