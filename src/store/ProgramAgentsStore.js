import config from "@/api/config";
import axios from "axios";
import api from "@/api/api";

export const programAgents = {
    state: () => ({
        programAgents: undefined,
    }),
    getters: {

    },
    mutations: {
        setProgramAgents(state, agents) {
            state.programAgents = agents
        }
    },
    actions: {
        loadAll({state, commit}, {ok, error}){
            api.loadAllProgramAgents(function (value) {
                commit("setProgramAgents", value.data)
                ok()
            }, function (r) {
                error()
            })
        }
    },
    namespaced: true
}