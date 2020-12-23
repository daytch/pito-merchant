import axios from 'configs/axios'

export default {
    get: () => axios.get("/merchant/getDashboard?page=1"),
}

    