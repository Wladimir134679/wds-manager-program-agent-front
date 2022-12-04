import api from "@/api/api";
import axios from "axios";
import config from "@/api/config";

const receiptAll = config.api + '/receipt/all';
const editReceipt = config.api + '/receipt/edit';
const createReceipt = config.api + '/receipt/create';
const deleteReceipt = config.api + '/receipt/delete';

export default {
    getAllListReceipt: function (ok, error) {
        axios.get(receiptAll,
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
    createReceipt: function (data, ok, error) {
        axios.post(createReceipt, data,
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
    deleteReceipt: function (id, ok, error) {
        axios.get(deleteReceipt, {
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
    editReceipt: function (data, ok, error) {
        axios.post(editReceipt, data,
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