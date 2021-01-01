import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)
const instance = axios.create({
    baseURL: 'https://api.pito.com.sg/'
})
const UNAUTHORIZED = 401;

instance.interceptors.request.use(function (config) {
    let token = localStorage.getItem('PITO:merchant-token');
    config.headers.common["x-access-token"] = token

    return config;
})
instance.interceptors.response.use((response) => response.data, error => {
    const { status } = error.response;
    if (status === UNAUTHORIZED) {
        if (localStorage.getItem('PITO:merchant-token')) {
            localStorage.removeItem('PITO:merchant-token')
            window.location.href = "/"
        }
    } else if (typeof error.response === "undefined") {
        MySwal.fire('Error!', error, 'error');
    } else {
        MySwal.fire('Error!', error?.response?.data?.message, 'error');
    }
})

export {
    default as setAuthorizationHeader
} from './setAuthorizationHeader'
export default instance;