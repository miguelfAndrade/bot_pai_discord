const { SlashCommandBuilder, GuildChannel } = require('discord.js');
const { createReadStream } = require('node:fs');
const { join } = require('node:path');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, StreamType } = require('@discordjs/voice');
const { Collection } = require('@discordjs/collection');
const sim_file = '../resources/vosotros.ogg';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('banco')
		.setDescription('Sends to '),
    async execute(interaction) {
        await interaction.reply(`Eish outra vez não!!`);
        const player = createAudioPlayer();
        let resource = createAudioResource(createReadStream(join(__dirname, sim_file), {
            inputType: StreamType.OggOpus,
        }));

        console.log(join(__dirname, sim_file));

        try
        {
            const guildChannels = new Collection(interaction.guild.channels.cache);
            const bancoChannel = guildChannels.find(bChannel => bChannel.name.toLowerCase() === "banco");

            if(bancoChannel)
            {
                const connection = joinVoiceChannel({
                    channelId: bancoChannel.id,
                    guildId: bancoChannel.guild.id,
                    adapterCreator: bancoChannel.guild.voiceAdapterCreator,
                });

                player.play(resource);
                
                player.on(AudioPlayerStatus.Playing, () => {
                    console.log('The audio player has started playing!');
                });

                player.on(AudioPlayerStatus.Idle, () => {
                    resource = createAudioResource(createReadStream(join(__dirname, sim_file), {
                        inputType: StreamType.OggOpus,
                    }));
                    player.play(resource);
                });
            
                player.on('error', error => {
                    console.error(error);
                });

                interaction.channel.send(`${interaction.user} Esta es para vosotros!!`);

                // Subscribe the connection to the audio player (will play audio on the voice connection)
                // const subscription = connection.subscribe(player);
                connection.subscribe(player);
            }
            else
            {
                interaction.channel.send(`${interaction.user} Tens que criar um canal de voz chamado "BANCO" para poder ir para lá!!`);
            }
        } catch (error) {
            console.error(error);
        }
    },
};
