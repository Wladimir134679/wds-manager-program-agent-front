<template>
  <v-container>
    <v-card>
      <v-card-title>
        Авторизация
      </v-card-title>
      <v-card-actions>
        <v-row>
          <v-col>
            <v-form
                v-model="valid"
                @submit.prevent="onSubmit">

              <v-text-field
                  v-model="email"
                  :readonly="loading"
                  :rules="[rules.requiredField, rules.email]"
                  placeholder="exemple.you@email.ru"
                  label="Электронная почта">

              </v-text-field>

              <v-text-field
                  v-model="password"
                  :readonly="loading"
                  :rules="[rules.requiredField, rules.passwordLen]"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  label="Пароль"
                  placeholder="Введите свой пароль">

              </v-text-field>
              <v-row v-if="!!errorText">
                <v-col>
                  {{errorText}}
                </v-col>
              </v-row>
              <v-btn
                  :loading="loading"
                  type="submit"
                  color="success"
                  variant="tonal"
                  size="large"
                  block>
                Войти
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "LoginView",
  data() {
    return {
      loading: false,
      valid: false,
      email: null,
      password: null,
      showPassword: false,
      errorText: undefined,
      rules: {
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Не верный формат почты'
        },
        passwordLen: v => v.length >= 8 || 'Min 8 characters',
        requiredField: v => !!v || "Пустое поле",
      }
    }
  },
  methods: {
    ...mapActions({
      login: "profile/login"
    }),
    onSubmit() {
      this.loading = true;
      console.log(this.password + " : " + this.email)
      this.login({email: this.email, password: this.password, ok: this.ok, error: this.error})
    },
    ok(value){
      this.loading = false
      this.$router.push("/")
    },
    error(r){
      console.log(r)
      this.errorText = r;
      this.errorText += " / " + r.response.data.message
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>