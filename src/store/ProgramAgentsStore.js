import config from "@/api/config";
import axios from "axios";
import api from "@/api/api";

export const programAgents = {
    state: () => ({
        programAgents: undefined,
    }),
    getters: {
        getAll: (state) => {
            return state.programAgents
        },
        getAgentInfo: (state) => (agentId) => {
            if (state.programAgents === undefined || agentId === undefined)
                return undefined
            for (const agentsListKey in state.programAgents) {
                const agent = state.programAgents[agentsListKey];
                if (agent.id == agentId) {
                    return agent
                }
            }
            return undefined;
        },
        getAgentHealth: (state) => (agentId) => {
            return state.getAgentInfo(agentId).health
        }
    },
    mutations: {
        setProgramAgents(state, agents) {
            state.programAgents = agents
        },
    },
    actions: {
        loadAll({state, commit}, {ok, error}) {
            api.loadAllProgramAgents(function (value) {
                commit("setProgramAgents", value.data)
                ok()
            }, function (r) {
                error()
            })
        },
        loadHealth({state, commit, getters}, {id, ok, error}) {
            api.loadHealthInfoProgramAgents(id,
                function (result) {
                    getters.getAgentInfo(id).health = result.data;
                    ok();
                },
                function (r) {
                    console.log(r)
                    error();
                })
        }
    },
    namespaced: true
}