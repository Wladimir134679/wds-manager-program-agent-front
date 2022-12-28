<template>
  <v-card>
    <v-card-title>
      Временные графики
    </v-card-title>
    <v-card-actions>
      <v-row>
        <v-col  class="v-col-md-6 v-col-12"  v-for="chart in previewCharts" :key="chart">
          <v-btn block variant="outlined" rounded="pill" @click="chart.open = !chart.open">
            {{ chart.nameDisplay }}
            <v-dialog v-model="chart.open">
              <program-agent-chart-timestamp-view-card :program-agent="agentInfo" :preview="chart" :fullscreenMode="true"/>
            </v-dialog>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import api from "@/api/api";
import ProgramAgentChartTimestampViewCard from "@/components/ProgramAgentChartTimestampViewCard.vue";

export default {
  name: "ProgramAgentListChartTimestamp",
  components: {ProgramAgentChartTimestampViewCard},
  data(){
    return {
      previewCharts: undefined
    }
  },
  props: {
    agentInfo: {type: Object}
  },
  mounted() {
    this.loadChartsPreview();
  },
  methods: {
    loadChartsPreview() {
      return api.getAllChartsPreview(this.agentInfo.id, (result) => {
        this.previewCharts = result.data
        this.previewCharts.forEach(value1 => value1.open = false)
      }, (error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>