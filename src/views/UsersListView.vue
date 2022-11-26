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
        <user-profile-card :user-data="user"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import userProfileData from "@/mixins/userProfileData";
import isAuthViewRedirect from "@/mixins/isAuthViewRedirect";
import {mapGetters, mapState, mapActions} from "vuex"
import UserProfileCard from "@/components/UserProfileCard";

export default {
  name: "UsersListView",
  components: {UserProfileCard},
  mixins: [userProfileData, isAuthViewRedirect],
  data() {
    return {
      findField: "",
    }
  },
  mounted() {
    this.loadUsers({ok: ()=>{}, error: ()=>{}})
  },
  computed: {
    ...mapGetters({
      users: "users/getUsersList",
      userInfo: "users/getUserById"
    }),
    usersFilter() {
      if(!!this.users)
      return this.users.filter((user) => {
        return JSON.stringify(user).toLowerCase().includes(this.findField.toLowerCase());
      });
      return this.users
    }
  },
  methods: {
    ...mapActions({
      loadUsers: "users/load"
    })
  }
}
</script>

<style scoped>

</style>