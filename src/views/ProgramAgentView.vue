<template>
  <v-container v-if="!!agentInfo">

    <v-row>
      <v-col :class="cardStyle">
        <program-agent-description :bot="agentInfo" :update-data-func="thisUpdateData"/>
      </v-col>

      <v-col :class="cardStyle">
        <v-card>
          <v-card-title>
            Процессы
          </v-card-title>
          <v-card-actions>
            <v-row>
              <v-col cols="12">
                <v-row v-for="bar in progressBars" :key="bar.name" :class="{'text-grey': !bar.isProcessing}">
                  <v-col cols="12">
                    <b>{{bar.name}}</b> / {{bar.description}}
                  </v-col>
                  <v-col cols="12">
                    <v-progress-linear height="10" v-model="bar.progress" max="1"/>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col :class="cardStyle" v-if="isAdmin">
        <program-agent-token-visible :program-agent="agentInfo"/>
      </v-col>
      <v-col :class="cardStyle" v-if="isAdmin">
        <program-agent-user-manager-card :program-agent="agentInfo"/>
      </v-col>
      <v-col :class="cardStyle">
        <program-agent-list-chart-timestamp :agent-info="agentInfo"/>
      </v-col>
      <v-col :class="cardStyle">
        <program-agent-list-tables-card :agent-info="agentInfo"/>
      </v-col>
      <v-col :class="cardStyle" v-if="agentInfo.online">
        <program-agent-data-health-info-card :program-agent="agentInfo"/>
      </v-col>
      <v-col :class="cardStyle" v-for="payments in paymentsArray" :key="payments">
        <program-agent-payments-info-card :order="payments" :info-for-agent="true" :update-list="thisUpdateData"/>
      </v-col>
      <v-col :class="cardStyle" v-if="agentInfo.online">
        <program-agent-server-health-info-card :program-agent="agentInfo"/>
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
import ProgramAgentListChartTimestamp from "@/components/ProgramAgentListChartTimestamp.vue";
import ProgramAgentListTablesCard from "@/components/ProgramAgentListTablesCard.vue";

export default {
  name: "ProgramAgentView",
  data() {
    return {
      // cardStyle: 'v-col-lg-4 v-col-md-6 v-col-12'
      cardStyle: 'v-col-md-6 v-col-12',
      paymentsArray: [],
      progressBars: [],
      timer: null
    }
  },
  components: {
    ProgramAgentListTablesCard,
    ProgramAgentListChartTimestamp,
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
  destroyed() {
    this.stopTimer()
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
      }
      programAgentPaymentsApi.findById(this.getAgentId, (ok) => {
        this.paymentsArray = ok.data
      }, error => {

      })
      this.updateProgressBar()
      this.startTimer()
    },
    updateProgressBar(){
      const pathBar = config.api + "/user/agent/progressbar"
      axios.get(pathBar, {
        params:{
          id: this.agentInfo.id
        },
        headers: api.getHeadersLogin()
      }).then(value => {
        this.progressBars = value.data
      }).catch(reason => {
        this.stopTimer()
      })
    },
    startTimer() {
      this.timer = setInterval(() => {
        try {
          this.updateProgressBar()
        }catch (e) {
          this.stopTimer()
        }
      }, 5000)
    },
    stopTimer() {
      clearTimeout(this.timer)
    },
  }
}
</script>

<style scoped>

</style>