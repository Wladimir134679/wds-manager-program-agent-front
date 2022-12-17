<template>
  <v-container>
    <v-row class="justify-center">
      <v-col class="v-col-md-6 v-col-12">
        <v-card>
          <v-card-title>
            Подтверждение регистрации
          </v-card-title>
          <v-card-text>
            {{text}}
          </v-card-text>
          <v-card-actions>
            <v-btn block to="/login" variant="outlined">
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
  name: "RegistrationVerify",
  data(){
    return {
      text: "Загрузка...."
    }
  },
  mounted() {
    this.regVerify();
  },
  props: {
    p: {type: String, default: ""}
  },
  methods: {
    regVerify() {
      let link = config.api + "/user/registration/verify";
      console.log(link)
      console.log()
      axios.get(link, {
        params: {
          token: this.$route.query.t
        }
      })
          .then(value => {
            this.text = "Вы успешно подтвердили регситрацию! Теперь можной войти"
          })
          .catch(reason => {
            this.text = "Ошибка входа!"
          });
    }
  }
}
</script>

<style scoped>

</style>