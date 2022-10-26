<template>
  <v-card>
    <v-card-title>
      Информация
    </v-card-title>
    <v-card-actions>
      <v-container v-if="programAgent.health !== undefined">
        <v-row>
          <v-col class="v-col-md-3 v-col-12 font-weight-medium">
            Статус
          </v-col>
          <v-col class="v-col-md-3 v-col-12 text-decoration-underline">
            {{ getStatusAgent }}
          </v-col>
          <v-col class="v-col-md-6 v-col-12">
            <v-btn
                v-if="getStatusAgent === 'START' || getStatusAgent === 'WORKING'"
                block
                variant="outlined"
                :loading="processingStatus"
                @click="stopProgramAgent">
              Остановить
            </v-btn>
            <v-btn
                v-if="getStatusAgent === 'STOP'"
                block
                variant="outlined"
                :loading="processingStatus"
                @click="startProgramAgent">
              Запустить
            </v-btn>
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
import api from "@/api/api";

export default {
  name: "ProgramAgentDataHealthInfoCard",
  data() {
    return {
      processingStatus: false
    }
  },
  props: {
    programAgent: Object
  },
  computed: {
    getStatusAgent() {
      return this.programAgent.health.programAgentData.status
    },
    getProgramAgentId() {
      return this.programAgent.id
    }
  },
  methods: {
    startProgramAgent: function () {
      console.log("Start program Agent")
      this.processingStatus = true;
      api.startProgramAgent(
          this.getProgramAgentId,
          (value) => {
            this.processingStatus = false;
          },
          (error) => {
            this.processingStatus = false;
          })
    },
    stopProgramAgent: function () {
      console.log("Stop program Agent")
      this.processingStatus = true;
      api.stopProgramAgent(
          this.getProgramAgentId,
          (value) => {
            this.processingStatus = false;
          },
          (error) => {
            this.processingStatus = false;
          })
    }
  }
}
</script>

<style scoped>

</style>