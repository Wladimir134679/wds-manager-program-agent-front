<template>
  <v-container v-if="!!agentInfo">

    <v-row>
      <v-col :class="cardStyle">
        <program-agent-description :bot="agentInfo"/>
      </v-col>
      <v-col :class="cardStyle" v-if="isAdmin">
        <program-agent-token-visible :program-agent="agentInfo"/>
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

export default {
  name: "ProgramAgentView",
  data() {
    return {
      previewCharts: undefined,
      // cardStyle: 'v-col-lg-4 v-col-md-6 v-col-12'
      cardStyle: 'v-col-md-6 v-col-12'
    }
  },
  components: {
    ProgramAgentDataHealthInfoCard,
    ProgramAgentUserManagerCard,
    ProgramAgentServerHealthInfoCard,
    ProgramAgentTokenVisible,
    ProgramAgentDescription,
    ProgramAgentChartTimestampViewCard,
  },
  mixins: [isAuthViewRedirect, userProfileData],
  mounted() {
    if(!!this.agentInfo && this.agentInfo.online) {
      this.loadHealth({
        id: this.getAgentId,
        ok: function () {
          console.log("Load health ok")
        },
        error: function () {
          console.log("Error health load")
        }
      })
      this.loadChartsPreview()
    }
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
    loadChartsPreview() {
      return api.getAllChartsPreview(this.getAgentId, (result) => {
        console.log(result)
        console.log(result.body)
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