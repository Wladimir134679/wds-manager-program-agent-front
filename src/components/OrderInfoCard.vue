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
    <v-card-actions v-if="isAdmin">
      <v-row>
        <v-col>
          <v-btn
              variant="outlined"
              block
              @click="editThis">
            Редактировать
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
              variant="outlined"
              block
              @click="deleteThis">
            Удалить
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
    <v-dialog v-model="openEdit">
      <order-edit-card
      :order="order"
      :close-dialog-func="closeEdit"/>
    </v-dialog>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";
import userProfileData from "@/mixins/userProfileData";
import orderApi from "@/api/orderApi";
import OrderEditCard from "@/components/OrderEditFormCard";

export default {
  name: "OrderInfoCard",
  components: {OrderEditCard},
  data() {
    return {
      openEdit: false,
    }
  },
  mixins: [userProfileData],
  props: {
    order: {
      type: Object
    },
    updateList: {type: Function},
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
    closeEdit(){
      this.openEdit = false
      this.updateList()
    },
    editThis(){
      this.openEdit = true
    },
    deleteThis() {
      orderApi.deleteOrder(this.order.id, (ok) => {
        this.updateList()
      }, error =>{
        this.updateList()
      })
    }
  }
}
</script>

<style scoped>

</style>