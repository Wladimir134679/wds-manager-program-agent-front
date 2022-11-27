import {mapActions, mapGetters, mapState} from "vuex";

export default {
    data() {
        return {
            loadingProgramAgents: true,
        }
    },
    computed: {
        ...mapGetters({
            getProgramAgent: "programAgents/getAgentInfo",
            getAllProgramAgent: "programAgents/getAll"
        })
    },
    mounted() {
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
    },
    methods: {
        ...mapActions({
            loadProgramAgents: "programAgents/loadAll",
        })
    }
}