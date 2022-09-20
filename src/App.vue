<template>
  <v-app>
    <navbar-view></navbar-view>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>


import NavbarView from "@/views/NavbarView";

export default {
  name: 'App',
  components: {
    NavbarView
  },
  data: () => ({
    //
  }),
}
</script>
