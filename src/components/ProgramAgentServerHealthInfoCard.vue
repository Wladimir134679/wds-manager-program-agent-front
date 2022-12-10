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
          <v-col class="text-decoration-underline">
            {{programAgent.health.serverData.hostServer}}
          </v-col>
        </v-row>
        <v-row>
          <v-col class="v-col-md-3 v-col-12 font-weight-medium">
            Потоков процесора
          </v-col>
          <v-col class="text-decoration-underline">
            {{programAgent.health.serverData.threadsServer}}
          </v-col>
        </v-row>

        <v-row>
          <v-col class="v-col-12 font-weight-medium">
            Память
          </v-col>
          <v-col style="margin-left: 20px">
            <v-row>
              <v-col class="v-col-md-4 v-col-12 font-weight-medium">
                Используется
              </v-col>
              <v-col class="text-decoration-underline">
                {{programAgent.health.serverData.memoryJVM.used.toFixed(2)}} MB
              </v-col>
            </v-row>

            <v-row>
              <v-col class="v-col-md-4 v-col-12 font-weight-medium">
                Свободно
              </v-col>
              <v-col class="text-decoration-underline">
                {{programAgent.health.serverData.memoryJVM.nativeMemory.toFixed(2)}} MB
              </v-col>
            </v-row>
            <v-row>
              <v-col class="v-col-md-4 v-col-12 font-weight-medium">
                Доступно JVM
              </v-col>
              <v-col class="text-decoration-underline">
                {{programAgent.health.serverData.memoryJVM.total.toFixed(2)}} MB
              </v-col>
            </v-row>
            <v-row>
              <v-col class="v-col-md-4 v-col-12 font-weight-medium">
                Доступно системе
              </v-col>
              <v-col class="text-decoration-underline">
                {{programAgent.health.serverData.memoryJVM.max.toFixed(2)}} MB
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
  name: "ProgramAgentServerHealthInfoCard",
  props: {
    programAgent: Object
  }
}
</script>

<style scoped>

</style>