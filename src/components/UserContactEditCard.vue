<template>

  <v-card v-if="!!userData && !!userData.contact">
    <v-card-title>
      Контактные данные
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-radio-group label="Предпочтительно использовать" v-model="userData.contact.favorite">
            <v-radio label="Телеграм" value="TELEGRAM"></v-radio>
            <v-radio label="ВКонтакте" value="VK"></v-radio>
            <v-radio label="E-Mail" value="EMAIL"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="v-col-md-3 v-col-12">
          <b>
            Телеграм
          </b>
        </v-col>
        <v-col>
          <v-text-field
              type="text"
              placeholder="@username ИЛИ ссылка"
              v-model="userData.contact.telegram"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="v-col-md-3 v-col-12">
          <b>
            ВКонтакте
          </b>
        </v-col>
        <v-col>
          <v-text-field
              type="text"
              placeholder="@username ИЛИ ссылка"
              v-model="userData.contact.vk"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="v-col-md-3 v-col-12">
          <b>
            E-Mail
          </b>
        </v-col>
        <v-col>
          <v-text-field
              type="text"
              placeholder="name@email.com"
              v-model="userData.contact.email"></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
          block
          color="success"
          variant="outlined"
          @click="save"
          :loading="saveContactLoad">
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import userApi from "@/api/userApi";

export default {
  name: "UserContactEditCard",
  props: {
    userData: {
      type: Object
    }
  },
  data() {
    return {
      saveContactLoad: false
    }
  },
  methods: {
    save() {
      console.log(this.userData)
      this.saveContactLoad = true;
      userApi.setContactData(
          this.userData.contact,
          (ok) => {
            this.saveContactLoad = false;
          }, (err) => {
            this.saveContactLoad = false;
          })
    },
  }
}
</script>

<style scoped>

</style>