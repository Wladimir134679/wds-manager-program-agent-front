<template>
  <v-container v-if="isAuth">
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Создать нового бота
          </v-card-title>
          <v-card-actions>
            <v-row>
              <v-col>
                <v-form
                    v-model="valid"
                    @submit.prevent="onSubmit">

                  <v-text-field
                      v-model="name"
                      placeholder="ExampleName"
                      label="Имя программного агента">

                  </v-text-field>

                  <v-textarea
                      v-model="description"
                      label="Описание"
                      placeholder="Много буковок">

                  </v-textarea>
                  <v-row v-if="!!errorText">
                    <v-col>
                      {{ errorText }}
                    </v-col>
                  </v-row>
                  <v-btn
                      :loading="loading"
                      type="submit"
                      color="success"
                      variant="outlined"
                      size="large"
                      block>
                    Создать
                  </v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import isAuthViewRedirect from "@/mixins/isAuthViewRedirect";
import api from "@/api/api";

export default {
  name: "CreateProgramAgentView",
  mixins: [isAuthViewRedirect],
  data() {
    return {
      valid: true,
      errorText: undefined,
      loading: false,
      name: null,
      description: null
    }
  },
  methods: {
    onSubmit() {
      console.log("Action")
      if (this.name === null || this.description === null)
        return;
      const data = {
        username: this.name,
        description: this.description
      }
      api.createProgramAgent(data, (va) => {
            this.$router.push("/program-agents")
          },
          (er) => {
            console.log(err)
          })
    }
  }
}
</script>

<style scoped>

</style>