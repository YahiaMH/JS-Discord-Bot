const Discord = require('discord.js');
let coins = require("../../json/coins.json");
const fs = require('fs').promises;

module.exports = {
  run: async(client, message) => {
      var guild = await client.guilds.cache.get("739242587076034620");
      var members = guild.members.cache.map(member => member.id);

      if(!coins[message.author.id]){
        coins[message.author.id] = {
          coins: 0
        };
        fs.writeFile("../coins.json", JSON.stringify(coins), (err) => {
          if (err) console.log(err)
        });
      }
      const allEmbed = new Discord.MessageEmbed()
      .setTitle(`SERVER COINS IN WALLET`)
      .setColor(0xCF40FA)
      for(var i = 0; i<members.length ; i++){
        if(coins[members[i]]){
          const userName = client.users.cache.get(members[i]); 
          const tag1 = userName.tag
          var name = tag1.split("#");
          allEmbed.addField( name[0] , (coins[members[i]].coins) + ' Coins', false)
        }
      }
    message.channel.send(allEmbed);
},
  aliases: ['a', 'al' , 'all']
}

  
  
  
