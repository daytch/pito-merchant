import axios from 'configs/axios'

export default {
    create: (data) => axios.post("/merchant/submitLivestream", data),
    getCategory: () => axios.get("/merchant/category"),
    getLivestreamDetail: (id) => axios.get("/merchant/getVideosDetail?videoId=" + id),
    deleteLivestream: (data) => axios.post("/merchant/deleteLivestream", data),

    getVideos: (page, tipe) => axios.get("/merchant/listVideos?page=" + page + "&type=" + tipe),
}

