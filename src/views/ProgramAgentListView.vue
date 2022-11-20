<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Список программных агентов системы
          </v-card-title>
          <v-card-text v-if="isAuth">
            Все доступные Вам боты:
          </v-card-text>
          <v-card-text v-else>
            Обще доступные боты
          </v-card-text>
          <v-card-actions>
            <v-btn :disabled="loadingProcess" block variant="outlined" @click="updateAgents">
              Обновить список
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="isAuth && isAdmin">
      <v-col>
        <v-card>
          <v-card-title>
            Создать нового бота?
          </v-card-title>
          <v-card-actions>
            <v-btn block variant="outlined" to="/create-program-agent">
              Создать
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>


    <v-row>
      <v-col>
        <v-text-field placeholder="Поиск" v-model="findProgramAgent">

        </v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="filterProgramAgentList === undefined">
      <v-col>
        <v-progress-linear indeterminate
                           color="green darken-10">

        </v-progress-linear>
      </v-col>
    </v-row>
    <v-row v-if="!!filterProgramAgentList">
      <v-col class="v-col-12 v-col-md-6" v-for="agent in filterProgramAgentList" key="agent.id">
        <program-agent-description :bot="agent" :preview="true" :link="'/program-agent/' + agent.id"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProgramAgentDescription from "@/components/ProgramAgentDescription";
import {mapState, mapMutations, mapGetters, mapActions} from "vuex"
import userProfileData from "@/mixins/userProfileData";

export default {
  name: "ProgramAgentListView",
  components: {ProgramAgentDescription},
  mixins: [userProfileData],
  data() {
    return {
      loadingProcess: false,
      findProgramAgent: ""
    }
  },
  computed: {
    ...mapState({
      programAgentsList: state => state.programAgents.programAgents,
      isAuth: state => state.profile.isAuth
    }),
    filterProgramAgentList() {
      if(!!this.programAgentsList) {
        return this.programAgentsList.filter((agent) => {
          return JSON.stringify(agent).toLowerCase().includes(this.findProgramAgent.toLowerCase());
        });
      }
      return this.programAgentsList
    }
  },
  methods: {
    ...mapActions({
      loadAll: "programAgents/loadAll"
    }),
    loadAgents() {
      this.loadingProcess = true
      this.loadAll({
        ok: () => {
          this.loadingProcess = false
        },
        error: () => {
          this.loadingProcess = false
        }
      })
    },
    updateAgents() {
      this.loadAgents()
    }
  },
  mounted() {
    this.loadAgents()
  }
}
</script>

<style scoped>

</style>