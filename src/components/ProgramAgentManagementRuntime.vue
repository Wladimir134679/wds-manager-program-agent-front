<template>
  <v-card>
    <v-card-title>
      Управление
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col class="v-col-4">
          <v-btn block variant="outlined">
            Запустить
          </v-btn>
        </v-col>
        <v-col class="v-col-4">
          <v-btn block variant="outlined">
            Остановить
          </v-btn>
        </v-col>
        <v-col class="v-col-4">
          <v-btn block variant="outlined">
            Перезапустить
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ProgramAgentManagementRuntime",
  props:{
    programAgent: Object
  }
}
</script>

<style scoped>

</style>