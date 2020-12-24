import axios from 'configs/axios'

export default {
    create: (data) => axios.post("/merchant/createTicket", data),
    getList: () => axios.get("/merchant/listTicket"),
}

