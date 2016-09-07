var TelegramBot = require('node-telegram-bot-api');
import {util} from 'util';
import {ofm} from './stores.js';

let options = {
  webHook: {
    port: 8443,
    key: __dirname+'/key.pem',
    cert: __dirname+'/crt.pem'
  },
  polling: false
};

let replyOptions = {
  parse_mode: "Markdown",
  disable_web_page_preview: true
};
