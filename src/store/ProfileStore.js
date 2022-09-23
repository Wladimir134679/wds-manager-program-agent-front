import config from "@/api/config";
import api from "@/api/api";
import axios from "axios";

export const profileStore = {
    state: () => ({
        isAuth: false,
        userData: undefined
    }),
    getters: {},
    mutations: {
        setIsAuth(state, auth) {
            state.isAuth = auth;
        },
        setUserData(state, userData) {
            state.userData = userData;
        }
    },
    actions: {
        login({state, commit, dispatch}, {email, password, ok, error}) {
            api.login(email, password, function (value) {
                commit("setIsAuth", true);
                dispatch("loadProfile");
                ok(value);
            }, function (r) {
                console.log("Error LOGIN")
                error(r);
            })
        },
        logout({state, commit}){
            commit("setIsAuth", false)
            commit("setTokenAuth", undefined)
            commit("setUserData", undefined)
        },
        loadProfile({state, commit}) {
            api.loadUserProfile(function (value) {
                commit("setUserData", value.data)
            }, function (r) {

            })
        }
    },
    namespaced: true
}