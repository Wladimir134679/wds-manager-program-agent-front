import {mapActions, mapGetters, mapState} from "vuex";

export default {
    data() {
        return {
            loadingUsers: true,
        }
    },
    computed: {
        ...mapGetters({
            getUser: "users/getUserById",
            getAllUser: "users/getUsersList",
        })
    },
    mounted() {
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
            loadUsers: "users/load"
        })
    }
}