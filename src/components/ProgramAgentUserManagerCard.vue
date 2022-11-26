<template>
  <v-card v-if="isAdmin">
    <v-card-title>
      Управляющие люди
    </v-card-title>
    <div :hidden="hidden">
      <v-card-text>
        <v-row>
          <v-col>
            <v-list>
              <v-select clearable
                        label="Заказчик"
                        :items="usersList"
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
                        :items="usersList"
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
          <v-col cols="12">
            <v-btn
                block
                variant="outlined"
                @click="saveUser">
              Сохранить
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn
                block
                variant="outlined"
                @click="hidden = !hidden">
              Закрыть
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </div>
    <div :hidden="!hidden">
      <v-card-actions>
        <v-btn
            block
            variant="outlined"
            @click="hidden = !hidden">
          Редактировать
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import userProfileData from "@/mixins/userProfileData";
import api from "@/api/api";

export default {
  name: "ProgramAgentUserManagerCard",
  mixins: [userProfileData],
  data() {
    return {
      customerSelect: undefined,
      developerSelect: undefined,
      defaultHidden: true
    }
  },
  props: {
    programAgent: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      usersList: "users/getUsersList",
      userById: "users/getUserById"
    }),
    hidden: {
      get: function (){
        return this.defaultHidden
      },
      set: function (val) {
        this.defaultHidden = val
        if (!val) {
          if (this.usersList === undefined)
            this.loadUsers({
              ok: () => {
                this.loadUserModel()
              },
              error: () => {
              }
            })
          else
            this.loadUserModel()
        }
      }
    }
  },
  methods: {
    ...mapActions({
      loadUsers: "users/load"
    }),
    saveUser() {
      let customerIdNew = undefined
      let developerIdNew = undefined
      if (this.customerSelect)
        customerIdNew = this.customerSelect.id
      if (this.developerSelect)
        developerIdNew = this.developerSelect.id
      api.agentConnectUser(this.programAgent.id, customerIdNew, developerIdNew, (ok) => {
      }, error => {
      })
    },
    loadUserModel() {
      if (this.programAgent.customerId != null)
        this.customerSelect = this.userById(this.programAgent.customerId)
      if (this.programAgent.developerId != null)
        this.developerSelect = this.userById(this.programAgent.developerId)
    }
  },
  mounted() {
  },
}
</script>

<style scoped>

</style>