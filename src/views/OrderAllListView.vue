<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card :loading="loading">
          <v-card-title>
            Заказы
          </v-card-title>
        </v-card>
      </v-col>
      <v-col class="v-col-md-6 v-col-12"
             v-for="order in orders" :key="order.id">
        <order-info-card :order="order" :loading-users="loadingUsers" :loading-program-agents="loadingProgramAgents"/>
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


export default {
  name: "OrderAllListView",
  components: {OrderInfoCard},
  mixins: [isAuthViewRedirect, userProfileData],
  data() {
    return {
      loading: true,
      loadingProgramAgents: true,
      loadingUsers: true,
      orders: []
    }
  },
  computed: {
    ...mapGetters({
      getProgramAgent: "programAgents/getAgentInfo",
      getUser: "users/getUserById",
      getAllUser: "users/getUsersList",
      getAllProgramAgent: "programAgents/getAll"
    })
  },
  mounted() {
    this.loading = true
    orderApi.getAllListOrder(
        (ok) => {
          this.loading = false
          this.orders = ok.data
        }, error => {
          this.loading = false
        })

    if (this.getAllProgramAgent === undefined || !this.getAllProgramAgent) {
      this.loadingProgramAgents = true
      this.loadProgramAgents({
        ok: () => {
          this.loadingProgramAgents = false
        }, error: () => {
        }
      })
    } else {
      this.loadingProgramAgents = false
    }

    if (this.getAllUser === undefined || !this.getAllUser) {
      this.loadingUsers = true
      this.loadUsers({
        ok: () => {
          this.loadingUsers = false
        }, error: () => {
        }
      })
    } else {
      this.loadingUsers = false
    }
  },
  methods: {
    ...mapActions({
      loadProgramAgents: "programAgents/loadAll",
      loadUsers: "users/load"
    })
  }
}
</script>

<style scoped>

</style>