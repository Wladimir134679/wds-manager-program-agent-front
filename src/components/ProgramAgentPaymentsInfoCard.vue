<template>
  <v-card :loading="loadingProgramAgents">
    <v-card-title v-if="!infoForAgent">
      Платеж за

      <router-link :to="'/program-agent/' + thisProgramAgentData(order.programAgentId).id" v-if="!(loadingProgramAgents)">{{ thisProgramAgentData(order.programAgentId).name }}</router-link>
<!--      <v-btn v-if="!infoForAgent" -->
<!--             variant="tonal" -->
<!--             class="float-right"-->
<!--             :to="'/program-agent/' + thisProgramAgentData(order.programAgentId).id">-->
<!--      </v-btn>-->
    </v-card-title>
    <v-card-title v-if="infoForAgent">
      Плата за агента
    </v-card-title>
    <v-card-text v-if="!(loadingProgramAgents)">
      <v-row v-if="isAdmin">
        <v-col cols="4">
          Пользователь
        </v-col>
        <v-col>
          <b>{{ getUser(order.customerId).username }}</b>
        </v-col>
        <v-col>
          <v-btn size="small" href="/" block variant="outlined">
            Перейти
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          Сумма
        </v-col>
        <v-col>
          <b>{{ order.amount.toFixed(2) }}</b> рублей за 30 дней
        </v-col>
        <v-col>
          <b>{{ (order.amount / 30).toFixed(2) }}</b> рублей в день
        </v-col>
      </v-row>
      <v-row v-if="!infoForAgent">
        <v-col cols="4">
          Создан
        </v-col>
        <v-col>
          {{ new Date(order.createTimestamp).toLocaleString() }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          Последнее списание было
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
      <program-agent-payments-edit-card
          :order="order"
          :close-dialog-func="closeEdit"/>
    </v-dialog>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";
import userProfileData from "@/mixins/userProfileData";
import orderApi from "@/api/programAgentPaymentsApi";
import ProgramAgentPaymentsEditCard from "@/components/ProgramAgentPaymentsEditFormCard.vue";
import programAgentsMethod from "@/mixins/programAgentsMethod";

export default {
  name: "ProgramAgentPaymentsInfoCard",
  components: {ProgramAgentPaymentsEditCard},
  data() {
    return {
      openEdit: false,
    }
  },
  mixins: [userProfileData, programAgentsMethod],
  mounted() {
  },
  props: {
    order: {
      type: Object
    },
    updateList: {type: Function},
    loadingUsers: {type: Boolean, default: true},
    infoForAgent: {type: Boolean, default: false},
  },
  computed: {
    ...mapGetters({
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
      orderApi.deleteProgramAgentPayments(this.order.id, (ok) => {
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