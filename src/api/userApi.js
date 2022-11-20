import api from "@/api/api";
import axios from "axios";
import config from "@/api/config";

const apiContactData = config.api + '/user/profile/contact';
const pathAllUsers = config.api + '/user/all';

export default {
    setContactData: function (data, ok, error) {
        axios.post(apiContactData,
            data,
            {
                headers: api.getHeadersLogin(),
            })
            .then(value => {
                ok(value)
            })
            .catch(reason => {
                error(reason)
            })
    },
    getAllUserList: function (ok, error) {
        axios.get(pathAllUsers,
            {
                headers: api.getHeadersLogin(),
            })
            .then(value => {
                ok(value)
            })
            .catch(reason => {
                error(reason)
            })
    },
}