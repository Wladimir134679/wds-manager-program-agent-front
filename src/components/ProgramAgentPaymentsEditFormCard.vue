<template>
  <v-card :loading="loadingUsers">
    <v-card-title>
      Редактировать заказ №{{ order.id }}
    </v-card-title>
    <v-card-text>
      <v-form v-model="validForm">
        <v-row>
          <v-col :class="styleLabel">
            Пользователь
          </v-col>
          <v-col>
            <v-select label="Кто"
                      :items="getAllUser"
                      item-title="username"
                      persistent-hint
                      :rules="[rules.requiredField]"
                      variant="underlined"
                      return-object
                      single-line
                      v-model="userSelect"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col :class="styleLabel">
            Програмнный агент
          </v-col>
          <v-col>
            <v-select label="За что"
                      :items="getAllProgramAgent"
                      item-title="name"
                      persistent-hint
                      :rules="[rules.requiredField]"
                      variant="underlined"
                      return-object
                      single-line
                      v-model="programAgentSelect"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col :class="styleLabel">
            Сумма
          </v-col>
          <v-col>
            <v-text-field type="number"
                          label="Сколько"
                          v-model="amount"
                          :rules="[rules.requiredField]"
                          variant="underlined"/>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-text v-if="!!errorText">
      {{ errorText }}
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn :disabled="!validForm" variant="outlined" class="w-75" @click="clickSave">
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import usersMethod from "@/mixins/usersMethod";
import programAgentsMethod from "@/mixins/programAgentsMethod";
import receiptApi from "@/api/programAgentPaymentsApi";

export default {
  name: "ProgramAgentPaymentsEditCard",
  mixins: [usersMethod, programAgentsMethod],
  data() {
    return {
      styleLabel: 'v-col-md-3 v-col-12',
      userSelect: undefined,
      programAgentSelect: undefined,
      amount: 0,
      validForm: false,
      rules: {
        requiredField: v => (!!v) || "Пустое поле",
      },
      errorText: undefined,
    }
  },
  props: {
    closeDialogFunc: {
      type: Function
    },
    order: {
      type: Object
    }
  },
  computed: {},
  mounted() {
    this.userSelect = this.getUserById(this.order.customerId)
    this.programAgentSelect = this.getProgramAgent(this.order.programAgentId)
    this.amount = this.order.amount
  },
  methods: {
    clickSave() {
      this.order.amount = this.amount
      this.order.customerId = this.userSelect.id
      this.order.programAgentId = this.programAgentSelect.id

      receiptApi.editProgramAgentPayments(this.order, (data) => {
        console.log(data)
        this.closeDialogFunc();
      }, error => {
        console.log(error)
        this.errorText = error.data
      })
    },
  }
}
</script>

<style scoped>

</style>