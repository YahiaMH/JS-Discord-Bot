const Discord = require('discord.js');
const fs = require('fs').promises;
const talkedRecently = new Set();
let User = require('../../schemas/UserSchema');
let balmgnt = require('../../functions/balManagement');

module.exports = {
  run: async (client, message, arg) => {
		const bal = await User.find({ discordId: message.author.id });
		const args = Number(arg[0]);
		if (args > bal[0].coins) {
			return message.reply('You only have ' + bal[0].coins + ' coins in your wallet');
		}if (talkedRecently.has(message.author.id)) {
      message.reply("You can only do this every 1 minute");
    }else{
			if (args <= bal[0].coins && args >0){
			const randNum = Math.floor(Math.random() * 2)+1;
			const min = args/1.5;
			const max = args/1.2;
			const parseThis = Math.floor(Math.random() * (max-min))+ min;
			const coinAmnt = parseInt(parseThis);
			console.log(coinAmnt)
			switch(randNum){
				case 1:
					balmgnt.add(message.author.id, coinAmnt);
					message.reply('You won ' + coinAmnt + ' coins!');
					break;
				case 2:
					balmgnt.subtract(message.author.id, args);
					message.reply('You lost ' + args + ' coins')
					break;
			}
		}else if (arg[0] === 'all' || arg[0] === 'a') {
			const randNum = Math.floor(Math.random() * 2)+1;
			const min = bal[0].coins/1.5;
			const max = bal[0].coins/1.2;
			const parseThis = Math.floor(Math.random() * (max-min))+ min;
			const coinAmnt = parseInt(parseThis);
			console.log(coinAmnt)
			switch(randNum){
				case 1:
					balmgnt.add(message.author.id, coinAmnt);
					message.reply('You won ' + coinAmnt + ' coins!');
					break;
				case 2:
					balmgnt.subtract(message.author.id, bal[0].coins);
					message.reply('You lost ' + bal[0].coins + ' coins')
					break;
			}
		}else{
			message.reply('How much are you trying to deposit?');
		}
		talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 60000);
	}
  },
  aliases: ['ga', 'gamble', 'gamb']
}