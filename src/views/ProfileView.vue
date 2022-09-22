<template>
<v-container>
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
          {{userData.username}}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <b>Электронная почта</b>
        </v-col>
        <v-col>
          {{userData.email}}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <b>Роль</b>
        </v-col>
        <v-col>
          {{userData.role}}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</v-container>
</template>

<script>
import {mapGetters, mapState} from "vuex"

export default {
  name: "ProfileView",
  computed: {
    ...mapState({
      userData: (state) => state.profile.userData
    })
  }
}
</script>

<style scoped>

</style>