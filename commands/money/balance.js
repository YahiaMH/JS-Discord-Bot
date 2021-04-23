const Discord = require('discord.js');
let coins = require("../../json/coins.json");
let bank = require("../../json/bank.json");
const fs = require('fs').promises;

module.exports = {
   run: async(client, message) => {
    var target = message.mentions.users.first() || message.author;
      var targetId = target.id;
      if(!coins[targetId]){
        coins[targetId] = {
          coins: 0
        };
        fs.writeFile("../coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
      }
      if(!bank[targetId]){
        bank[targetId] = {
          bank: 0
        };
        fs.writeFile("../bank.json", JSON.stringify(bank), (err) => {
          if (err) console.log(err)
        });
      }
      const userName = client.users.cache.get(targetId); 
      const tag1 = userName.tag
      const name = tag1.split("#");
      const balEmbed = new Discord.MessageEmbed()
            .setTitle(name[0] + "'s balance" )
            .setColor('#0000ff')
            .setDescription("Wallet: " + coins[targetId].coins + '\nBank: ' + bank[targetId].bank)
            message.channel.send(balEmbed)

},
  aliases: ['bal','c', 'coins', 'coin', 'balance']
 
}
