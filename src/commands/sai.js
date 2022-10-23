const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sai')
		.setDescription('Leaves the voice channel!'),
    async execute(interaction) {
        await interaction.reply(`Tá bem!!`);
        await interaction.channel.send(`${interaction.user} CONTINUO A SER LINDUUU!!`);
    },
};
