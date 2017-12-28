var moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
}

var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        createdAt: moment().valueOf(),
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        lat: latitude,
        log: longitude
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
};