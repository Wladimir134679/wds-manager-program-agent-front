<template>
  <v-card>
    <v-card-title>
      Токен для серверов
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col class="v-col-md-6 v-col-12">
          <span v-if="showToken">*****************</span>
          <span v-else>{{programAgent.token}}</span>
        </v-col>
        <v-col class="v-col-md-6 v-col-12">
          <v-btn @click="showToken = !showToken" block variant="outlined">
            <span v-if="showToken">Показать</span>
            <span v-else>Скрыть</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ProgramAgentTokenVisible",
  data(){
    return{
      showToken: true
    }
  },
  props:{
    programAgent: Object
  }
}
</script>

<style scoped>

</style>