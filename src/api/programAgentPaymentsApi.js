import api from "@/api/api";
import axios from "axios";
import config from "@/api/config";

const pathThis = config.api + "/user/agent/payments"

const receiptAll = pathThis + '/all';
const editReceipt = pathThis + '/edit';
const createReceipt = pathThis + '/create';
const deleteReceipt = pathThis + '/delete';

export default {
    getAllListProgramAgentPayments: function (ok, error) {
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
    createProgramAgentPayments: function (data, ok, error) {
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
    deleteProgramAgentPayments: function (id, ok, error) {
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
    editProgramAgentPayments: function (data, ok, error) {
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