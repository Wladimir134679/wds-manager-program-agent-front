<template>
  <v-card>
    <v-card-title>
      {{ preview.nameDisplay }}
    </v-card-title>
    <v-card-text>
      {{ preview.description }}
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col v-for="type in groupTimes" :key="type.type">
          <v-btn variant="outlined" block @click="updateGroup(type)" :disabled="selectTypes === type.type">
            {{ type.name }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
    <v-card-text>
      <apexchart ref="chartTime" class="pa-5" width="100%" :height="chartHeight" :series="seriesDataFull"
                 :options="options"/>
    </v-card-text>
    <v-card-actions v-if="!fullscreenMode">
      <v-btn block variant="outlined">
        Во весь экран
        <v-dialog activator="parent">
          <program-agent-chart-timestamp-view-card :program-agent="programAgent" :preview="preview"
                                                   :fullscreenMode="true" :chart-height="500"/>
          <!--          <v-card>-->
          <!--            <v-card-title>-->
          <!--              {{ preview.nameDisplay }}-->
          <!--            </v-card-title>-->
          <!--            <v-card-text>-->
          <!--              <apexchart ref="chartTimeFull" class="pa-5" width="100%" height="600" :series="seriesDataFull"-->
          <!--                         :options="options"/>-->
          <!--            </v-card-text>-->
          <!--          </v-card>-->
        </v-dialog>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import api from "@/api/api";
import vueApexcharts from "vue3-apexcharts/src";
import vue3Apexcharts from "vue3-apexcharts/src/vue3-apexcharts";

export default {
  name: "ProgramAgentChartTimestampViewCard",
  data() {
    return {
      seriesData: [],
      selectTypes: 'NO',
      groupTimes: [
        {
          type: "NO",
          name: "Нет"
        }, {
          type: "MINUTE",
          name: "Минуты"
        }, {
          type: "HOUR",
          name: "Часы"
        }, {
          type: "DAY",
          name: "Дни"
        }, {
          type: "WEEK",
          name: "Недели"
        }, {
          type: "MONTH",
          name: "Месяцы"
        }
      ]
    }
  },
  props: {
    programAgent: Object,
    preview: Object,
    fullscreenMode: {
      type: Boolean,
      default: false
    },
    chartHeight: {
      type: Number,
      default: 300
    }
  },
  mounted() {
    if (this.programAgent.online)
      this.loadSeries()
  },
  methods: {
    updateGroup(type) {
      this.selectTypes = type.type
      this.loadSeries()
    },
    updateChart() {
      this.$refs.chartTimeFull.updateSeries([{
        data: this.seriesData
      }], false, true);
    },
    loadSeries() {
      console.log(this.preview.fromTime)
      console.log(this.seriesData)
      this.seriesData.length = 0
      api.getChartData(this.programAgent.id,
          this.preview.name,
          this.preview.fromTime,
          this.preview.toTime,
          this.selectTypes,
          (ok) => {
            let points = ok.data.points
            for (const pointsKey in points) {
              this.seriesData.push({x: new Date(points[pointsKey].time), y: points[pointsKey].value})
            }
            // this.$refs.chartTime.updateSeries([{
            //   data: this.seriesData
            // }], false, true);
          },
          (err) => {
            console.log(err)
          })
    },
  },
  computed: {
    seriesDataFull() {
      return [{
        name: this.preview.name,
        data: this.seriesData
      }];
    },
    options() {
      return {
        stroke: {
          curve: 'straight',
        },
        chart: {
          id: 'vuechart-example',
        },
        markers: {
          size: 4,
        },
        xaxis: {
          type: "datetime",
          title: {
            text: "Время"
          }
        },
        yaxis: {
          title: {
            text: "Пользователи"
          }
        },
        noData: {
          text: 'Loading...'
        }
      }
    }
  }
}
</script>

<style scoped>

</style>