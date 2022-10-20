<template>
  <v-card>
    <v-card-title>
      Серверная информация
    </v-card-title>
    <v-card-actions>
      <v-container v-if="programAgent.health !== undefined">
        <v-row>
          <v-col class="v-col-md-3 v-col-12 font-weight-medium">
            Адрес
          </v-col>
          <v-col>
            {{programAgent.health.hostServer}}
          </v-col>
        </v-row>
        <v-row>
          <v-col class="v-col-md-3 v-col-12 font-weight-medium">
            Потоков процесора
          </v-col>
          <v-col>
            {{programAgent.health.threadsServer}}
          </v-col>
        </v-row>

        <v-row>
          <v-col class="v-col-12 font-weight-medium">
            Память
          </v-col>
          <v-col style="margin-left: 20px">
            <v-row>
              <v-col class="v-col-md-3 v-col-12 font-weight-medium">
                Используется
              </v-col>
              <v-col>
                {{programAgent.health.memoryJVM.used.toFixed(2)}} MB
              </v-col>
            </v-row>

            <v-row>
              <v-col class="v-col-md-3 v-col-12 font-weight-medium">
                Свободно
              </v-col>
              <v-col>
                {{programAgent.health.memoryJVM.nativeMemory.toFixed(2)}} MB
              </v-col>
            </v-row>
            <v-row>
              <v-col class="v-col-md-3 v-col-12 font-weight-medium">
                Доступно JVM
              </v-col>
              <v-col>
                {{programAgent.health.memoryJVM.total.toFixed(2)}} MB
              </v-col>
            </v-row>
            <v-row>
              <v-col class="v-col-md-3 v-col-12 font-weight-medium">
                Доступно системе
              </v-col>
              <v-col>
                {{programAgent.health.memoryJVM.max.toFixed(2)}} MB
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>

      <v-container v-else>
        <v-row>
          <v-col>
            Данные отсутствуют
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProgramAgentHealthInfoCard",
  data() {
    return {
      dictionaryFiledHealth:{
        memoryJVM: "Память",
        used: "Используется",
        total: "Всего",
        max: "Максимально",
        nativeMemory: "Выделенно"
      }
    }
  },

  props: {
    programAgent: Object
  }
}
</script>

<style scoped>

</style>