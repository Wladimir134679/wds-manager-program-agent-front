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
      <v-col class="v-col-6">
        <v-card>
          <v-card-title>
            Наши контакты
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="5">
                <b>Телеграм</b>
              </v-col>
              <v-col>
                @usernameTG
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5">
                <b>Электронная почта</b>
              </v-col>
              <v-col>
                username@mail.ru
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5">
                <b>Номер телефона</b>
              </v-col>
              <v-col>
                +7 900 123 76 57
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>
            Информация
          </v-card-title>
          <v-card-text>
            Текущая информационная система была разработа для курсовой работы по
            предмету "Проектирование вычислительных систем" по направлению "Информатика и вычислетельная техника"
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