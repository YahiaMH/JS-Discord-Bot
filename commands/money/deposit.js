const Discord = require('discord.js');
let coins = require("../../json/coins.json");
var bank = require("../../json/bank.json");
const fs = require('fs').promises;

module.exports = {
   run: async(client, message, arg) => {
     const args = Number(arg)
     if(!bank[message.author.id]){
        bank[message.author.id] = {
          bank: 0
        };
        fs.writeFile("./bank.json", JSON.stringify(bank), (err) => {
          if (err) console.log(err)
        });
      }
      if(!coins[message.author.id]){
        coins[message.author.id] = {
          coins: 0
        };
        fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
      }

    if (args > (coins[message.author.id].coins)){
      message.channel.send('You only have ' + coins[message.author.id].coins + ' coins')
    }
    else if (args < (coins[message.author.id].coins) && args > 0){
        coins[message.author.id] = {
        coins: coins[message.author.id].coins - args
          };
          fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });

        bank[message.author.id] = {
        bank: bank[message.author.id].bank + args
          };
          fs.writeFile("./bank.json", JSON.stringify(bank), (err) => {
          if (err) console.log(err)
        });
        message.channel.send(args + ' coins deposited to your bank')
    }
    else if(arg[0] === 'all' || arg[0] === 'a'){
      if (coins[message.author.id].coins === 0){
        message.channel.send('What are you trying to deposit? The 0 coins in your wallet?');
      }else{
        bank[message.author.id] = {
        bank: bank[message.author.id].bank + (coins[message.author.id].coins)
          };
          fs.writeFile("./bank.json", JSON.stringify(bank), (err) => {
          if (err) console.log(err)
        });
        message.channel.send((coins[message.author.id].coins) + ' coins deposited to your bank')
        coins[message.author.id] = {
        coins: coins[message.author.id].coins - coins[message.author.id].coins
          };
          fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        }); 
      }
      
    }
    else{
      message.channel.send('How much are you trying to deposit?')
    }
},
  aliases: ['dep','d','deposit']
 
}