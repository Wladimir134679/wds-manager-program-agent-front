<template>
  <v-container>
    <v-row v-if="!!userData">
      <v-col cols="12">
        <user-profile-card :user-data="userData"/>
      </v-col>


      <v-col cols="12">
        <user-contact-edit-card :user-data="userData"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapState} from "vuex"
import UserProfileCard from "@/components/UserProfileCard";
import UserContactEditCard from "@/components/UserContactEditCard";

export default {
  name: "ProfileView",
  components: {UserContactEditCard, UserProfileCard},
  computed: {
    ...mapState({
      userData: (state) => state.profile.userData
    })
  },
}
</script>

<style scoped>

</style>