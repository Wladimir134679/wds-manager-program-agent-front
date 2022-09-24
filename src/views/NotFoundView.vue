<template>
<v-container>
  <v-card>
    <v-card-title>
      404 - Страница не найдена.
    </v-card-title>
    <v-card-text>
      А куда Вы собрались? =)
    </v-card-text>
    <v-card-actions>
      <v-img :aspect-ratio="16/6" :src="require('@/assets/img/404_01-min.jpg')"/>
    </v-card-actions>
  </v-card>
</v-container>
</template>

<script>
export default {
  name: "NotFoundView"
}
</script>

<style scoped>

</style>