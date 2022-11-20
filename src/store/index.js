import {createStore} from 'vuex'
import {profileStore} from "./ProfileStore"
import {programAgents} from "@/store/ProgramAgentsStore";
import {userStore} from "@/store/UsersStore";

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        profile: profileStore,
        programAgents: programAgents,
        users: userStore,
    }
})
