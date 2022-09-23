import {createStore} from 'vuex'
import {profileStore} from "./ProfileStore"
import {programAgents} from "@/store/ProgramAgentsStore";

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        profile: profileStore,
        programAgents: programAgents
    }
})
