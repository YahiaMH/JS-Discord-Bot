const Discord = require('discord.js');
let coins = require("../../json/coins.json");
let lockpick = require("../../json/lockpick.json");
let ball = require("../../json/8ball.json");
const fs = require('fs').promises;

module.exports = {
  run: async(client, message, args) => {
    console.log(args)
    var target = message.mentions.users.first() || message.author;
    var targetId = target.id;
    if(targetId === message.author.id) return message.channel.send("Who are you trying to gift? \nThe format is '.gift @user item amount'");
    if(args[1] == '8ball' || args[1] == '8balls' || args[1] == '8b' || args[1] == '8bs'){
        if(ball[message.author.id].ball < args[2]){
        message.channel.send("You only have " + (ball[message.author.id].ball) + " 8balls")
      }else{
        ball[message.author.id] = {
          ball: ball[message.author.id].ball - args[2]
          };
          fs.writeFile("./json/8ball.json", JSON.stringify(ball), (err) => {
          if (err) console.log(err)
        });
        ball[targetId] = {
          ball: ball[targetId].ball + args[2]
          };
          fs.writeFile("./json/8ball.json", JSON.stringify(ball), (err) => {
          if (err) console.log(err)
        });
        message.channel.send('Successfully gifted <@' + targetId + '> ' + args[2] + ' 8balls!')
      }
    }else if(args[1] == 'lockpick' || args[1] == 'lp' || args[1] == 'lockpicks'){
        if(lockpick[message.author.id].lockpick < args[2]){
        message.channel.send("You only have " + (lockpick[message.author.id].lockpick) + " lockpicks")
      }else{
        lockpick[message.author.id] = {
            lockpick: lockpick[message.author.id].lockpick - args[2]
          };
          fs.writeFile("./json/lockpick.json", JSON.stringify(lockpick), (err) => {
          if (err) console.log(err)

        });
        lockpick[targetId] = {
          lockpick: lockpick[targetId].lockpick + args[2]
          };
          fs.writeFile("./json/lockpick.json", JSON.stringify(lockpick), (err) => {
          if (err) console.log(err)
        });
        message.channel.send('Successfully gifted <@' + targetId + '> ' + args[2] + ' lockpicks!')
      }
    }
    else if(args[1] == 'coins' || args[1] == 'coin' || args[1] == 'c'){
      if(coins[message.author.id].coins < args[2]){
        message.channel.send("You need to have "+args[2]+" coins in your wallet");
      }else{
        coins[targetId] = {
            coins: coins[targetId].coins + args[2]
          };
          fs.writeFile("./json/coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)

        });
            coins[message.author.id] = {
            coins: coins[message.author.id].coins - args[2]
          };
          fs.writeFile("./json/coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
        message.channel.send('Successfully gifted <@' + targetId + '> ' + args[2] + ' coins!')
      }
    }
},
  aliases: ['gift', 'gi','g']
}