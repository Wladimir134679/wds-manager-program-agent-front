<template>
  <v-card :loading="loadingProgramAgents">
    <v-card-title>
      Заказ №{{ order.id }}
    </v-card-title>
    <v-card-text v-if="!(loadingProgramAgents && loadUsers)">
      <v-row v-if="!!getProgramAgent(order.programAgentId)">
        <v-col cols="4">
          Програмный агент
        </v-col>
        <v-col>
          <b>{{ thisProgramAgentData(order.programAgentId).name }}</b>
        </v-col>
        <v-col>
          <v-btn size="small" :to="'/program-agent/' + thisProgramAgentData(order.programAgentId).id" block>
            Перейти
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <b>Не доступный програмный агент</b>
        </v-col>
      </v-row>
      <v-row v-if="isAdmin">
        <v-col cols="4">
          Пользователь
        </v-col>
        <v-col>
          <b>{{ getUser(order.customerId).username }}</b>
        </v-col>
        <v-col>
          <v-btn size="small" href="/" block>
            Перейти
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          Сумма
        </v-col>
        <v-col>
          <b>{{ order.amount }}</b> монет за 30 дней
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
          Следующие списание
        </v-col>
        <v-col v-if="!!order.nextWriteOffTimestamp">
          {{ new Date(order.nextWriteOffTimestamp).toLocaleString() }}
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
      <receipt-edit-card
          :order="order"
          :close-dialog-func="closeEdit"/>
    </v-dialog>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";
import userProfileData from "@/mixins/userProfileData";
import orderApi from "@/api/receiptApi";
import ReceiptEditCard from "@/components/ReceiptEditFormCard";

export default {
  name: "ReceiptInfoCard",
  components: {ReceiptEditCard},
  data() {
    return {
      openEdit: false,
    }
  },
  mixins: [userProfileData],
  mounted() {
  },
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
    }),
  },
  methods: {
    closeEdit() {
      this.openEdit = false
      this.updateList()
    },
    editThis() {
      this.openEdit = true
    },
    deleteThis() {
      orderApi.deleteOrder(this.order.id, (ok) => {
        this.updateList()
      }, error => {
        this.updateList()
      })
    },
    thisProgramAgentData(id) {
      return this.getProgramAgent(id)
    }
  }
}
</script>

<style scoped>

</style>