import {mapState} from "vuex";

export default {
    computed:{
        ...mapState({
            isAuth: state => state.profile.isAuth,
            profileUser: state => state.profile.userData
        }),
        isAdmin(){
            return !!this.profileUser && this.profileUser.role === "ADMIN"
        }
    },
    mounted() {
    }
}