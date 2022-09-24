<template>
  <v-container>
    <v-card>
      <v-card-title>
        Регистрация
      </v-card-title>
      <v-card-actions>
        <v-row>
          <v-col>
            <v-form
                v-model="valid"
                @submit.prevent="onSubmit">

              <v-text-field
                  v-model="username"
                  :readonly="loading"
                  label="Ваше имя">

              </v-text-field>

              <v-text-field
                  v-model="email"
                  :readonly="loading"
                  :rules="[rules.requiredField, rules.email]"
                  placeholder="exemple.you@email.ru"
                  label="Электронная почта">

              </v-text-field>

              <v-text-field
                  v-model="password[0]"
                  :readonly="loading"
                  :rules="[rules.requiredField, rules.passwordLen]"
                  :append-icon="showPassword[0] ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword[0] ? 'text' : 'password'"
                  @click:append="showPassword[0] = !showPassword[0]"
                  label="Пароль"
                  placeholder="Введите свой пароль">
              </v-text-field>

              <v-text-field
                  v-model="password[1]"
                  :readonly="loading"
                  :rules="[rules.requiredField, rules.passwordLen, rules.requiredEq]"
                  :append-icon="showPassword[1] ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword[1] ? 'text' : 'password'"
                  @click:append="showPassword[1] = !showPassword[1]"
                  label="Повторите пароль"
                  placeholder="Повторите пароль">
              </v-text-field>

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
import api from "@/api/api";

export default {
  name: "RegistrationView",
  data() {
    return {
      loading: false,
      valid: false,
      username: null,
      email: null,
      password: [null, null],
      showPassword: [false, false],
      errorText: undefined,
      rules: {
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Не верный формат почты'
        },
        passwordLen: v => v.length >= 8 || 'Min 8 characters',
        requiredField: v => !!v || "Пустое поле",
        requiredEq: v => !!v && (!!this.password[0] && this.password[0] === v) || "Не совпадают пароли",
      }
    }
  },
  methods: {
    onSubmit() {
      this.loading = true;
      this.errorText = undefined;
      api.registration({
        "username": this.username,
        "email": this.email,
        "password": this.password[0]
      }, (value) => {
        this.$router.push("/login")
        this.loading = false;
      }, (er) => {
        this.loading = false;
        this.errorText = er;
        this.errorText += " / " + er.response.message;
      })
    }
  }
}
</script>

<style scoped>

</style>