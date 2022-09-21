import config from "@/api/config";
import axios from "axios";

export const profileStore = {
    state: () => ({
        isAuth: false,
        tokenAuth: undefined,
        userData: undefined
    }),
    getters: {},
    mutations: {
        setIsAuth(state, auth) {
            state.isAuth = auth;
        },
        setTokenAuth(state, token) {
            state.tokenAuth = token;
        },
        setUserData(state, userData) {
            state.userData = userData;
        }
    },
    actions: {
        login({state, commit, dispatch}, {email, password, ok, error}) {
            const apiLogin = config.api + '/user/login';
            axios.post(apiLogin, {
                email: email,
                password: password
            }, {
                headers: {
                    "type-client": "front"
                },
            }).then(value => {
                console.log(value);
                commit("setTokenAuth", value.data.token)
                commit("setIsAuth", true)
                dispatch("loadProfile")
                ok();
            }).catch(reason => {
                console.log(reason)
                error();
            })
        },
        logout({state, commit}){
            commit("setIsAuth", false)
            commit("setTokenAuth", undefined)
            commit("setUserData", undefined)
        },
        loadProfile({state, commit}) {
            const apiLogin = config.api + '/user/profile';
            axios.get(apiLogin, {
                headers: {
                    "type-client": "front",
                    "token": state.tokenAuth
                },
            }).then(value => {
                console.log(value);
                commit("setUserData", value.data)
            }).catch(reason => {
                console.log(reason)
            })
        }
    },
    namespaced: true
}