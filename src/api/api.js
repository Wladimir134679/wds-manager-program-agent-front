import config from "@/api/config";
import axios from "axios";

const apiLogin = config.api + '/user/login';
const apiLoadProfile = config.api + '/user/profile';

const apiLoadAllProgramAgents = config.api + '/user/agent/all';
const apiLoadInfoProgramAgents = config.api + '/user/agent';

const api = {
    token: undefined,
    getHeadersLogin: function () {
        return {
            "type-client": "front",
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
            headers: {
                "type-client": "front"
            },
        }).then(value => {
            this.token = value.data.token;
            ok(value);
        }).catch(reason => {
            error(reason);
        })
    },
    loadUserProfile: function (ok, error) {
        this.executeDefault(apiLoadProfile, ok, error);
    },
    loadAllProgramAgents: function (ok, error) {
        this.executeDefault(apiLoadAllProgramAgents, ok, error);
    },
    loadInfoProgramAgents: function (id, ok, error) {
        axios.get(path, {
            params:{
                id: id
            },
            headers: this.getHeadersLogin(),
        }).then(value => {
            ok(value)
        }).catch(reason => {
            error(reason)
        })
    }
}

export default api