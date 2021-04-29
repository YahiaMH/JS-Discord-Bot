const Discord = require('discord.js');
let coins = require("../../json/coins.json");
const fs = require('fs').promises;
const talkedRecently = new Set();

module.exports = {
  run: async(client, message) => {
    if(!coins[message.author.id]){
        coins[message.author.id] = {
          coins: 0
        };
        fs.writeFile("./json/coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
      }
    if (coins[message.author.id].coins < 75){
        message.channel.send('You need 75 coins in your wallet to play')
      }else{
    if (talkedRecently.has(message.author.id)) {
    message.channel.send("You can only do this every 2 minutes");
    } else {
      var randNum = Math.floor(Math.random() * 30)+1;
      console.log(randNum)
      message.channel.send("Guess a number between 1 and 30")
      for (var i = 0; i>=0 ; i++){
      console.log("i is " + i)
      const filter = m => m.author.id === message.author.id;
      const answer = await message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time', 'max']});
      const ans = answer.first();
      if(randNum > ans.content){
        if ((randNum-ans.content) <= 3){
          message.channel.send("Guess just a LITTLE bit higher")
        }
        else{
          message.channel.send("Too low, guess higher")
        }
      }
      else if(randNum < ans.content){
        if ((ans.content-randNum) <= 3){
          message.channel.send("Guess just a LITTLE bit lower")
        }
        else{
          message.channel.send("Too high, guess lower")
        }
        
      }
      else if (randNum == ans.content){
        if (i == 0){
          message.channel.send("You got it in your first try SHEEEESH!")
          if(!coins[message.author.id]){
        coins[message.author.id] = {
          coins: 0
        };
          }
          const coinAmnt = Math.floor(Math.random() * 1001)+ 1000
          message.channel.send("You got " + (coinAmnt) + " coins!")
          coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinAmnt
          };
          fs.writeFile("../coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
          break;
        }
        else{
          message.channel.send("You got it after " + (i+1) + " guesses")
          if(!coins[message.author.id]){
        coins[message.author.id] = {
          coins: 0
        };
          }
          if ((i+1) <= 3){
          const coinAmnt = Math.floor(Math.random() * 101)+ 100
          message.channel.send("You got " + (coinAmnt) + " coins!")
          coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinAmnt
          };
          fs.writeFile("../coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
          }
          else if((i+1) <= 6){
          const coinAmnt = Math.floor(Math.random() * 76)+ 25
          message.channel.send("You got " + (coinAmnt) + " coins!")
          coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinAmnt
          };
          fs.writeFile("../coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
          }
          else if ((i+i) >= 12){
            const coinAmnt = Math.floor(Math.random() * 51)+25
          message.channel.send("You lost " + (coinAmnt) + " coins for being a dumbass")
          coins[message.author.id] = {
            coins: coins[message.author.id].coins - coinAmnt
          };
          fs.writeFile("../coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
          }
          else{
            message.channel.send("You didn't lose or gain any coins.");
          }
          break;
        }
      }
      else{
        message.channel.send("That ain't a valid response homie, the number was " + randNum)
        message.channel.send("Do '.h' to play again")
        break;
      }
    }
      

    talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 120000);
    }
      }


},
aliases: ['h', 'hl', 'high', 'higher', 'higherlower', 'highlow', 'lowhigh', 'lowerhigher']
}
  