<template>
  <v-container v-if="!!agentInfo">

    <v-row>
      <v-col :class="cardStyle">
        <program-agent-description :bot="agentInfo" :update-data-func="thisUpdateData"/>
      </v-col>
      <v-col :class="cardStyle" v-if="isAdmin">
        <program-agent-token-visible :program-agent="agentInfo"/>
      </v-col>
      <v-col :class="cardStyle" v-for="payments in paymentsArray" :key="payments">
        <program-agent-payments-info-card :order="payments" :info-for-agent="true" :update-list="thisUpdateData"/>
      </v-col>
      <v-col :class="cardStyle" v-if="isAdmin">
        <program-agent-user-manager-card :program-agent="agentInfo"/>
      </v-col>
      <v-col :class="cardStyle">
        <program-agent-data-health-info-card :program-agent="agentInfo"/>
      </v-col>
      <v-col :class="cardStyle">
        <program-agent-server-health-info-card :program-agent="agentInfo"/>
      </v-col>
      <v-col :class="cardStyle" v-if="previewCharts !== undefined" v-for="preview in previewCharts" :key="preview">
        <program-agent-chart-timestamp-view-card :program-agent="agentInfo" :preview="preview"/>
      </v-col>
      <v-col :class="cardStyle">
        <v-card>
          <v-card-title>
            Таблицы
          </v-card-title>
          <v-card-actions>
            <v-row>
              <v-col cols="12" v-for="table in tablesPreview" :key="table.name" >
                <v-btn variant="outlined" block @click="table.open = !table.open">
                  {{table.title}}
                  <v-dialog v-model="table.open">
                    <program-agent-table-card :tableName="table.name" :agentId="getAgentId" :closeFunc="()=>{table.open = false}"/>
                  </v-dialog>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import {mapGetters, mapState, mapActions} from "vuex"
import ProgramAgentDescription from "@/components/ProgramAgentDescription";
import isAuthViewRedirect from "@/mixins/isAuthViewRedirect";
import userProfileData from "@/mixins/userProfileData";
import ProgramAgentTokenVisible from "@/components/ProgramAgentTokenVisible";
import ProgramAgentServerHealthInfoCard from "@/components/ProgramAgentServerHealthInfoCard";
import ProgramAgentDataHealthInfoCard from "@/components/ProgramAgentDataHealthInfoCard";
import ProgramAgentChartTimestampViewCard from "@/components/ProgramAgentChartTimestampViewCard";
import ProgramAgentUserManagerCard from "@/components/ProgramAgentUserManagerCard";
import api from "@/api/api";
import programAgentPaymentsApi from "@/api/programAgentPaymentsApi";
import ProgramAgentPaymentsInfoCard from "@/components/ProgramAgentPaymentsInfoCard.vue";
import axios from "axios";
import config from "@/api/config";
import ProgramAgentTableCard from "@/components/ProgramAgentTableCard.vue";

export default {
  name: "ProgramAgentView",
  data() {
    return {
      previewCharts: undefined,
      // cardStyle: 'v-col-lg-4 v-col-md-6 v-col-12'
      cardStyle: 'v-col-md-6 v-col-12',
      paymentsArray: [],
      tablesPreview: []
    }
  },
  components: {
    ProgramAgentTableCard,
    ProgramAgentPaymentsInfoCard,
    ProgramAgentDataHealthInfoCard,
    ProgramAgentUserManagerCard,
    ProgramAgentServerHealthInfoCard,
    ProgramAgentTokenVisible,
    ProgramAgentDescription,
    ProgramAgentChartTimestampViewCard,
  },
  mixins: [isAuthViewRedirect, userProfileData],
  mounted() {
    this.thisUpdateData()
  },
  computed: {
    ...mapState({
      programAgentsList: state => state.programAgents.programAgents,
    }),
    ...mapGetters({
      getAgentInfo: "programAgents/getAgentInfo"
    }),
    agentInfo() {
      return this.getAgentInfo(this.getAgentId)
    },
    getAgentId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions({
      loadHealth: "programAgents/loadHealth"
    }),
    thisUpdateData() {
      if (!!this.agentInfo && this.agentInfo.online) {
        this.loadHealth({
          id: this.getAgentId,
          ok: function () {
          },
          error: function () {
          }
        })
        this.loadChartsPreview()
      }
      programAgentPaymentsApi.findById(this.getAgentId, (ok) => {
        this.paymentsArray = ok.data
      }, error => {

      })

      let pathApiTablesPreview = config.api + "/user/agent/table/preview"
      axios.get(pathApiTablesPreview, {
        params: {
          id: this.getAgentId,
        },
        headers: api.getHeadersLogin()
      }).then(value => {
        this.tablesPreview = value.data
        this.tablesPreview.forEach(value1 => value1.open = false)
      }).catch(reason => {
        console.log(reason)
      })
    },
    loadChartsPreview() {
      return api.getAllChartsPreview(this.getAgentId, (result) => {
        this.previewCharts = result.data
      }, (error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>