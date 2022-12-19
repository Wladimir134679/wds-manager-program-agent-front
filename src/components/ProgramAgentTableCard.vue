<template>
  <v-card v-if="!loading">
    <v-card-title>
      {{ tableData.title }}
    </v-card-title>
    <v-card-text>
      {{ tableData.description }}
    </v-card-text>
    <v-card-actions>
      <v-text-field v-model="tableData.search" variant="outlined" label="Поиск по таблице" placeholder="Что искать?">

      </v-text-field>
    </v-card-actions>
    <v-card-actions>
      <v-table :height="this.$vuetify.display.height - 400" class="w-100" fixed-header hover>
        <thead>
        <tr>
          <th v-for="header in tableData.headers" :key="header">
            {{ header }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in tableData.rows" :key="row">
          <slot v-if="JSON.stringify(row).toLowerCase().includes(tableData.search.toLowerCase())">
            <td v-for="text in row" :key="text">
              {{ text }}
            </td>
          </slot>
        </tr>
        </tbody>
      </v-table>
    </v-card-actions>
    <v-card-actions>
      <v-btn block variant="outlined" @click="closeFunc()">
        Закрыть
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-card v-else loading>
    <v-card-title>
      Загружается...
    </v-card-title>
  </v-card>
</template>

<script>
import axios from "axios";
import config from "@/api/config";
import api from "@/api/api";

export default {
  name: "ProgramAgentTableCard",
  data() {
    return {
      loading: true,
      tableData: undefined
    }
  },
  props: {
    tableName: {type: String},
    agentId: {type: Object},
    closeFunc: {type: Function, default: ()=>{}}
  },
  mounted() {
    this.loading = true
    this.loadTableData(this.agentId, this.tableName)
  },
  methods: {
    loadTableData(id, name) {
      let pathApiTable = config.api + "/user/agent/table"
      axios.get(pathApiTable, {
        params: {
          id: id,
          name: name
        },
        headers: api.getHeadersLogin()
      }).then(value => {
        let data = value.data
        data.search = ''
        this.tableData = data
        this.loading = false
      }).catch(reason => {
        console.log(reason)
      })
    },
  }
}
</script>

<style scoped>

</style>