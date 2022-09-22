<template>

  <v-container>
    <v-card>
      <v-card-title>
        Главная страница
      </v-card-title>
      <v-card-text>
        Информация о проекте можно посмотреть <router-link to="/about-the-project">тут</router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "HomeView"
}
</script>

<style scoped>

</style>