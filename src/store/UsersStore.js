import userApi from "@/api/userApi";

export const userStore = {
    state: () => ({
        users: undefined
    }),
    getters: {
        getUserById: (state) => (id) => {
            if(state.users === undefined)
                return undefined
            for (const userKey in state.users) {
                const user = state.users[userKey];
                if (user.id == id) {
                    return user
                }
            }
            return undefined;
        },
        getUsersList: (state) => {
            return state.users
        }
    },
    mutations: {
        setUsersList(state, users) {
            state.users = users
        }
    },
    actions: {
        load({state, commit}, {ok, error}) {
            userApi.getAllUserList((result) => {
                commit("setUsersList", result.data)
                ok();
            }, (errorData) => {
                console.log('Error load users')
                console.log(errorData)
                error()
            })
        }
    },
    namespaced: true
}