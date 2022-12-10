<template>
  <v-card v-if="isAdmin">
    <v-card-title>
      Управляющие люди
    </v-card-title>
    <v-card-actions>
      <v-btn
          block
          variant="outlined"
          @click="defaultOpenEdit = !defaultOpenEdit">
        Редактировать

        <v-dialog v-model="defaultOpenEdit">
          <v-card>
            <v-card-title>
              Редактирование управляющих людей
            </v-card-title>

            <v-card-text>
              <v-row>
                <v-col>
                  <v-list>
                    <v-select clearable
                              label="Заказчик"
                              :items="getAllUser"
                              item-title="username"
                              persistent-hint
                              return-object
                              single-line
                              v-model="customerSelect">

                    </v-select>
                  </v-list>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-list>
                    <v-select clearable
                              label="Разработчик"
                              :items="getAllUser"
                              item-title="username"
                              persistent-hint
                              return-object
                              single-line
                              v-model="developerSelect">

                    </v-select>
                  </v-list>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col class="v-col-md-6 v-col-12">
                  <v-btn
                      block
                      variant="outlined"
                      @click="saveUser">
                    Сохранить
                  </v-btn>
                </v-col>
                <v-col class="v-col-md-6 v-col-12">
                  <v-btn
                      block
                      variant="outlined"
                      @click="defaultOpenEdit = !defaultOpenEdit">
                    Закрыть
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import userProfileData from "@/mixins/userProfileData";
import api from "@/api/api";
import usersMethod from "@/mixins/usersMethod";

export default {
  name: "ProgramAgentUserManagerCard",
  mixins: [userProfileData, usersMethod],
  data() {
    return {
      customerSelect: undefined,
      developerSelect: undefined,
      defaultOpenEdit: false,
      loadingProcessing: false,
    }
  },
  props: {
    programAgent: {
      type: Object
    }
  },
  computed: {
  },
  methods: {
    saveUser() {
      let customerIdNew = undefined
      let developerIdNew = undefined
      this.loadingProcessing = true
      if (this.customerSelect)
        customerIdNew = this.customerSelect.id
      if (this.developerSelect)
        developerIdNew = this.developerSelect.id
      api.agentConnectUser(this.programAgent.id, customerIdNew, developerIdNew, (ok) => {
        this.loadingProcessing = false
        this.defaultOpenEdit = false
      }, error => {
        this.loadingProcessing = false
      })
    },
    loadUserModel() {
      if (this.programAgent.customerId != null)
        this.customerSelect = this.getUserById(this.programAgent.customerId)
      if (this.programAgent.developerId != null)
        this.developerSelect = this.getUserById(this.programAgent.developerId)
    }
  },
  mounted() {
    this.loadUserModel()
  },
}
</script>

<style scoped>

</style>