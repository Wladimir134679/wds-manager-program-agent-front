import api from "@/api/api";
import axios from "axios";
import config from "@/api/config";

const orderAll = config.api + '/order/all';
const editOrder = config.api + '/order/edit';
const createOrder = config.api + '/order/create';
const deleteOrder = config.api + '/order/delete';

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
    createOrder: function (data, ok, error) {
        axios.post(createOrder, data,
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
    deleteOrder: function (id, ok, error) {
        axios.get(deleteOrder, {
            params: {
                id: id
            },
            headers: api.getHeadersLogin(),
        })
            .then(value => {
                ok(value)
            })
            .catch(reason => {
                error(reason)
            })
    },
    editOrder: function (data, ok, error) {
        axios.post(editOrder, data,
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