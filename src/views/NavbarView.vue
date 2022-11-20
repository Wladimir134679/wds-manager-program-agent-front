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
          <v-list-item-subtitle v-if="isAuth && !!profileUser">
            <b>{{ profileUser.username }}</b> {{ profileUser.email }}
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
            to="/program-agents">
          <v-list-item-title>
            <v-icon>mdi-image</v-icon>
            Агенты
          </v-list-item-title>
        </v-list-item>

        <v-list-item
            v-if="isAuth && isAdmin"
            link
            to="/users-list">
          <v-list-item-title>
            <v-icon>mdi-image</v-icon>
            Пользователи
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
            <v-icon>mdi-account-box</v-icon>
            Профиль
          </v-list-item-title>
        </v-list-item>

        <v-list-item link v-if="isAuth" to="/logout">
          <v-list-item-title>
            <v-icon>mdi-account-minus</v-icon>
            Выйти
          </v-list-item-title>
        </v-list-item>

        <v-list-item link v-if="!isAuth" to="/registration">
          <v-list-item-title>
            <v-icon>mdi-account-multiple-plus</v-icon>
            Регистрация
          </v-list-item-title>
        </v-list-item>

        <v-list-item link v-if="!isAuth" :to="'/login'">
          <v-list-item-title>
            <v-icon>mdi-account-plus</v-icon>
            Войти
          </v-list-item-title>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import userProfileData from "@/mixins/userProfileData";

export default {
  name: "NavbarView",
  mixins: [userProfileData],
  data() {
    return {
      drawer: true,
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>