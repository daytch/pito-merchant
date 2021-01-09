var moment = require('moment-timezone');
const zone = 'Asia/Singapore';

export default {
    convertToUTC: (date) => moment.tz(date, zone).utc().format(),
    convertToLocal: (date) => moment(date).tz(zone).format(),
}