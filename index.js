const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
let googleAuth = require('./auth');
let sheets = require('./sheets');

const TOKEN = process.env.TOKEN;

client.login(TOKEN);

// Google sheets auth
let AUTH = googleAuth
  .authorize()
  .then((auth) => {
    AUTH = auth;
  })
  .catch((err) => {
    console.log("auth error", err);
  });


client.on('ready', () => {
    console.log('up and running');
});

client.on('message', (msg) => {
  if (msg.channel instanceof Discord.DMChannel) {
      if (!msg.author.bot && msg.content.includes('pp')) {
        sheets
          .write(AUTH, msg.content.substring(3))
          .then((res) => {
            console.log(res);
            msg.channel.send('Great! I just added it to the sheet. Kobebot is committed to your privacy, so rest assured that there is no data saved anywhere of who sent what. :sunglasses:');
            msg.channel.send('If you want to learn more about the bot, head on over to https://github.com/andwxu/kobebot :smile:')
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (!msg.author.bot) {
        msg.channel.send(`Please send it in the format 'pp LENGTH GIRTH' without the quotations. :flushed:`)
      }
  }
});