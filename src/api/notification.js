import axios from 'configs/axios'

export default {
    getList: () => axios.get('/user/getNotification?page=1')
}

