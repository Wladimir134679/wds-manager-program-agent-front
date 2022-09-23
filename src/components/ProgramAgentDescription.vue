<template>
  <v-card v-if="!!bot">
    <v-card-title>
      {{ bot.name }}
    </v-card-title>
    <v-card-text>
      {{ bot.description }}
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <b>Создан: </b>
        </v-col>
        <v-col>
          <span v-if="preview">{{ new Date(bot.createTime).toLocaleDateString() }}</span>
          <span v-else>{{ new Date(bot.createTime).toLocaleString() }}</span>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions v-if="preview">
      <v-row>
        <v-col>
          <v-btn block color="green" variant="outlined" :to="link">
            Просмотреть подробно
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProgramAgentDescription",
  data() {
    return {
    }
  },
  props: {
    bot: Object,
    preview:
        {
          type: Boolean,
          default: false
        },
    link: String,
  }
}
</script>

<style scoped>

</style>