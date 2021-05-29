import moment from 'moment-timezone'
import 'moment/locale/en-sg'
const zone = 'Asia/Singapore';

export default {
    convertToUTC: (date) => moment(date).utc().format('YYYY-MM-DD HH:mm:ss'),
    convertToSG: (date) => moment(date).locale('en-sg').tz(zone).format('YYYY-MM-DD HH:mm:ss'),
    convertToLocal: (date) => moment(date).local().format('YYYY-MM-DD HH:mm:ss'),
    converToFormatBE: (date) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
}