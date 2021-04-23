const Discord = require('discord.js');
let coins = require("../../json/coins.json");
let ball = require("../../json/8ball.json");
let lockpick = require("../../json/lockpick.json");
const fs = require('fs').promises;

module.exports = {
  run: async(client, message, args) => {
    targetId = message.author.id
    authCoins = coins[targetId].coins
    if(!coins[targetId]){
        coins[targetId] = {
          coins: 0
        };
        fs.writeFile("./json/coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
      }
    
    if (args[0].toLowerCase() == '8ball'){
      if (authCoins < 2750){
        message.channel.send("You don't have enough coins in your wallet to buy this")
      }else{
        if(!ball[targetId]){
        ball[targetId] = {
          ball: 0
        };
        fs.writeFile("./json/8ball.json", JSON.stringify(ball), (err) => {
          if (err) console.log(err)
          });
        }
          coins[targetId] = {
            coins: authCoins - 2750
          };
          fs.writeFile("./json/coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
        ball[message.author.id] = {
            ball: ball[message.author.id].ball + 1
          };
          fs.writeFile("./json/8ball.json", JSON.stringify(ball), (err) => {
          if (err) console.log(err)
        });
        message.channel.send('You have successfully bought 8Ball');


          }
      }
      else if(args[0].toLowerCase() == 'lockpick' || args[0].toLowerCase() == 'lp'){
        if (authCoins < 4500){
        message.channel.send("You don't have enough coins in your wallet to buy this")
      }else{
        if(!lockpick[targetId]){
        lockpick[targetId] = {
          lockpick: 0
        };
        fs.writeFile("./json/lockpick.json", JSON.stringify(lockpick), (err) => {
          if (err) console.log(err)
          });
        }
          coins[targetId] = {
            coins: authCoins - 4500
          };
          fs.writeFile("./json/coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
        lockpick[message.author.id] = {
            lockpick: lockpick[message.author.id].lockpick + 1
          };
          fs.writeFile("./json/lockpick.json", JSON.stringify(lockpick), (err) => {
          if (err) console.log(err)
        });
        message.channel.send('You have successfully bought a lockpick');
          }
      }
      else{
        message.channel.send('What are you trying to buy?')
      }
    },
    aliases: ['buy']
}
  
