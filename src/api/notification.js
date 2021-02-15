import axios from 'configs/axios'

export default {
    getList: () => axios.get('/merchant/getNotification?page=1')
}

