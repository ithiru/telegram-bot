var TelegramBot = require('node-telegram-bot-api');
var util = require('util');
const ofm = require('./stores.js');

var options = {
  webHook: {
    port: 8443,
    key: __dirname+'/key.pem',
    cert: __dirname+'/crt.pem'
  },
  polling: false
};

var replyOptions = {
  parse_mode: "Markdown",
  disable_web_page_preview: true
};

function getStoreMarkup(store) {
  return util.format("_%s_\n*%s*\n%s\n%s%s %d\n%s\n%s%s\n",
     store.area,
     store.name,
     store.address1,
     (store.address2 ? store.address2 + "\n": ""),
     (store.address3 ? store.address3 : ""),
     store.pincode,
     store.phone,
     (store.website ? "[" + store.website  + "](" + store.website + ")\n": ""),
     (store.email ? "[" + store.email    + "](" + store.email + ")\n" : ""))
}

var storeMarkup = '';
ofm.stores.forEach((store) => {
   storeMarkup = storeMarkup + getStoreMarkup(store);
});

var contactMarkup = getStoreMarkup(ofm.stores[0]);

var token = '214645518:AAERYR9JAEM-FAkpY5MI_D-_mYEyjsVihwE';
var bot = new TelegramBot(token, options);
bot.setWebHook('bot.thiru.in:8443/bot' + token, __dirname+'/crt.pem');

// Matches /find [pincode]
bot.onText(/\/start/, function (msg) {
  console.log(msg.chat.username);
  bot.sendMessage(msg.chat.id, "Welcome to Organic Farmers Market\n\n Available Commands\n\n/storelist - Shows List of Stores\n/contact - Contact info for OFM", replyOptions);
});

bot.onText(/\/help/, function (msg) {
  bot.sendMessage(msg.chat.id, "Welcome to Organic Farmers Market\n\n Available Commands\n\n/storelist - Shows List of Stores\n/contact - Contact info for OFM", replyOptions);
});

// Matches /find [pincode]
bot.onText(/\/find (.+)/, function (msg, match) {
  bot.sendMessage(msg.chat.id, "Find Nearest OFM Store from " + match);
});

// Matches /storelist
bot.onText(/\/storelist/, function (msg) {
  bot.sendMessage(msg.chat.id, "*List of Stores*\n\n" + storeMarkup, replyOptions);
});

// Matches /contact
bot.onText(/\/contact/, function (msg) {
  bot.sendMessage(msg.chat.id, contactMarkup, replyOptions);
});

// Matches /subscribe
bot.onText(/\/subscribe/, function (msg) {
  bot.sendMessage(msg.chat.id, "Thank you!\nYou are subscribed to receive future news/updates from OFM");
});

// Matches /unsubscribe
bot.onText(/\/unsubscribe/, function (msg) {
  bot.sendMessage(msg.chat.id, "You are unsubscribed to not to receive future news/updates from OFM");
});

// Matches /news
bot.onText(/\/news/, function (msg) {
  bot.sendMessage(msg.chat.id, "Latest News");
});
