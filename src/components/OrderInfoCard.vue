<template>
  <v-card :loading="loadingProgramAgents || loadingUsers">
    <v-card-title>
      Заказ №{{ order.id }}
    </v-card-title>
    <v-card-text v-if="!(loadingProgramAgents && loadUsers)">
      <v-row>
        <v-col cols="4">
          Програмный агент
        </v-col>
        <v-col>
          <b>{{ getProgramAgent(order.programAgentId).name }}</b>
        </v-col>
        <v-col>
          <v-btn size="small" href="/" block>
            Перейти
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="isAdmin">
        <v-col cols="4">
          Пользователь
        </v-col>
        <v-col>
          {{ getUser(order.customerId).username }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          Сумма
        </v-col>
        <v-col>
          {{ order.amount }} монет в <b>{{ nameInterval(order) }}</b>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          Создан
        </v-col>
        <v-col>
          {{ new Date(order.createTimestamp).toLocaleString() }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          Последние списание
        </v-col>
        <v-col v-if="!!order.lastProcessingTimestamp">
          {{ new Date(order.lastProcessingTimestamp).toLocaleString() }}
        </v-col>
        <v-col v-else>
          Нет данных
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";
import userProfileData from "@/mixins/userProfileData";

export default {
  name: "OrderInfoCard",
  data() {
    return {
    }
  },
  mixins: [userProfileData],
  props: {
    order: {
      type: Object
    },
    loadingProgramAgents: {type: Boolean, default: true},
    loadingUsers: {type: Boolean, default: true},
  },
  computed: {
    ...mapGetters({
      getProgramAgent: "programAgents/getAgentInfo",
      getUser: "users/getUserById",
    })
  },
  methods: {
    nameInterval: (order) => {
      switch (order.intervalType) {
        case 'DAY':
          return "день"
        case 'WEEK':
          return "неделю"
        case 'MONTH':
          return "месяц"
        case 'SIX_MONTHS':
          return "полгода"
      }
      return 'none'
    },
  }
}
</script>

<style scoped>

</style>