import axios from 'configs/axios'

export default {
    create: (data) => axios.post("/merchant/submitLivestream", data),
    getCategory: () => axios.get("/user/category"),
    getLivestreamDetail: (id) => axios.get("/merchant/getVideosDetail?videoId=" + id),
}

