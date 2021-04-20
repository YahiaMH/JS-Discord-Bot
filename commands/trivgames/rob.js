const Discord = require('discord.js');
let coins = require("../../coins.json");
let lockpick = require("../../lockpick.json")
const fs = require('fs').promises;
const talkedRecently = new Set();

module.exports = {
  run: async(client, message) => {
  if (talkedRecently.has(message.author.id)) {
            message.channel.send("You can only do this every 10 minutes");
    } else {
      const target = message.mentions.users.first()
      const targetId = target.id;
      if(!coins[targetId]){
        coins[targetId] = {
          coins: 0
        };
        fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
      }
      if ((coins[message.author.id].coins < 50)){
        message.channel.send("You need to have more than 50 coins")
      }
      else if((coins[targetId].coins) < 50){
        message.channel.send("<@" + targetId +"> needs to have over 50 coins in their wallet")
      }
      else{
        if (lockpick[message.author.id].lockpick > 0){
        const robChance1 = Math.floor(Math.random()*5)+1;
        if (robChance1 > 1){
        const robbery = Math.floor(Math.random()*((coins[targetId].coins - 40)-50)+50);
            coins[message.author.id] = {
            coins: coins[message.author.id].coins + robbery
          };
          fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
            coins[targetId] = {
            coins: coins[targetId].coins - robbery
          };
          fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
        message.channel.send("You stole " + robbery +  " coins from <@" + targetId + ">!")
        const loseLp = Math.floor(Math.random()*5)+1;
        if (loseLp == 1){
          lockpick[message.author.id] = {
            lockpick: lockpick[message.author.id].lockpick - 1
          };
          fs.writeFile("./lockpick.json", JSON.stringify(lockpick), (err) => {
          if (err) console.log(err)
        });
          if(lockpick[message.author.id].lockpick > 1){
            message.channel.send('One of your lockpicks broke, unlucky.')
          }else{
          message.channel.send('Your lockpick broke, unlucky')
          }
        }else{
          return
        };
        }
        else if (robChance1 == 1){
        const robbery = Math.floor(Math.random()*((coins[message.author.id].coins - 40)-50)+50);
        coins[targetId] = {
            coins: coins[targetId].coins + robbery
          };
          fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)

        });
            coins[message.author.id] = {
            coins: coins[message.author.id].coins - robbery
          };
          fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
        message.channel.send("The robbery was unsuccessful you gave <@" + targetId + "> " + robbery +  " coins!")
        }
        }else{
          const robChance = Math.floor(Math.random()*2)+1;
        if (robChance == 1){
        const robbery = Math.floor(Math.random()*((coins[targetId].coins - 40)-50)+50);
            coins[message.author.id] = {
            coins: coins[message.author.id].coins + robbery
          };
          fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
            coins[targetId] = {
            coins: coins[targetId].coins - robbery
          };
          fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
        message.channel.send("You stole " + robbery +  " coins from <@" + targetId + ">!")
        }
        else{
        const robbery = Math.floor(Math.random()*((coins[message.author.id].coins - 40)-50)+50);
        coins[targetId] = {
            coins: coins[targetId].coins + robbery
          };
          fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)

        });
            coins[message.author.id] = {
            coins: coins[message.author.id].coins - robbery
          };
          fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
        message.channel.send("The robbery was unsuccessful you gave <@" + targetId + "> " + robbery +  " coins!")
        }
        }
        
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 600000);
      }
  }
},
aliases: ['r', 'rob']
}
  