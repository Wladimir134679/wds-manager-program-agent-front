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
import {mapGetters, mapState} from "vuex"
import ProgramAgentDescription from "@/components/ProgramAgentDescription";
import isAuthViewRedirect from "@/mixins/isAuthViewRedirect";
import userProfileData from "@/mixins/userProfileData";
import ProgramAgentTokenVisible from "@/components/ProgramAgentTokenVisible";
import ProgramAgentManagementRuntime from "@/components/ProgramAgentManagementRuntime";

export default {
  name: "ProgramAgentView",
  components: {ProgramAgentManagementRuntime, ProgramAgentTokenVisible, ProgramAgentDescription},
  mixins: [isAuthViewRedirect, userProfileData],
  computed: {
    ...mapState({
      programAgentsList: state => state.programAgents.programAgents,
    }),
    getAgentId() {
      return this.$route.params.id;
    },
    agentInfo() {
      if(this.programAgentsList === undefined)
        return undefined
      for (const agentsListKey in this.programAgentsList) {
        const agent = this.programAgentsList[agentsListKey];
        console.log(agent)
        if (agent.id == this.getAgentId) {
          return agent
        }
      }
    }
  }
}
</script>

<style scoped>

</style>