<template>
  <v-card v-if="isAdmin">
    <v-card-title>
      Управляющие люди
    </v-card-title>
    <v-card-actions>
      <v-btn
          block
          variant="outlined"
          @click="openEdit = !openEdit">
        Редактировать

        <v-dialog v-model="openEdit">
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
                      @click="openEdit = !openEdit">
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

export default {
  name: "ProgramAgentUserManagerCard",
  mixins: [userProfileData],
  data() {
    return {
      customerSelect: undefined,
      developerSelect: undefined,
      defaultOpenEdit: false
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
    openEdit: {
      get: function () {
        return this.defaultOpenEdit
      },
      set: function (val) {
        this.defaultOpenEdit = val;
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
      this.openEdit = false;
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
  },
}
</script>

<style scoped>

</style>