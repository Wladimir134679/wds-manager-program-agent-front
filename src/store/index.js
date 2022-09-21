import {createStore} from 'vuex'
import {profileStore} from "./ProfileStore"

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        profile: profileStore
    }
})
