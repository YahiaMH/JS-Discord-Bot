const Discord = require('discord.js');
let coins = require("../../json/coins.json");
const fs = require('fs').promises;
const talkedRecently = new Set();

module.exports = {
  run: async(client, message) => {
    if (talkedRecently.has(message.author.id)) {
    message.channel.send("You can only do this every 5 minutes");
    } else {
          const randBeg = Math.floor(Math.random()*2)+1
      if (randBeg == 1){
        const coinAmnt = Math.floor(Math.random() * 51)+25
          coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinAmnt
          };
          fs.writeFile("../coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        message.channel.send("Alright I'll let you have some")
        message.channel.send(coinAmnt + " coins have been added to your total")
      });
      }
      else if (randBeg == 2){
        const randSike = Math.floor(Math.random()*7)+1
        if (randSike == 4){
          message.channel.send("Alright I'll let you have some")
            setTimeout(function(){ 
              message.channel.send("Sike bitch, lol")
            }, 2000);
        }
        else{
          message.channel.send("Nah bitch, stop with that shit")
        }
      }
      talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 300000);
  }
},
  aliases: ['b', 'beg']
}