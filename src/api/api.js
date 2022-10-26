import config from "@/api/config";
import axios from "axios";

const apiLogin = config.api + '/user/login';
const apiLoadProfile = config.api + '/user/profile';
const apiUserRegistration = config.api + '/user/registration';

const apiLoadAllProgramAgents = config.api + '/user/agent/all';
const apiLoadInfoProgramAgents = config.api + '/user/agent';
const apiCreateProgramAgent= config.api + '/user/agent/create';
const apiLoadHealthInfoProgramAgent = config.api + '/user/agent/health';


const apiStartProgramAgent = config.api + '/user/agent/start';
const apiStopProgramAgent = config.api + '/user/agent/stop';

const api = {
    token: undefined,
    getHeadersLogin: function () {
        return {
            "token": this.token
        }
    },
    executeDefault: function (path, ok, error) {
        axios.get(path, {
            headers: this.getHeadersLogin(),
        }).then(value => {
            ok(value)
        }).catch(reason => {
            error(reason)
        })
    },
    login: function (email, password, ok, error) {
        axios.post(apiLogin, {
            email: email,
            password: password
        }, {
        }).then(value => {
            this.token = value.data.token;
            ok(value);
        }).catch(reason => {
            error(reason);
        })
    },
    registration(data, ok, error){
        axios.post(apiUserRegistration, data, {
        }).then(value => {
            ok(value)
        }).catch(reason => {
            error(reason)
        })
    },
    loadUserProfile: function (ok, error) {
        this.executeDefault(apiLoadProfile, ok, error);
    },
    loadAllProgramAgents: function (ok, error) {
        this.executeDefault(apiLoadAllProgramAgents, ok, error);
    },
    loadInfoProgramAgents: function (id, ok, error) {
        axios.get(apiLoadInfoProgramAgents, {
            params:{
                id: id
            },
            headers: this.getHeadersLogin(),
        }).then(value => {
            ok(value)
        }).catch(reason => {
            error(reason)
        })
    },
    loadHealthInfoProgramAgents: function (id, ok, error) {
        axios.get(apiLoadHealthInfoProgramAgent, {
            params:{
                id: id
            },
            headers: this.getHeadersLogin(),
        }).then(value => {
            ok(value)
        }).catch(reason => {
            error(reason)
        })
    },
    createProgramAgent(data, ok, error){
        axios.post(apiCreateProgramAgent, data, {
            headers: this.getHeadersLogin(),
        }).then(value => {
            ok(value)
        }).catch(reason => {
            error(reason)
        })
    },
    startProgramAgent: function (id, ok, error) {
        axios.get(apiStartProgramAgent, {
            params:{
                id: id
            },
            headers: this.getHeadersLogin(),
        }).then(value => {
            ok(value)
        }).catch(reason => {
            error(reason)
        })
    },
    stopProgramAgent: function (id, ok, error) {
    axios.get(apiStopProgramAgent, {
        params:{
            id: id
        },
        headers: this.getHeadersLogin(),
    }).then(value => {
        ok(value)
    }).catch(reason => {
        error(reason)
    })
},
}


export default api