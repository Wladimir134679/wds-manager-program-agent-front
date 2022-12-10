<template>
<v-container>
  <v-row>
    <v-col class="v-col-12">
      <about-the-project-card/>
    </v-col>
    <v-col class="v-col-md-6 v-col-12">
      <project-contacts-card/>
    </v-col>
    <v-col class="v-col-md-6 v-col-12">
      <v-card>
        <v-card-title>
          Информация
        </v-card-title>
        <v-card-text>
          Текущая информационная система была разработа для курсовой работы по
          предмету "Проектирование вычислительных систем" по направлению "Информатика и вычислетельная техника"
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import ProjectContactsCard from "@/components/ProjectContactsCard.vue";
import AboutTheProjectCard from "@/components/AboutTheProjectCard.vue";

export default {
  name: "AboutTheProject",
  components: {AboutTheProjectCard, ProjectContactsCard}
}
</script>

<style scoped>

</style>