const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { commands } = require('./commands');

const { clientId, guildId, token } = require('./config');

const commandPayload = commands
	.map(command => command.command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandPayload })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

