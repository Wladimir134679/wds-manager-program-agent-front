<template>
  <v-container>
    <v-row class="justify-center">
      <v-col class="v-col-md-6 v-col-12">
        <v-card>
          <v-card-title>
            Восставновление пароля
          </v-card-title>
          <v-card-actions>
            <v-row>
              <v-col>
                <v-form>

                  <v-text-field
                      v-model="password[0]"
                      label="Новый пароль"
                      :rules="[rules.requiredField, rules.passwordLen]"
                      :append-inner-icon="showPassword[0] ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword[0] ? 'text' : 'password'"
                      @click:append-inner="showPassword[0] = !showPassword[0]"/>
                  <v-text-field
                      v-model="password[1]"
                      label="Подтвердить пароль"
                      :rules="[rules.requiredField, rules.passwordLen]"
                      :append-inner-icon="showPassword[1] ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword[1] ? 'text' : 'password'"
                      @click:append-inner="showPassword[1] = !showPassword[1]"/>
                </v-form>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-actions v-if="!!message">
            {{message}}
          </v-card-actions>
          <v-card-actions v-if="!ok">
            <v-btn block variant="outlined" @click="reqRecoveryPass()">
              Сменить пароль
            </v-btn>
          </v-card-actions>
          <v-card-actions v-if="ok">
            <v-btn block variant="outlined" to="/login">
              Войти
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import config from "@/api/config";
import axios from "axios";

export default {
  name: "RecoveryPasswordVerifyPage",
  data() {
    return {
      password: [null, null],
      showPassword: [false, false],
      message: undefined,
      loading: false,
      ok: false,
      rules: {
        passwordLen: v => v.length >= 8 || 'Min 8 characters',
        requiredField: v => !!v || "Пустое поле",
      }
    }
  },
  methods: {
    reqRecoveryPass(){
      if(this.password[0] !== this.password[1]){
        this.message = "Пароли не равные"
        return
      }
      let link = config.api + "/user/password/recovery";
      this.loading = true;
      this.ok = false

      axios.post(link, {
        token: this.$route.query.t,
        password: this.password[0]
      }, {})
          .then(value => {
            this.message = "Пароль восставновлен!"
            this.ok= true;
            this.loading = false;
          })
          .catch(reason => {
            this.message = "Ошибка в данных!"
            this.loading = false;
          });
    }
  }
}
</script>

<style scoped>

</style>