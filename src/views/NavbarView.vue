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
          <v-list-item-subtitle>
            petrov.email.ru@email.ru
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.link"
        >

          <v-list-item-title>
            <v-icon>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: "NavbarView",
  data() {
    return {
      drawer: true,
      group: null,

      items: [
        {title: 'Главная страница', icon: 'mdi-view-dashboard', link: "/"},
        {title: 'Боты', icon: 'mdi-image', link: "/bots"},
        {title: 'О проекте', icon: 'mdi-help-box', link: "/project"},
      ],
    }
  }
}
</script>

<style scoped>

</style>