import {mapState} from "vuex";

export default {
    computed:{
        ...mapState({
            isAuth: state => state.profile.isAuth
        })
    },
    mounted() {
        if(!this.isAuth)
            this.$router.push("/not-found")
    }
}