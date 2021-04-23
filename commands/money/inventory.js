const Discord = require('discord.js');
let ball = require("../../json/8ball.json");
let lockpick = require("../../json/lockpick.json");
const fs = require('fs').promises;

module.exports = {
   run: async(client, message) => {
    var target = message.mentions.users.first() || message.author;
      var targetId = target.id;
      if(!ball[targetId]){
        ball[targetId] = {
          ball: 0
        };
        fs.writeFile("./json/8ball.json", JSON.stringify(ball), (err) => {
          if (err) console.log(err)
        });
      }
      if(!lockpick[targetId]){
        lockpick[targetId] = {
          lockpick: 0
        };
        fs.writeFile("./json/lockpick.json", JSON.stringify(lockpick), (err) => {
          if (err) console.log(err)
        });
      }
      const userName = client.users.cache.get(targetId); 
      const tag1 = userName.tag
      const name = tag1.split("#");
      const balEmbed = new Discord.MessageEmbed()
            .setTitle(name[0] + "'s inventory" )
            .setColor('#0000ff')
            .setDescription("8balls: " + ball[targetId].ball + '\nLockpicks: ' + lockpick[targetId].lockpick)
            message.channel.send(balEmbed)

},
  aliases: ['inv','inventory','i']
 
}