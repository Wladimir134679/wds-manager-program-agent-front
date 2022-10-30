<template>

  <v-container>
    <v-card>
      <v-card-title>
        Главная страница
      </v-card-title>
      <v-card-text>
        Информация о проекте можно посмотреть
        <router-link to="/about-the-project">тут</router-link>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>
        Test charts
      </v-card-title>
      <v-card-actions>
        <apexchart :height="200" :width="500" :series="series" :options="options"/>
      </v-card-actions>
    </v-card>
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
          type: "datetime"
        }
      },
      series: [{
        name: 'series-1',
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