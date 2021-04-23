const Discord = require('discord.js');
let coins = require("../../json/coins.json");
const fs = require('fs').promises;

module.exports = {
  run: async(client, message, arg) => {
    const targetId = message.author.id;
    const authCoins = coins[targetId].coins;
    args = Number(arg);
    var cardNum = ['2','3','4','5','6','7','8','9','J','Q','K','A']
    var cardSuit = ['<:diamonds:833122728139161600>','<:hearts:833123167702351903>','<:clubs:833123495050608651>','<:spades:833123797828763699']
    if (args > authCoins){
      message.channel.send("You don't have " + authCoins + " coins in your wallet you broke mf")
    }
    else if (args <= authCoins){

    }
    else if (args == 'all' || args == 'a'){

    }
    else{
      message.channel.send('You really tryna bet ' + args + ' right now?')
    }
},
  aliases: ['bj','blackjack']
}