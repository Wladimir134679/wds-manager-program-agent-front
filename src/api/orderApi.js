import api from "@/api/api";
import axios from "axios";
import config from "@/api/config";

const orderAll = config.api + '/order/all';

export default {
    getAllListOrder: function (ok, error) {
        axios.get(orderAll,
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