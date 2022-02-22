const dotenv = require('dotenv');
const { Client, Intents } = require('discord.js');
const { commands } = require('./commands');
const { progress } = require('./quest');

const {token} = require('./config');
console.log(token);
console.log(commands);

const client = new Client({intents: [Intents.FLAGS.GUILDS] });

client.once('ready', ()=> {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (interaction.isButton()) {
		// TODO some way that we can tie a command to a certain quest chain? so that 'progress' is just another field in commands array? or maybe we have a quest array, and commands just kicks off a quest? may not want *all* buttons to be interpreted as quest progression
		progress(interaction)
	} else if (interaction.isCommand() && interaction.commandName) {
		commands.filter((item) => item.command.name === interaction.commandName)
			.forEach((item)=>item.action(interaction))
	} else {
		console.log('non-command interaction:', interaction);
	}
});

client.login(token);
