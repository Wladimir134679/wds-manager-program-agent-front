<template>
  <v-card v-if="!!userData">
    <v-card-title>
      Данные профиля
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <b>Имя</b>
        </v-col>
        <v-col>
          {{ userData.username }}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <b>Электронная почта</b>
        </v-col>
        <v-col>
          {{ userData.email }}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <b>Роль</b>
        </v-col>
        <v-col>
          {{ userData.role }}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <b>Кошелёк</b>
        </v-col>
        <v-col>
          {{ userData.wallet }} монет
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "UserProfileCard",
  props: {
    userData:{
      type: Object
    }
  }
}
</script>

<style scoped>

</style>