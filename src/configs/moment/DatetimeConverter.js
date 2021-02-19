import moment from 'moment-timezone'
// import 'moment/locale/en-sg'
// const zone = 'Asia/Singapore';
const tz = moment.tz.guess();
moment.tz.setDefault(tz);

export default {
    convertToUTC: (date) => moment(date).utc().format('YYYY-MM-DD HH:mm:ss'),
    // convertToSG: (date) => moment(date).locale('en-sg').tz(zone).format('YYYY-MM-DD HH:mm:ss'),
    convertToLocal: (date) => moment.utc(moment(date).format('YYYY-MM-DD HH:mm:ss')).tz(tz).add({ hours: 1 }).local().format('YYYY-MM-DD HH:mm:ss'),
    converToFormatBE: (date) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
}