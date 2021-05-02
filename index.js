const Discord = require('discord.js');
const client = new Discord.Client();
const keepAlive = require('./server');
const fs = require('fs').promises;
const prefix = '.';
const path = require('path');
const DisTube = require('distube');
const mongoose = require('mongoose');
const User = require('./schemas/UserSchema')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

client.commands = new Map();

client.distube = new DisTube(client, {
	searchSongs: false,
	emitNewSongOnly: true
});

(async function registerCommands(dir = 'commands') {
	let files = await fs.readdir(path.join(__dirname, dir));
	for (let file of files) {
		let stat = await fs.lstat(path.join(__dirname, dir, file));
		if (stat.isDirectory()) registerCommands(path.join(dir, file));
		else {
			if (file.endsWith('.js')) {
				let cmdName = file.substring(0, file.indexOf('.js'));
				let cmdModule = require(path.join(__dirname, dir, file));
				let { aliases } = cmdModule;
				client.commands.set(cmdName, cmdModule);
				if (aliases.length !== 0)
					aliases.forEach(alias => client.commands.set(alias, cmdModule.run));
			}
		}
	}
})();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
  const Guilds = client.guilds.cache.map(guild => guild.id);
  
});

client.on('message', async function(message) {
	if (message.author.bot) return;
  const target = message.mentions.users.first() || message.author;
  targetId = target.id;
  await User.update({}, {$set : {"work": 0}}, {multi:true});
  await User.findOneAndUpdate({
    discordId: targetId,
    }, {
    $inc: {
    work: 5,
    }
    });

	if (!message.content.startsWith(prefix)) return;
	let cmdArgs = message.content
		.substring(message.content.indexOf(prefix) + 1)
		.split(new RegExp(/\s+/));
	let cmdName = cmdArgs.shift();
	if (client.commands.get(cmdName)) {
		client.commands.get(cmdName)(client, message, cmdArgs);
	} else {
		console.log('Command does not exist');
	}
});
client.on('guildMemberAdd', async (member) =>{
  const newMember = await User.create({
    username: member.user.username,
    discordId: member.id,
    coins: 0,
    bank: 0,
    balls: 0,
    lockpick: 0,
  });
});

keepAlive();
client.login(process.env.TOKEN);
