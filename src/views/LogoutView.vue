<template>
<v-container>
  <v-row class="d-md-flex justify-center">
    <v-col class="v-col-md-6">
      <v-card>
        <v-card-title class="text-center">
          Вы точно хотите выйти?
        </v-card-title>
        <v-card-actions>
          <v-row>
            <v-col class="v-col-12 v-col-md-6">
              <v-btn block color="green" @click="logoutProfile()" to="/" variant="outlined">
                Да
              </v-btn>
            </v-col>
            <v-col class="v-col-12 v-col-md-6">
              <v-btn block color="red" to="/" variant="outlined">
                Нет
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
import {mapState, mapMutations, mapActions} from "vuex"
export default {
  name: "LogoutView",
  methods: {
    ...mapActions({
      logout: "profile/logout"
    }),
    logoutProfile() {
      this.logout()

    }
  }
}
</script>

<style scoped>

</style>