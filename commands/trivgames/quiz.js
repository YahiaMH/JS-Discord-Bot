const Discord = require('discord.js');
let coins = require("../../coins.json");
const fs = require('fs').promises;
const fetch = require("node-fetch");
const talkedRecently = new Set();

module.exports = {
  run:  async(client, message) => {
    if(coins[message.author.id].coins < 30){
        message.channel.send('You need to have more than 30 coins in your wallet to play')
      }else{
         if (talkedRecently.has(message.author.id)) {
            message.channel.send("You can only do this every 15 seconds");
    } else {
        const response = await fetch('https://opentdb.com/api.php?amount=50&difficulty=easy&type=boolean');
     const data = await response.json();
     var length = data.results.length;
     var randomNumber = Math.floor(Math.random() * length);
     var randomQuestion = data.results[randomNumber];
     var question = randomQuestion.question;
     var correctAnswer = randomQuestion.correct_answer;
     
     const quizEmbed = new Discord.MessageEmbed()
            .setTitle(question)
            .setColor('#ff0000')
            .setDescription("\nTrue or False\n\nYou have 8 seconds to answer the question")
            message.channel.send(quizEmbed)
     const filter = m => m.author.id === message.author.id;
     try{
      const answer = await message.channel.awaitMessages(filter, { max: 1, time: 8000, errors: ['time', 'max']})
     const ans = answer.first();
     
     if (ans.content.toLowerCase() === correctAnswer.toLowerCase())
     {
       if(!coins[message.author.id]){
        coins[message.author.id] = {
          coins: 0
        };
          }
          const coinAmnt = Math.floor(Math.random() * 21)+10;
          coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinAmnt
          };
          fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
       var randomNum = Math.floor(Math.random() * 4)+1;
       console.log(randomNum);
       if (randomNum === 1)
       {
        message.channel.send("That was the correct answer!");
        message.channel.send("You got " + (coinAmnt) + " coins!")
       }
       else if (randomNum === 2){
         message.channel.send("Damn you are pretty smart, that was right!");
         message.channel.send("You got " + (coinAmnt) + " coins!")
       }
       else if (randomNum == 3){
         message.channel.send("Sheeeeesh! You got that right!");
         message.channel.send("You got " + (coinAmnt) + " coins!")
       }
       else{
         message.channel.send("Your brain is humungous!")
         message.channel.send("You got " + (coinAmnt) + " coins!")
       }
     }
     else {
       if(!coins[message.author.id]){
        coins[message.author.id] = {
          coins: 0
        };
          }
          var coinAmnt = Math.floor(Math.random() * 21)+10;
          coins[message.author.id] = {
            coins: coins[message.author.id].coins - coinAmnt
          };
          fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
        
       var randomNum = Math.floor(Math.random() * 4)+1;
       console.log(randomNum);
       if (randomNum === 1)
       {
        message.channel.send("LMAOOOO, what a fuckin retard");
        if ((coins[message.author.id].coins) >= 30){
          message.channel.send("You lost " + coinAmnt + " coins for being an idiot")
        }
       }
       else if (randomNum === 2){
         message.channel.send("Holy shit, how can one be so fucking stupid");
         if ((coins[message.author.id].coins) >= 30){
          message.channel.send("You lost " + coinAmnt + " coins for being an idiot")
        }
       }
       else if (randomNum == 3){
         message.channel.send("That was the wrong answer fucking idiot");
         if ((coins[message.author.id].coins) >= 30){
          message.channel.send("You lost " + coinAmnt + " coins for being an idiot")
        }
       }
       else{
         message.channel.send("With that small brain of yours I wouldn't be surprised if you thought the world was flat");
         if ((coins[message.author.id].coins) >= 30){
          message.channel.send("You lost " + coinAmnt + " coins for being an idiot")
        }
       }
     }
     }catch(e){
          coins[message.author.id] = {
            coins: coins[message.author.id].coins - 30
          };
          fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
       message.channel.send("You lost 30 coins for not answering in time")
     }
     talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 15000);
    }
      }
 
},
aliases: ['q','quiz']
}