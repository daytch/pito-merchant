import axios from 'configs/axios'

export default {
    getList: () => axios.get('/merchant/getNotification?page=1'),
    readNotif: (id_notification) => axios.post('/merchant/updateNotifRead', id_notification)
}

