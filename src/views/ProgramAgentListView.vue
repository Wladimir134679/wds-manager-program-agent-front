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
    <v-row v-if="programAgentsList === undefined">
      <v-col>
        <v-progress-linear indeterminate
                           color="green darken-10">

        </v-progress-linear>
      </v-col>
    </v-row>
    <v-row v-if="!!programAgentsList">
      <v-col class="v-col-12 v-col-md-6" v-for="agent in programAgentsList.agents" key="agent.id">
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
      loadingProcess: false
    }
  },
  computed: {
    ...mapState({
      programAgentsList: state => state.programAgents.programAgents,
      isAuth: state => state.profile.isAuth
    })
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
    }
  },
  mounted() {
    this.loadAgents()
  }
}
</script>

<style scoped>

</style>