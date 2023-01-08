<template>
  <v-container>
    <v-row class="d-md-flex justify-center" v-if="!!userData">
      <v-col class="v-col-12">
        <user-profile-card :user-data="userData"/>
      </v-col>

      <v-col class="v-col-12">
        <v-card :loading="loadingHistory">
          <v-card-title>История операций по кошельку</v-card-title>
          <v-card-actions>
            <v-table class="w-100" height="400">
              <thead>
              <tr>
                <th>
                  Дата и время
                </th>
                <th>
                  Сумма, рубли
                </th>
                <th>
                  Действие
                </th>
                <th>
                  Кто
                </th>
                <th>
                  Описание
                </th>
                <!--                <th v-for="header in tableData.headers" :key="header">-->
                <!--                  {{ header }}-->
                <!--                </th>-->
              </tr>
              </thead>
              <tbody v-if="!loadingHistory">
              <tr v-for="row in historyList" :key="row">
                <td>
                  {{ new Date(row.timestampCreate).toLocaleString() }}
                </td>
                <td>
                  <span :class="{
                    'text-green': row.typeProcessing === 'REFILL',
                  'text-red': row.typeProcessing === 'WRITE_OFF'}">
                    <span v-if="row.typeProcessing === 'REFILL'">
                      +
                    </span>
                    <span v-if="row.typeProcessing === 'WRITE_OFF'">
                      -
                    </span>
                    {{ row.amount }}</span>
                </td>
                <td>
                  {{ this.mapTypeProcessing[row.typeProcessing] }}
                </td>
                <td>
                  {{ mapTypeWho[row.typeWho] }}
                </td>
                <td>
                  {{ row.description }}
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-card-actions>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import {mapState} from "vuex"
import UserProfileCard from "@/components/UserProfileCard";
import config from "@/api/config";
import axios from "axios";
import api from "@/api/api";

export default {
  name: "ProfileView",
  components: {UserProfileCard},
  data() {
    return {
      historyList: undefined,
      loadingHistory: true,
      mapTypeProcessing: {
        "REFILL": "Пополнение",
        "REQUEST_REFILL": "Запрос на пополнение",
        "WRITE_OFF": "Списание"
      },
      mapTypeWho: {
        "YOU": "Вы",
        "KASSA": "Онлайн касса",
        "ADMIN": "Администратор",
        "SERVICE": "Сервис"
      }
    }
  },
  computed: {
    ...mapState({
      userData: (state) => state.profile.userData
    })
  },
  mounted() {
    const path = config.api + "/user/profile/balance/history";
    this.loadingHistory = true;
    axios.get(path, {
      headers: api.getHeadersLogin()
    }).then(value => {
      this.historyList = value.data
      this.historyList.forEach(v => {
        let model
        try {
          model = JSON.parse(v.modelDescription).description
        }catch (e) {
          model = v.modelDescription
        }
        v.description = model
      })
    }).catch(reason => {

    }).finally(() => {
      this.loadingHistory = false;
    })
  }
}
</script>

<style scoped>

</style>