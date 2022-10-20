<template>
  <v-container>
    <v-row v-for="(value, key) in object" :key="key">
      <v-col class="v-col-md-4 v-col-3">
        {{dictionary[key] === undefined ? key : dictionary[key]}}
      </v-col>
      <v-col v-if="typeof value == 'object'">
        <show-row-col-object-field :object="value" :dictionary="dictionary"/>
      </v-col>
      <v-col v-else>
        {{typeof value === 'number' ? value.toFixed(2) : value}}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ShowRowColObjectField",
  props:{
    object: Object,
    dictionary: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style scoped>

</style>