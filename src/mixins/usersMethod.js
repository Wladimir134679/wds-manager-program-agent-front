import {mapActions, mapGetters, mapState} from "vuex";

export default {
    data() {
        return {
            loadingUsers: true,
        }
    },
    computed: {
        ...mapGetters({
            getUserById: "users/getUserById",
            getAllUser: "users/getUsersList",
        }),
        ...mapState({
            isAuth: state => state.profile.isAuth,
            profileUser: state => state.profile.userData
        }),
        isAdmin(){
            return !!this.profileUser && this.profileUser.role === "ADMIN"
        }
    },
    mounted() {
        if(!this.isAdmin)
            return;
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