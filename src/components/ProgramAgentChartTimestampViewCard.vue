<template>
  <v-card>
    <v-card-title>
      {{ preview.nameDisplay }}
    </v-card-title>
    <v-card-text>
      {{ preview.description }}
    </v-card-text>
<!--    <v-card-actions>-->
<!--      От &#45;&#45;-->
<!--      <input class="v-input" style="border: 3px blue;" type="date" v-model="preview.fromTime">-->
<!--      До &#45;&#45;-->
<!--      <input class="v-input" style="border: 3px blue;" type="date" v-model="preview.toTime">-->
<!--      <v-btn-->
<!--          type="submit"-->
<!--          variant="outlined">-->
<!--        Запросить-->
<!--      </v-btn>-->
<!--    </v-card-actions>-->
    <v-card-text>
      <apexchart ref="chartTime" class="pa-5" width="100%" height="300" :series="seriesData" :options="options"/>
    </v-card-text>
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
      seriesData: []
    }
  },
  props: {
    programAgent: Object,
    preview: Object
  },
  mounted() {
    this.loadSeries()
  },
  methods: {
    loadSeries() {
      console.log(this.preview.fromTime)
      console.log(this.seriesData)
      api.getChartData(this.programAgent.id,
          this.preview.name,
          this.preview.fromTime,
          this.preview.toTime,
          (ok) => {
            console.log(ok)
            let points = ok.data.points
            for (const pointsKey in points) {
              console.log(pointsKey)
              console.log(points[pointsKey])
              console.log(points[pointsKey].time)
              console.log(new Date(points[pointsKey].time))
              this.seriesData.push({x: new Date(points[pointsKey].time), y: points[pointsKey].value})
            }
            console.log(this.seriesData)
            this.$refs.chartTime.updateSeries([{
              data: this.seriesData
            }], false, true);
          },
          (err) => {
            console.log(err)
          })
    },
  },
  computed: {
    series() {
      return this.seriesData
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