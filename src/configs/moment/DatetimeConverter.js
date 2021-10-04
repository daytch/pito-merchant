import moment from 'moment-timezone'
import 'moment/locale/en-sg'
const zone = 'Asia/Singapore';

export default {
    convertToUTC: (date) => moment(date).utc().format('YYYY-MM-DD HH:mm:ss'),
    convertToSG: (date) => moment(date).locale('en-sg').tz(zone).format('YYYY-MM-DD HH:mm:ss'),
    convertToLocalDate: (date) => moment(date).local().format('YYYY-MM-DD'),
    convertToLocalTime: (date) => moment(date).local().format('HH:mm'),
    convertToLocal: (date) => moment(date).local().format('YYYY-MM-DD HH:mm'),
    converToFormatBE: (date) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    getHoursDiff: (start,end)=> moment(end).diff(moment(start),'hours',false),
}