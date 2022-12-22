<template>
  <v-card v-if="!!userData">
    <v-card-title>
      Данные профиля
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <b>Имя</b>
        </v-col>
        <v-col>
          {{ userData.username }}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <b>Электронная почта</b>
        </v-col>
        <v-col>
          {{ userData.email }}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <b>Роль</b>
        </v-col>
        <v-col>
          {{ userData.role }}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <b>Кошелёк</b>
        </v-col>
        <v-col>
          {{ userData.wallet }} монет
        </v-col>
        <v-col>
          <v-btn variant="outlined" block @click="openDialog = true">
            Пополнить

            <v-dialog v-model="openDialog">
              <v-card :loading="loadingRefill">
                <v-card-title>
                  Пополнение
                </v-card-title>
                <v-card-actions>
                  <v-text-field
                      v-model="amount"
                      block
                      label="Сумма"
                      placeholder="Сумма в рублях">

                  </v-text-field>
                </v-card-actions>
                <v-card-actions>
                  <v-btn block variant="outlined" :loading="loadingRefill" @click="reqRefillBalance">
                    Подтвердить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import config from "@/api/config";
import axios from "axios";
import api from "@/api/api";

export default {
  name: "UserProfileCard",
  data() {
    return {
      amount: 0,
      openDialog: false,
      loadingRefill: false
    }
  },
  props: {
    userData: {
      type: Object
    }
  },
  methods:{
    reqRefillBalance(){
      this.loadingRefill = true

      const pathRefill = config.api + "/user/profile/balance/refill";
      axios.post(pathRefill, {
        amount: this.amount
      }, {
        headers: api.getHeadersLogin()
      })
          .then(value => {
            const data = value.data;
            window.open(data.redirectUrl);

            this.loadingRefill = false;
            this.openDialog = false;
          })
          .catch(reason => {
            this.loadingRefill = false;
          })
    }
  }
}
</script>

<style scoped>

</style>