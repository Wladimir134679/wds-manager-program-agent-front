<template>
  <v-container>
    <v-row>
      <v-col>
        <program-agent-description :bot="agentInfo"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="v-col-md-5 v-col-12">
        <v-card>
          <v-card-title>
            Токен для серверов
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col class="v-col-md-6 v-col-12">
                <span v-if="showToken">*****************</span>
                <span v-else>{{agentInfo.token}}</span>
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
      </v-col>
      <v-col class="v-col-md-7 v-col-12">
        <v-card>
          <v-card-title>
            Управление
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col class="v-col-4">
                <v-btn block variant="outlined">
                  Запустить
                </v-btn>
              </v-col>
              <v-col class="v-col-4">
                <v-btn block variant="outlined">
                  Остановить
                </v-btn>
              </v-col>
              <v-col class="v-col-4">
                <v-btn block variant="outlined">
                  Перезапустить
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
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
  </v-container>
</template>

<script>
import {mapGetters, mapState} from "vuex"
import ProgramAgentDescription from "@/components/ProgramAgentDescription";

export default {
  name: "ProgramAgentView",
  components: {ProgramAgentDescription},
  data(){
    return{
      showToken: true
    }
  },
  computed: {
    ...mapState({
      programAgentsList: state => state.programAgents.programAgents,
    }),
    getAgentId() {
      return this.$route.params.id;
    },
    agentInfo() {
      for (const agentsListKey in this.programAgentsList.agents) {
        const agent = this.programAgentsList.agents[agentsListKey];
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