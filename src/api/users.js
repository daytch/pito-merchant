import axios from 'configs/axios'

export default {
    login: (credentials) => axios.post("/user/login", credentials),
    merchantLogin: (credentials) => axios.post("/merchant/login", credentials),
    loginSosmed: (credentials) => axios.post("/merchant/loginSSO", credentials),
    forgotPassword: (email) => axios.post("/user/forgotPassword", email),
    getProfile: ()=>axios.get("/merchant/getProfile")
}