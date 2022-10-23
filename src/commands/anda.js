const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('anda')
		.setDescription('Enters in the voice channel and plays the SIIIUUUUU sound!!'),
    async execute(interaction) {
        await interaction.reply(`Já vou!!`);
        
        await interaction.channel.send(`${interaction.user} SOU LINDUUU!!`);
    },
};
