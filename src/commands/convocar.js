const { SlashCommandBuilder } = require('discord.js');
const { createReadStream } = require('node:fs');
const { join } = require('node:path');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, StreamType } = require('@discordjs/voice');
const sim_file = '../resources/sim_audio.ogg';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('convocar')
		.setDescription('Enters in the voice channel and plays the SIIIUUUUU sound!!'),
    async execute(interaction) {
        await interaction.reply(`Já vou!!`);
        const player = createAudioPlayer();
        const resource = createAudioResource(createReadStream(join(__dirname, sim_file), {
            inputType: StreamType.OggOpus,
        }));
        
        try
        {
            const voiceChannel = interaction.member.voice.channel;
            if(voiceChannel)
            {
                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });
                
                player.play(resource);

                player.on(AudioPlayerStatus.Playing, () => {
                    console.log('The audio player has started playing!');
                });
                
                player.on('error', error => {
                    console.error(error);
                });

                // Subscribe the connection to the audio player (will play audio on the voice connection)
                const subscription = connection.subscribe(player);
                
                interaction.channel.send(`${interaction.user} SOU LINDUUU!!`);
                
                // subscription could be undefined if the connection is destroyed!
                if (subscription) {
                    // Unsubscribe after 5 seconds (stop playing audio on the voice connection)
                    setTimeout(() => connection.destroy(), 5_000);
                    // setTimeout(() => {subscription.unsubscribe(); player.stop; connection.destroy()}, 5_000);
                }

            } else {

                interaction.channel.send(`${interaction.user} Tens que te juntar a um canal para ouvir o meu SIIIIIIIIIUUUUUUU!!`);
            }
        }
        catch (error) {
            console.error(error);
        }
    },
};
