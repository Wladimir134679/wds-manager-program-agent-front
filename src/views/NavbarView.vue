<template>
  <v-container>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="text-h6">
        WDS Manager Program Agent
      </div>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" fixed>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Панель управления
          </v-list-item-title>
          <v-list-item-subtitle v-if="isAuth && !!userData">
            <b>{{ userData.username }}</b> {{ userData.email }}
          </v-list-item-subtitle>
          <v-list-item-subtitle v-else>
            Не авторизованны
          </v-list-item-subtitle>

        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list
          dense
          nav>
        <v-list-item
            link
            to="/">

          <v-list-item-title>
            <v-icon>mdi-view-dashboard</v-icon>
            Главная страница
          </v-list-item-title>
        </v-list-item>

        <v-list-item
            link
            to="/bots">
          <v-list-item-title>
            <v-icon>mdi-image</v-icon>
            Агенты
          </v-list-item-title>
        </v-list-item>

        <v-list-item
            link to="/about-the-project">
          <v-list-item-title>
            <v-icon>mdi-help-box</v-icon>
            О проекте
          </v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link v-if="isAuth" to="/profile">
          <v-list-item-title>
            <v-icon>mdi-view-dashboard</v-icon>
            Профиль
          </v-list-item-title>
        </v-list-item>

        <v-list-item link v-else :to="'/login'">
          <v-list-item-title>
            <v-icon>mdi-view-dashboard</v-icon>
            Войти
          </v-list-item-title>
        </v-list-item>

        <v-list-item link v-if="isAuth" to="/logout">
          <v-list-item-title>
            <v-icon>mdi-view-dashboard</v-icon>
            Выйти
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import {mapState, mapMutations, mapActions} from "vuex"

export default {
  name: "NavbarView",
  data() {
    return {
      drawer: true,
    }
  },
  computed: {
    ...mapState({
      isAuth: state => state.profile.isAuth,
      userData: state => state.profile.userData
    })
  },
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