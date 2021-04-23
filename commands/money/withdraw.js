const Discord = require('discord.js');
let coins = require("../../json/coins.json");
let bank = require("../../json/bank.json");
const fs = require('fs').promises;

module.exports = {
   run: async(client, message, arg) => {
     const args = Number(arg)
     const targetId = message.author.id;
     console.log(arg)
     if(!bank[targetId]){
        bank[targetId] = {
          bank: 0
        };
        fs.writeFile("../bank.json", JSON.stringify(bank), (err) => {
          if (err) console.log(err)
        });
      }
      if(!coins[targetId]){
        coins[targetId] = {
          coins: 0
        };
        fs.writeFile("../coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
      }
    if (args > (bank[message.author.id].bank)){
      message.channel.send('You only have ' + bank[message.author.id].bank + ' coins in your bank')
    }
    else if (args <= (bank[message.author.id].bank) && args > 0){
        coins[message.author.id] = {
        coins: coins[message.author.id].coins + args
          };
          fs.writeFile("../coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
        bank[message.author.id] = {
        bank: bank[message.author.id].bank - args
          };
          fs.writeFile("../bank.json", JSON.stringify(bank), (err) => {
          if (err) console.log(err)
        });
        message.channel.send(args + ' Coins withdrew')
    }
    
    else if (arg[0] === 'all' || arg[0] === 'a'){
      if (bank[message.author.id].bank === 0){
        message.channel.send("What are you trying to withdraw? The 0 coins in your bank?")
      }else{
        coins[message.author.id] = {
        coins: coins[message.author.id].coins + bank[message.author.id].bank
          };
          fs.writeFile("../coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        }); 
        message.channel.send((bank[message.author.id].bank) + ' Coins withdrew')
        bank[message.author.id] = {
        bank: bank[message.author.id].bank - (bank[message.author.id].bank)
          };
          fs.writeFile("../bank.json", JSON.stringify(bank), (err) => {
          if (err) console.log(err)
        });
      }  
    }
    else{
      message.channel.send('How much are you trying to withdraw');
    }
},
  aliases: ['with','wd','w', 'withdraw']
 
}