<template>
  <v-card v-if="tablesPreview && tablesPreview.length !== 0">
    <v-card-title>
      Таблицы
    </v-card-title>
    <v-card-actions>
      <v-row>
        <v-col class="v-col-md-6 v-col-12" v-for="table in tablesPreview" :key="table.name">
          <v-btn variant="outlined" block @click="table.open = !table.open" rounded="pill">
            {{ table.title }}
            <v-dialog v-model="table.open">
              <program-agent-table-card :tableName="table.name" :agentId="agentInfo.id"
                                        :closeFunc="()=>{table.open = false}"/>
            </v-dialog>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
  <v-card v-else>
    <v-card-title>
      Таблицы
    </v-card-title>
    <v-card-text>
      Данные отсутствуют
    </v-card-text>
  </v-card>
</template>

<script>
import ProgramAgentTableCard from "@/components/ProgramAgentTableCard.vue";
import config from "@/api/config";
import axios from "axios";
import api from "@/api/api";

export default {
  name: "ProgramAgentListTablesCard",
  components: {ProgramAgentTableCard},
  data(){
    return {
      tablesPreview: []
    }
  },
  props:{
    agentInfo: {type: Object}
  },
  mounted() {
    let pathApiTablesPreview = config.api + "/user/agent/table/preview"
    axios.get(pathApiTablesPreview, {
      params: {
        id: this.agentInfo.id,
      },
      headers: api.getHeadersLogin()
    }).then(value => {
      this.tablesPreview = value.data
      this.tablesPreview.forEach(value1 => value1.open = false)
    }).catch(reason => {
      console.log(reason)
    })
  }
}
</script>

<style scoped>

</style>