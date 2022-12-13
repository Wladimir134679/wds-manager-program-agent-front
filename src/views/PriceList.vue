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
      <v-col>
        <v-card >
          <v-card-title class="text-center">
            Тарифы
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col :class="cardClass" v-for="price in priceList" :key="price.name">
        <v-hover v-slot="{ isHovering, props }">
          <v-card  v-bind="props"
                   :elevation="isHovering ? 24 : 6" class="mx-auto pa-6">
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
                  <b>{{ price.priceDev.toFixed(2) }}</b> рублей в месяц
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
        </v-hover>
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
          "name": "Минимум",
          "description": "Простой проект для себя и своих близких. Частному лицу базовый пакет",
          "priceDev": 2500.0,
          "priceOps": 1000.0,
          "priceServer": 300.0,
          "tag": ["telegram", "vk", "вычисления"]
        },
        {
          "name": "Для аудитории",
          "description": "Программный агент, а точнее социальный бот для общего пользования маленькой группы",
          "priceDev": 10000.0,
          "priceOps": 5000.0,
          "priceServer": 1000.0,
          "tag": ["telegram", "vk"]
        },
        {
          "name": "Для крупных площадок",
          "description": "Для крупных клиентов, с большим потоком пользователей",
          "priceDev": 30000.0,
          "priceOps": 10000.0,
          "priceServer": 5000.0,
          "tag": ["telegram", "vk"]
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>