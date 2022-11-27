<template>
  <v-card :loading="loadingUsers">
    <v-card-title>
      Создать заказ
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col :class="styleLabel">
            Пользователь
          </v-col>
          <v-col>
            <v-select label="Кто"
                      :items="getAllUser"
                      item-title="username"
                      persistent-hint
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
                          variant="underlined"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col :class="styleLabel">
            Интервал платежа
          </v-col>
          <v-col>
            <v-select label="Когда"
                      :items="intervalTypes"
                      item-title="name"
                      persistent-hint
                      variant="underlined"
                      return-object
                      single-line
                      v-model="intervalSelect"/>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn variant="outlined" class="w-75" @click="clickSave">
        Создать
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import usersMethod from "@/mixins/usersMethod";
import programAgentsMethod from "@/mixins/programAgentsMethod";

export default {
  name: "OrderCreateCard",
  mixins: [usersMethod, programAgentsMethod],
  data() {
    return {
      styleLabel: 'v-col-md-3 v-col-12',
      userSelect: undefined,
      intervalSelect: undefined,
      programAgentSelect: undefined,
      intervalTypes: [
        {
          type: "DAY",
          name: "День"
        },
        {
          type: "WEEK",
          name: "Неделя"
        },
        {
          type: "MONTH",
          name: "Месяц"
        },
        {
          type: "SIX_MONTHS",
          name: "Полгода"
        },
      ]
    }
  },
  computed: {},
  methods: {
    clickSave() {
      console.log(this.userSelect)
      console.log(this.intervalSelect)
    },
  }
}
</script>

<style scoped>

</style>