<template>
  <v-container v-if="!!agentInfo">
    <v-row>
      <v-col>
        <program-agent-description :bot="agentInfo"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="v-col-md-5 v-col-12" v-if="isAdmin">
        <program-agent-token-visible :program-agent="agentInfo"/>
      </v-col>
      <v-col class="v-col-md-7 v-col-12">
        <program-agent-management-runtime :program-agent="agentInfo"/>
      </v-col>
      <v-col class="v-col-12">
        <program-agent-health-info-card :program-agent="agentInfo"/>
      </v-col>
      <v-col class="v-col-12">
        <v-card>
          <v-card-title>
            График
          </v-card-title>
          <v-card-text>
            AR<br>AR<br>AR<br>AR<br>AR<br>AR<br>AR<br>AR<br>AR<br>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
<!--    v-row>(v-col.v-col-12>v-card>v-card-title{Новый блок }>lorem4^v-card-text{Тут много текста}>(lorem20+br+br)*4)*5-->
  </v-container>
</template>

<script>
import {mapGetters, mapState, mapActions} from "vuex"
import ProgramAgentDescription from "@/components/ProgramAgentDescription";
import isAuthViewRedirect from "@/mixins/isAuthViewRedirect";
import userProfileData from "@/mixins/userProfileData";
import ProgramAgentTokenVisible from "@/components/ProgramAgentTokenVisible";
import ProgramAgentManagementRuntime from "@/components/ProgramAgentManagementRuntime";
import ProgramAgentHealthInfoCard from "@/components/ProgramAgentHealthInfoCard";

export default {
  name: "ProgramAgentView",
  components: {
    ProgramAgentHealthInfoCard,
    ProgramAgentManagementRuntime, ProgramAgentTokenVisible, ProgramAgentDescription},
  mixins: [isAuthViewRedirect, userProfileData],
  mounted() {
    this.loadHealth({
      id: this.getAgentId,
      ok: function () {
        console.log("Load health ok")
      },
      error: function () {
        console.log("Error health load")
      }
    })
  },
  computed: {
    ...mapState({
      programAgentsList: state => state.programAgents.programAgents,
    }),
    ...mapGetters({
      getAgentInfo: "programAgents/getAgentInfo"
    }),
    agentInfo(){
      return this.getAgentInfo(this.getAgentId)
    },
    getAgentId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions({
      loadHealth: "programAgents/loadHealth"
    })
  }
}
</script>

<style scoped>

</style>