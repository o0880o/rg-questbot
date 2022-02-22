const { MessageActionRow, MessageButton } = require('discord.js');

const questData = {
	init: {content: 'Welcome to the first quest! proceed?', next: 'info'},
	info: {content: 'Here is some info you might need', next: 'terms'},
	terms: {content: 'Please agree to these terms', next: 'done'},
	done: {content: 'Thanks!'}
}

const progress = async function(interaction) {
	// determine current step, based on the interaction
	const step = determineQuestStep(interaction);
	const user = interaction.user;
	if (interaction.isButton()){
		interaction.reply('ok');
	}

	if (step && questData[step]) {
		questStep = questData[step];
		let response = {content: questStep.content};
		if (questStep.next) {
			let buttons = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setCustomId(questStep.next || '')
				.setLabel('okay!')
				.setStyle('PRIMARY')
			);
			response.components = [buttons];
		} 
		await user.send(response);
	} else {
		console.log('unknown quest step', step);
	}
}

function determineQuestStep(interaction) {
	if (interaction.isButton()) {
		return interaction.customId;
	} else if (interaction.isCommand()) {
		return 'init';
	}
}

const respond = async function(interaction) {
	console.log('quest initiated', interaction);
	await interaction.reply({content: 'Okay, lets start your quest! I sent you a DM!', ephemeral: true});
	await progress(interaction);
}

module.exports = {
	respond: respond,
	progress: progress
}
