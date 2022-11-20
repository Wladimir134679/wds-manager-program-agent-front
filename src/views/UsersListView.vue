<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field placeholder="Поиск" v-model="findField">

        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="v-col-md-6 v-col-12"
             v-for="user in usersFilter" :key="user.id">
        <v-card>
          <v-card-text>
            <b>{{ user.username }}</b> {{ user.email }}
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col cols="3">
                Имя:
              </v-col>
              <v-col>
                {{ user.username }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                Почта:
              </v-col>
              <v-col>
                {{ user.email }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                Роль:
              </v-col>
              <v-col>
                {{ user.role }}
              </v-col>
            </v-row>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import userProfileData from "@/mixins/userProfileData";
import isAuthViewRedirect from "@/mixins/isAuthViewRedirect";
import userApi from "@/api/userApi";

export default {
  name: "UsersListView",
  mixins: [userProfileData, isAuthViewRedirect],
  data() {
    return {
      users: [],
      findField: "",
    }
  },
  mounted() {
    userApi.getAllUserList((result) => {
      this.users = result.data
    }, (error) => {
      console.log('Error load users')
      console.log(error)
    })
  },
  computed:{
    usersFilter(){
      return this.users.filter((user) => {
        return JSON.stringify(user).toLowerCase().includes(this.findField.toLowerCase());
      });
    }
  }
}
</script>

<style scoped>

</style>