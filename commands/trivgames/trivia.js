const Discord = require('discord.js');
let coins = require("../../coins.json");
const fs = require('fs').promises;
const fetch = require("node-fetch");
const talkedRecently = new Set();

module.exports = {
  run: async(client, message) => {
  if (talkedRecently.has(message.author.id)) {
    message.channel.send("You can only do this every 15 seconds");
    } else {
      const response = await fetch('https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple');
     const data = await response.json();
     console.log(data);
     var length = data.results.length;
     var randomNumber = Math.floor(Math.random() * length);
     var randomQuestion = data.results[randomNumber];
     var messyQuestion = randomQuestion.question;
     var correctAnswer = randomQuestion.correct_answer;
     console.log(randomQuestion.incorrect_answers);
     console.log(messyQuestion)
     var randAnswer = Math.floor(Math.random() * 3);
     var messQuestion = messyQuestion.replace(/;/g,' ')
     var mesQuestion = messQuestion.replace(/&/g,'')
     var meQuestion = mesQuestion.replace(/quot/g,'')
     var question = meQuestion.replace(/#309/g,'')
     switch(randAnswer) {
      case 0:
            const triviaEmbed = new Discord.MessageEmbed()
            .setTitle(question)
            .setColor('#0000ff')
            .setDescription("1. " + randomQuestion.correct_answer + "\n2. " + randomQuestion.incorrect_answers[0] + "\n3. " + randomQuestion.incorrect_answers[1] + "\n4. " + randomQuestion.incorrect_answers[2] + "\n\n You have 12 seconds to answer the question")
            message.channel.send(triviaEmbed)
        break;
      case 1:
            const trivia1Embed = new Discord.MessageEmbed()
            .setTitle(question)
            .setColor('#0000ff')
            .setDescription("1. " + randomQuestion.incorrect_answers[0] + "\n2. " + randomQuestion.correct_answer + "\n3. " + randomQuestion.incorrect_answers[1] + "\n4. " + randomQuestion.incorrect_answers[2] + "\n\n You have 12 seconds to answer the question")
            message.channel.send(trivia1Embed)    
        break;
      case 2:
            const trivia2Embed = new Discord.MessageEmbed()
            .setTitle(question)
            .setColor('#0000ff')
            .setDescription("1. " + randomQuestion.incorrect_answers[0] + "\n2. " + randomQuestion.incorrect_answers[1] + "\n3. " + randomQuestion.correct_answer + "\n4. " + randomQuestion.incorrect_answers[2] + "\n\n You have 12 seconds to answer the question")
            message.channel.send(trivia2Embed)
        break;
      case 3:
            const trivia3Embed = new Discord.MessageEmbed()
            .setTitle(question)
            .setColor('#0000ff')
            .setDescription("1. " + randomQuestion.incorrect_answers[0] + "\n2. " + randomQuestion.incorrect_answers[1] + "\n3. " + randomQuestion.incorrect_answers[2] + "\n4. " + randomQuestion.correct_answer + "\n\n You have 12 seconds to answer the question")
            message.channel.send(trivia3Embed)
        break;
}
     const filter = m => m.author.id === message.author.id;
     try{
            const answer = await message.channel.awaitMessages(filter, { max: 1, time: 12000, errors: ['time', 'max']});
     const ans = answer.first();
     console.log("this is what was sent " + ans.content)
     console.log("this is the correct answer " + (randAnswer+1))
     if (randAnswer+1 == ans.content)
     {
       if(!coins[message.author.id]){
        coins[message.author.id] = {
          coins: 0
        };
          }
       const coinAmnt = Math.floor(Math.random() * 101)+100;
          coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinAmnt
          };
          fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });

       var randomNum = Math.floor(Math.random() * 4)+1;
       if (randomNum == 1)
       {
        message.channel.send("That was the correct answer!");
        message.channel.send("You got " + coinAmnt + " coins!");
       }
       else if (randomNum == 2){
         message.channel.send("Damn you are pretty smart, that was right!");
         message.channel.send("You got " + coinAmnt + " coins!");
       }
       else if (randomNum == 3){
         message.channel.send("Sheeeeesh! You got that right!");
         message.channel.send("You got " + coinAmnt + " coins!");
       }
       else{
         message.channel.send("Your brain is humungous!")
         message.channel.send("You got " + coinAmnt + " coins!");
       }
     }
     else {
       var randomNum = Math.floor(Math.random() * 4)+1;
       if (randomNum == 1)
       {
        message.channel.send("LMAOOOO, what a fuckin retard");
       }
       else if (randomNum == 2){
         message.channel.send("Holy shit, how can one be so fucking stupid");
       }
       else if (randomNum == 3){
         message.channel.send("That was the wrong answer fucking idiot");
       }
       else{
         message.channel.send("With that small brain of yours I wouldn't be surprised if you thought the world was flat");
       }
     }
     }catch(e){
      message.channel.send("Why didn't you answer in time?")
     }

     talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 15000);
    }
    },
    aliases: ['t','trivia']
  
}