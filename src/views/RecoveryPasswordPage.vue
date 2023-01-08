<template>
  <v-container>
    <v-row class="justify-center">
      <v-col class="v-col-md-6 v-col-12">
        <v-card>
          <v-card-title>
            Восставноление пароля
          </v-card-title>
          <v-card-actions>
            <v-row>
              <v-col cols="12">
                <v-form v-model="valid">
                  <v-text-field
                      v-model="email"
                      label="E-Mail"/>
                </v-form>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-actions v-if="!!message">
            {{message}}
          </v-card-actions>
          <v-card-actions>
            <v-row>
              <v-col class="v-col-md-8 v-col-12">
                <v-btn block
                       @click="recoveryPassword()"
                       :disabled="!valid || loading || blockBtn"
                       variant="outlined"
                       :loading="loading"
                >
                  Отправить запрос
                </v-btn>
              </v-col>
              <v-col>
                <v-btn block to="/login" variant="outlined">
                  Отмена
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/api/api";
import config from "@/api/config";
import axios from "axios";

export default {
  name: "RecoveryPasswordPage",
  data() {
    return {
      email: null,
      valid: false,
      message: undefined,
      loading: false,
      blockBtn: false,
      rules: {
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Не верный формат почты'
        },
      }
    }
  },
  methods: {
    recoveryPassword() {
      let link = config.api + "/user/password/recovery";
      this.loading = true;
      this.blockBtn = true;
      axios.get(link, {
        params: {
          email: this.email,
        }
      })
          .then(value => {
            this.message = "Ссылка для восстановления пароля отправлена Вам на почту"
            this.loading = false;
          })
          .catch(reason => {
            this.message = "Ошибка в данных!"
            this.loading = false;
            this.blockBtn = false;
          });
    }
  },
}
</script>

<style scoped>

</style>