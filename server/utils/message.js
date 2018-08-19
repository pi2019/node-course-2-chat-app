const moment = require("moment");

var generateMessage = (from, text)=>{
    return {
        from: from,
        text : text,
        createdAt: moment().valueOf()
    }
};

var generateLocationMessage = (from, url)=>{
    return {
        from,
        url: `https://google.com/maps/?q=${url.latitude},${url.longitude}`,
        createdAt: moment.valueOf()
    }
}

module.exports = {generateMessage, generateLocationMessage};
// module.exports = {generateMessage: generateMessage};
