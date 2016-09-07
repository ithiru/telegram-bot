"use strict";
var TelegramBot = require('node-telegram-bot-api');
var options = {
    webHook: {
        port: 8443,
        key: __dirname + '/key.pem',
        cert: __dirname + '/crt.pem'
    },
    polling: false
};
var replyOptions = {
    parse_mode: "Markdown",
    disable_web_page_preview: true
};
