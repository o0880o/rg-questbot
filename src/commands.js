const { SlashCommandBuilder } = require('@discordjs/builders');
const {respond} = require('./quest')

module.exports = {
	commands: [
	{command: new SlashCommandBuilder().setName('quest').setDescription('start a quest'),
		action: respond,
	}
]}
