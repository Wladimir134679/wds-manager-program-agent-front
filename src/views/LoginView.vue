<template>
  <v-container>
    <v-row class="d-md-flex justify-center">
      <v-col class="v-col-md-6 v-col-12">
        <v-card class="">
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
                      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append-inner="showPassword = !showPassword"
                      label="Пароль"
                      placeholder="Введите свой пароль">

                  </v-text-field>
                  <v-row v-if="!!errorText">
                    <v-col>
                      {{ errorText }}
                    </v-col>
                  </v-row>
                  <v-btn
                      :disabled="!valid"
                      :loading="loading"
                      type="submit"
                      color="success"
                      variant="outlined"
                      size="large"
                      block>
                    Войти
                  </v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-card-actions>

          <v-card-actions class="ma-2">
            <v-row>
              <v-col>
                <v-btn to="/registration" block variant="outlined" prepend-icon="mdi-account-multiple-plus">
                  Регистрация
                </v-btn>
              </v-col>
              <v-col>
                <v-btn to="/recovery-password" block variant="outlined" prepend-icon="mdi-lock-check">
                  Восстановить пароль
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
    ok(value) {
      this.loading = false
      this.$router.push("/")
    },
    error(r) {
      this.loading = false
      this.errorText = r;
      this.errorText += " / " + r.response.data.message
    }
  }
}
</script>

<style scoped>

</style>