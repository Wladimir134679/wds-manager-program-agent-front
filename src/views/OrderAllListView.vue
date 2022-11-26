<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card :loading="loading">
          <v-card-title>
            Заказы
          </v-card-title>
        </v-card>
      </v-col>
      <v-col class="v-col-md-6 v-col-12"
             v-for="order in orders" :key="order.id">
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
                {{ getProgramAgent(order.programAgentId).name }}
              </v-col>
            </v-row>
            <v-row>
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
                {{ order.amount }} монет в {{ nameInterval(order) }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import isAuthViewRedirect from "@/mixins/isAuthViewRedirect";
import userProfileData from "@/mixins/userProfileData";
import orderApi from "@/api/orderApi";
import {mapActions, mapGetters} from "vuex";


export default {
  name: "OrderAllListView",
  mixins: [isAuthViewRedirect, userProfileData],
  data() {
    return {
      loading: true,
      loadingProgramAgents: true,
      loadingUsers: true,
      orders: []
    }
  },
  computed: {
    ...mapGetters({
      getProgramAgent: "programAgents/getAgentInfo",
      getUser: "users/getUserById",
      getAllUser: "users/getUsersList",
      getAllProgramAgent: "programAgents/getAll"
    })
  },
  mounted() {
    this.loading = true
    orderApi.getAllListOrder(
        (ok) => {
          this.loading = false
          this.orders = ok.data
        }, error => {
          this.loading = false
        })

    if (this.getAllProgramAgent === undefined || !this.getAllProgramAgent) {
      this.loadingProgramAgents = true
      this.loadProgramAgents({
        ok: () => {
          this.loadingProgramAgents = false
        }, error: () => {
        }
      })
    } else {
      this.loadingProgramAgents = false
    }

    if (this.getAllUser === undefined || !this.getAllUser) {
      this.loadingUsers = true
      this.loadUsers({
        ok: () => {
          this.loadingUsers = false
        }, error: () => {
        }
      })
    } else {
      this.loadingUsers = false
    }
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
    ...mapActions({
      loadProgramAgents: "programAgents/loadAll",
      loadUsers: "users/load"
    })
  }
}
</script>

<style scoped>

</style>