import axios from 'configs/axios'

export default {
    create: (data) => axios.post("/merchant/createTicket", data),
    getList: () => axios.get("/merchant/listTicket"),
    getTicketHistory: (id) => axios.get('/merchant/listMessage?ticket_id=' + id + '&page=1'),
    postReplyTicket: (data) => axios.post('/merchant/insertMessageTicket', data)
}

