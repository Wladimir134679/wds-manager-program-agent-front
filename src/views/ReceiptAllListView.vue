<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card :loading="loading">
          <v-card-title>
            Квитанции
          </v-card-title>
          <v-card-actions v-if="isAdmin">
            <v-btn variant="outlined" size="small" @click="openCreateDialog = !openCreateDialog">
              Создать
              <v-dialog v-model="openCreateDialog">
                <receipt-create-card :close-dialog-func="closeDialog"/>
              </v-dialog>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col class="v-col-md-6 v-col-12"
             v-for="order in orders" :key="order.id">
        <receipt-info-card
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
import receiptApi from "@/api/receiptApi";
import {mapActions, mapGetters} from "vuex";
import ReceiptInfoCard from "@/components/ReceiptInfoCard";
import ReceiptCreateCard from "@/components/ReceiptCreateCard";
import usersMethod from "@/mixins/usersMethod";
import programAgentsMethod from "@/mixins/programAgentsMethod";


export default {
  name: "ReceiptAllListView",
  components: {ReceiptCreateCard, ReceiptInfoCard},
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
      receiptApi.getAllListReceipt(
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