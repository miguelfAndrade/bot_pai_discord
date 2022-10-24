const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const { Collection } = require('@discordjs/collection');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('desconvocar')
		.setDescription('Leaves the voice channel!'),
    async execute(interaction) {
        await interaction.reply(`Tá bem!!`);
        try
        {
            const voiceChannel = interaction.member.voice.channel;

            const channels = new Collection(interaction.guild.channels.cache);
            const bancoChannel = channels.find(banco => banco.name.toLowerCase() === "banco");
           
            interaction.channel.send(`${interaction.user} CONTINUO A SER LINDUUU!!`);

            if(voiceChannel || bancoChannel)
            {
                const connection = getVoiceConnection(voiceChannel.guild.id);
                if(connection)
                    connection.destroy();
                    
                const connectionBanco = getVoiceConnection(bancoChannel.guild.id);
                if(connectionBanco)
                    connectionBanco.destroy();
                            
            }
            else
            {
                interaction.channel.send(`${interaction.user} Já estou desconvocado e SOU LINDUUUUUU!!`);
            }
        }
        catch (error) {
            console.error(error);
        }
    },
};
