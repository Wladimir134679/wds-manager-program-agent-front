<template>
  <v-card v-if="!!bot">
    <v-card-title class=" d-flex justify-space-between">
      <span>
        {{ bot.name }}
        <span v-if="bot.online" style="color: green">Online</span>
      </span>
      <v-btn v-if="!preview" icon="mdi-reload" size="small" @click="updateDataFunc()">
      </v-btn>
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
        <v-col class="v-col-12">
          <v-btn block variant="outlined" :to="link">
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
    return {}
  },
  props: {
    bot: Object,
    preview:
        {
          type: Boolean,
          default: false
        },
    link: String,
    updateDataFunc: {type: Function, default: ()=>{}}
  }
}
</script>

<style scoped>

</style>