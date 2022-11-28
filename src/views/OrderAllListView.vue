<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card :loading="loading">
          <v-card-title>
            Заказы
          </v-card-title>
          <v-card-actions v-if="isAdmin">
            <v-btn variant="outlined" size="small" @click="openCreateDialog = !openCreateDialog">
              Создать
              <v-dialog v-model="openCreateDialog">
                <order-create-card :close-dialog-func="closeDialog"/>
              </v-dialog>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col class="v-col-md-6 v-col-12"
             v-for="order in orders" :key="order.id">
        <order-info-card
            :order="order"
            :update-list="updateData"
            :loading-users="loadingUsers"
            :loading-program-agents="loadingProgramAgents"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import isAuthViewRedirect from "@/mixins/isAuthViewRedirect";
import userProfileData from "@/mixins/userProfileData";
import orderApi from "@/api/orderApi";
import {mapActions, mapGetters} from "vuex";
import OrderInfoCard from "@/components/OrderInfoCard";
import OrderCreateCard from "@/components/OrderCreateCard";
import usersMethod from "@/mixins/usersMethod";
import programAgentsMethod from "@/mixins/programAgentsMethod";


export default {
  name: "OrderAllListView",
  components: {OrderCreateCard, OrderInfoCard},
  mixins: [isAuthViewRedirect, userProfileData, usersMethod, programAgentsMethod],
  data() {
    return {
      loading: true,
      orders: [],
      openCreateDialog: false
    }
  },
  mounted() {
    this.updateData()
  },
  methods: {
    updateData() {
      this.loading = true
      orderApi.getAllListOrder(
          (ok) => {
            this.loading = false
            this.orders = ok.data
          }, error => {
            this.loading = false
          })
    },
    closeDialog() {
      this.openCreateDialog = false
      this.updateData()
    }
  }
}
</script>

<style scoped>

</style>