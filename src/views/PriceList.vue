<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Информация о ценах
          </v-card-title>
          <v-card-text>
            Предоставлены базовые пакеты разработки. По ним Вы можите предположить примерную стоимость проекта.
            <br>
            <br>
            Стоимость примерная, вся оценка по техническому заданию(ТЗ) будет проводиться менеджерами и командой
            разработчиков, как по срокам, так и по стоимости.
            <br><br>
            После выбора тарифа, свяжитесь с нами, для предоставления ТЗ и обговорения сроков и стоимости.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col :class="cardClass" v-for="price in priceList" :key="price.name">
        <v-card>
          <v-card-title>
            {{ price.name }}
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                {{ price.description }}
              </v-col>
            </v-row>
            <v-row>
              <v-col class="px-5">
                <b>Цены:</b>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="v-col-6">
                За разработку
              </v-col>
              <v-col>
                <b>{{ price.priceDev.toFixed(2) }}</b> рублей
              </v-col>
            </v-row>
            <v-row>
              <v-col class="v-col-6">
                За развертывание
              </v-col>
              <v-col>
                <b>{{ price.priceOps.toFixed(2) }}</b> рублей
              </v-col>
            </v-row>
            <v-row>
              <v-col class="v-col-6">
                За аренду
              </v-col>
              <v-col>
                <b>{{ price.priceDev.toFixed(2) }}</b> рублей
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-chip-group>
              <v-chip v-for="tag in price.tag" :key="tag">
                {{ tag }}
              </v-chip>

            </v-chip-group>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PriceList",
  data() {
    return {
      cardClass: "v-col-md-4 v-col-12",
      priceList: [
        {
          "name": "Для себя",
          "description": "Простой проект, пользоваться будите только сами. Это может быть помощньник в соц сетях, сервер для вашего проекта, " +
              "а может это файловое хранилище для себя",
          "priceDev": 2500.0,
          "priceOps": 1000.0,
          "priceServer": 300.0,
          "tag": ["telegram", "vk", "вычисления"]
        },
        {
          "name": "Для друзей",
          "description": "Проект которым будут пользоваться Ваши друзья и знакомые! " +
              "Это может быть совместное хранилище, совместный сервер или бот в соц сетях, помогающий Вам общаться",
          "priceDev": 2500.0,
          "priceOps": 1500.0,
          "priceServer": 500.0,
          "tag": ["telegram", "vk", "вычисления"]
        },
        {
          "name": "Маленькая аудитория",
          "description": "Проект покрупнее, тут уже мало друзей. Тут могут приходить люди, которых Вы не знаете, пользоваться как открыто, так и закрыто по ссылкам, " +
              "как Вам будет удобно и желанно. ",
          "priceDev": 5000.0,
          "priceOps": 2500.0,
          "priceServer": 1000.0,
          "tag": ["telegram"]
        },
        {
          "name": "Средняя аудитория",
          "description": "У Вас свой интернет магазин и хотите его разместить в социальных сетях? У Вас есть крупные чаты, где нужен бот-помощник? Тогда это для Вас)",
          "priceDev": 7500.0,
          "priceOps": 5000.0,
          "priceServer": 1000.0,
          "tag": ["telegram"]
        },
        {
          "name": "Большая аудитория",
          "description": "У Вас большой поток пользователей в сутки? Это для Вас решение",
          "priceDev": 10000.0,
          "priceOps": 7500.0,
          "priceServer": 5000.0,
          "tag": ["telegram"]
        },
        {
          "name": "Очень большая аудитория",
          "description": "Вы Яндекс? Вы Амазон? Вы Гугл? Вы крупный игрок на рынке? Для Вас решение найдено",
          "priceDev": 20000.0,
          "priceOps": 15000.0,
          "priceServer": 10000.0,
          "tag": ["telegram"]
        },
        {
          "name": "Вычисления",
          "description": "Программный агент, который вычисляет, считает, собирает статистику откуда угодно",
          "priceDev": 1000.0,
          "priceOps": 500.0,
          "priceServer": 200.0,
          "tag": ["вычисления"]
        },
        {
          "name": "Интеграция",
          "description": "Интегрировать какую либо автоматику в Ваш сервис. Сделать перенос данных по всем соц сетям, дублирование информации и прочие",
          "priceDev": 2000.0,
          "priceOps": 1000.0,
          "priceServer": 300.0,
          "tag": ["telegram", "vk", "other"]
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>